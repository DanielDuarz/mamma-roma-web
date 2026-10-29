"use client";

import { useEffect } from "react";

const MOVIK_OPS_ENDPOINT =
  "https://app-facturas-daniel-default-rtdb.firebaseio.com/movik_ops";
const APP_ID = "mamma-roma-web";

function detectDevice(): "desktop" | "mobile" | "tablet" {
  if (typeof navigator === "undefined") return "mobile";
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android/.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(): "chrome" | "safari" | "firefox" | "edge" {
  if (typeof navigator === "undefined") return "safari";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("edg/")) return "edge";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("chrome") && !ua.includes("edg/")) return "chrome";
  return "safari";
}

function detectTrafficSource(): string {
  if (typeof document === "undefined") return "Directo / QR en Mesa";
  const ref = (document.referrer || "").toLowerCase();
  if (
    ref.includes("instagram") ||
    ref.includes("facebook") ||
    ref.includes("tiktok") ||
    ref.includes("fb.")
  ) {
    return "Instagram / Redes Sociales";
  }
  if (ref.includes("google") || ref.includes("bing")) {
    return "Google Search / Maps";
  }
  return "Directo / QR en Mesa";
}

function formatNowShort(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export function MovikWebSensor() {
  useEffect(() => {
    try {
      let sessionId = sessionStorage.getItem("movik_mr_session_id");
      if (!sessionId) {
        sessionId = `sess_${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 6)}`;
        sessionStorage.setItem("movik_mr_session_id", sessionId);
      }

      const sendPageview = (customPath?: string, customLabel?: string) => {
        try {
          const rawHash = window.location.hash || "";
          const path = customPath || (rawHash ? `/${rawHash}` : window.location.pathname || "/");

          // Session deduplication: only record 1 pageview per unique section per session
          const visitedRaw = sessionStorage.getItem("movik_mr_visited_paths") || "[]";
          const visitedList: string[] = JSON.parse(visitedRaw);
          if (visitedList.includes(path)) {
            return;
          }
          visitedList.push(path);
          sessionStorage.setItem("movik_mr_visited_paths", JSON.stringify(visitedList));

          const eventId = `pv_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 6)}`;
          const label =
            customLabel ||
            (path === "/"
              ? "Inicio & Selector de Marcas"
              : path.includes("ubicaciones") || path.includes("locations")
              ? "Sucursales & Delivery"
              : path.includes("menu")
              ? "Menú Mamma Roma"
              : path);

          const payload = {
            id: eventId,
            appId: APP_ID,
            path,
            label,
            source: detectTrafficSource(),
            device: detectDevice(),
            browser: detectBrowser(),
            sessionId,
            timestamp: new Date().toISOString(),
          };

          void fetch(
            `${MOVIK_OPS_ENDPOINT}/traffic/${APP_ID}/${eventId}.json`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              keepalive: true,
            }
          ).catch(() => {});
        } catch {
          // Silent fail
        }
      };

      // Initial pageview
      sendPageview();

      // Track hash changes (menu sections)
      const onHashChange = () => sendPageview();
      window.addEventListener("hashchange", onHashChange);

      // Observe data-brand changes on <html> (Mamma Roma / Sette Colli /Pizza Grizzly)
      const brandObserver = new MutationObserver(() => {
        try {
          const activeBrand =
            document.documentElement.getAttribute("data-brand") || "mamma-roma";
          if (activeBrand === "mamma-roma") {
            sendPageview("/#menu-mamma-roma", "Menú Mamma Roma");
          } else {
            sendPageview("/#menu-pizza-grizzly", "Menú Pizza Grizzly / Sette Colli");
          }
        } catch {
          // Silent fail
        }
      });
      brandObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-brand"],
      });

      // Error listener with circuit breaker (max 3 per session)
      const onError = (event: ErrorEvent) => {
        try {
          const errCnt = Number(sessionStorage.getItem("movik_mr_err_cnt") || "0");
          if (errCnt >= 3) return;
          sessionStorage.setItem("movik_mr_err_cnt", String(errCnt + 1));

          const issueId = `iss_${Date.now().toString(36)}_${Math.random()
            .toString(36)
            .slice(2, 5)}`;
          const now = formatNowShort();
          const issuePayload = {
            id: issueId,
            appId: APP_ID,
            message: event.message || "Unhandled Web Client Error",
            code: "WEB_RUNTIME_ERROR",
            stackTrace:
              event.error?.stack ||
              `${event.message} at ${event.filename || "/"}:${
                event.lineno || 0
              }`,
            severity: "Media",
            status: "Abierto",
            environment: "production",
            route: window.location.pathname + (window.location.hash || ""),
            browser: navigator.userAgent.slice(0, 80),
            occurrences: 1,
            source: "sdk-auto",
            createdAt: now,
            updatedAt: now,
            resolutionNotes: [],
          };
          void fetch(`${MOVIK_OPS_ENDPOINT}/issues/${issueId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issuePayload),
            keepalive: true,
          }).catch(() => {});
        } catch {
          // Silent fail
        }
      };

      const onUnhandledRejection = (event: PromiseRejectionEvent) => {
        try {
          const issueId = `iss_${Date.now().toString(36)}_${Math.random()
            .toString(36)
            .slice(2, 5)}`;
          const now = formatNowShort();
          const msg =
            event.reason instanceof Error
              ? event.reason.message
              : String(event.reason || "Unhandled Promise Rejection");
          const issuePayload = {
            id: issueId,
            appId: APP_ID,
            message: msg,
            code: "WEB_PROMISE_REJECTION",
            stackTrace:
              event.reason instanceof Error && event.reason.stack
                ? event.reason.stack
                : msg,
            severity: "Media",
            status: "Abierto",
            environment: "production",
            route: window.location.pathname + (window.location.hash || ""),
            browser: navigator.userAgent.slice(0, 80),
            occurrences: 1,
            source: "sdk-auto",
            createdAt: now,
            updatedAt: now,
            resolutionNotes: [],
          };
          void fetch(`${MOVIK_OPS_ENDPOINT}/issues/${issueId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issuePayload),
            keepalive: true,
          }).catch(() => {});
        } catch {
          // Silent fail
        }
      };

      window.addEventListener("error", onError);
      window.addEventListener("unhandledrejection", onUnhandledRejection);

      return () => {
        brandObserver.disconnect();
        window.removeEventListener("hashchange", onHashChange);
        window.removeEventListener("error", onError);
        window.removeEventListener("unhandledrejection", onUnhandledRejection);
      };
    } catch {
      // Silent fail
    }
  }, []);

  return null;
}
