export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { BRANDS } from "@/data/brandsData";
import { getStore } from "@netlify/blobs";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "site-data.json");
const BLOB_STORE_NAME = "mamma-roma-data";
const BLOB_KEY = "site-data";

function getNetlifyStore() {
  try {
    if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT) {
      return getStore(BLOB_STORE_NAME);
    }
  } catch (err) {
    console.warn("Netlify Blobs store not available in this environment:", err);
  }
  return null;
}

function autoMigrateImageUrls<T>(obj: T): T {
  if (typeof obj === "string") {
    if (obj.startsWith("/images/uploads/") && obj.endsWith(".png")) {
      return obj.replace(/\.png$/, ".webp") as unknown as T;
    }
    if (obj.startsWith("/images/dishes/") && obj.endsWith(".jpg")) {
      return obj.replace(/\.jpg$/, ".webp") as unknown as T;
    }
    if (obj === "/images/heroes/mr-story.jpg") {
      return "/images/heroes/mr-story.webp" as unknown as T;
    }
    if (obj === "/images/logos/logo-group.png") {
      return "/images/logos/logo-group.webp" as unknown as T;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(autoMigrateImageUrls) as unknown as T;
  }
  if (obj && typeof obj === "object") {
    const res: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = autoMigrateImageUrls(v);
    }
    return res as unknown as T;
  }
  return obj;
}

async function getStoredData() {
  const store = getNetlifyStore();
  if (store) {
    try {
      const blobData = await store.get(BLOB_KEY, { type: "json" });
      if (blobData && typeof blobData === "object" && (blobData as Record<string, unknown>)["mamma-roma"]) {
        const migrated = autoMigrateImageUrls(blobData);
        store.setJSON(BLOB_KEY, migrated).catch(() => {});
        return migrated;
      }
    } catch (err) {
      console.warn("Could not read from Netlify Blobs, falling back to local file:", err);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    const migrated = autoMigrateImageUrls(parsed);
    // If Netlify store is active but was empty, prime it with current data
    if (store && migrated) {
      store.setJSON(BLOB_KEY, migrated).catch(() => {});
    }
    return migrated;
  } catch {
    // If file doesn't exist yet, initialize it with BRANDS
    const migratedBrands = autoMigrateImageUrls(BRANDS);
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(migratedBrands, null, 2), "utf-8");
    } catch {
      // ignore in read-only environment
    }
    if (store) {
      store.setJSON(BLOB_KEY, migratedBrands).catch(() => {});
    }
    return migratedBrands;
  }
}

export async function GET() {
  try {
    const data = await getStoredData();
    const migrated = autoMigrateImageUrls(data);
    return NextResponse.json(migrated);
  } catch (error) {
    return NextResponse.json({ error: "Error reading site data", details: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid data payload" }, { status: 400 });
    }

    const cleanBody = autoMigrateImageUrls(body);
    const store = getNetlifyStore();
    let blobSaved = false;
    if (store) {
      try {
        await store.setJSON(BLOB_KEY, cleanBody);
        blobSaved = true;
      } catch (err) {
        console.warn("Error saving to Netlify Blobs:", err);
      }
    }

    // Also attempt saving to disk for local dev
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cleanBody, null, 2), "utf-8");
    } catch (fsErr) {
      // If we are on Netlify and blob was saved, it's expected that fs is read-only
      if (!blobSaved) {
        throw fsErr;
      }
    }

    return NextResponse.json({ success: true, data: cleanBody });
  } catch (error) {
    return NextResponse.json({ error: "Error saving site data", details: String(error) }, { status: 500 });
  }
}
