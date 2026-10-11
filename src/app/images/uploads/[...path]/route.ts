export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

const BLOB_STORE_NAME = "mamma-roma-uploads";

function getNetlifyUploadsStore() {
  try {
    if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT) {
      return getStore(BLOB_STORE_NAME);
    }
  } catch (err) {
    console.warn("Netlify Blobs upload store not available in this environment:", err);
  }
  return null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const subPath = params.path ? params.path.join("/") : "";
    // Prevent directory traversal
    const safePath = path.normalize(subPath).replace(/^(\.\.[\/\\])+/, "");

    // 1. Try serving from local disk (bundled static files or local uploads)
    try {
      const filePath = path.join(process.cwd(), "public", "images", "uploads", safePath);
      const fileBuffer = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "image/png";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      // Not on local disk, proceed to Netlify Blobs
    }

    // 2. Try serving from Netlify Blobs
    const store = getNetlifyUploadsStore();
    if (store) {
      try {
        const blob = await store.getWithMetadata(safePath, { type: "arrayBuffer" });
        if (blob && blob.data) {
          const ext = path.extname(safePath).toLowerCase();
          const contentType =
            (blob.metadata?.contentType as string) ||
            MIME_TYPES[ext] ||
            "image/png";

          return new NextResponse(Buffer.from(blob.data), {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (blobErr) {
        console.warn("Error retrieving from Netlify Blobs:", blobErr);
      }
    }

    return new NextResponse("File not found", { status: 404 });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
