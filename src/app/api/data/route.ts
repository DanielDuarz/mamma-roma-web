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

async function getStoredData() {
  const store = getNetlifyStore();
  if (store) {
    try {
      const blobData = await store.get(BLOB_KEY, { type: "json" });
      if (blobData && typeof blobData === "object" && (blobData as Record<string, unknown>)["mamma-roma"]) {
        return blobData;
      }
    } catch (err) {
      console.warn("Could not read from Netlify Blobs, falling back to local file:", err);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    // If Netlify store is active but was empty, prime it with current data
    if (store && parsed) {
      store.setJSON(BLOB_KEY, parsed).catch(() => {});
    }
    return parsed;
  } catch {
    // If file doesn't exist yet, initialize it with BRANDS
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(BRANDS, null, 2), "utf-8");
    } catch {
      // ignore in read-only environment
    }
    if (store) {
      store.setJSON(BLOB_KEY, BRANDS).catch(() => {});
    }
    return BRANDS;
  }
}

export async function GET() {
  try {
    const data = await getStoredData();
    return NextResponse.json(data);
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

    const store = getNetlifyStore();
    let blobSaved = false;
    if (store) {
      try {
        await store.setJSON(BLOB_KEY, body);
        blobSaved = true;
      } catch (err) {
        console.warn("Error saving to Netlify Blobs:", err);
      }
    }

    // Also attempt saving to disk for local dev
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");
    } catch (fsErr) {
      // If we are on Netlify and blob was saved, it's expected that fs is read-only
      if (!blobSaved) {
        throw fsErr;
      }
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ error: "Error saving site data", details: String(error) }, { status: 500 });
  }
}
