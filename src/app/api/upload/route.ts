export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo válido" },
        { status: 400 }
      );
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande (máximo 15MB)" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const originalName = "name" in file && typeof file.name === "string" ? file.name : "uploaded_image.png";
    const extension = path.extname(originalName) || ".png";
    const rawBaseName = path.basename(originalName, extension);
    const cleanBaseName = rawBaseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40);

    const filename = `mr_${Date.now()}_${cleanBaseName}${extension}`;
    const destinationPath = path.join(UPLOAD_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const store = getNetlifyUploadsStore();
    let blobSaved = false;
    if (store) {
      try {
        await store.set(filename, arrayBuffer, {
          metadata: {
            contentType: file.type || "image/png",
            originalName,
            uploadedAt: new Date().toISOString(),
          },
        });
        blobSaved = true;
      } catch (blobErr) {
        console.warn("Error saving upload to Netlify Blobs:", blobErr);
      }
    }

    // Write file to local public/images/uploads/ (for local dev)
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(destinationPath, buffer);
    } catch (fsErr) {
      // In serverless read-only filesystem, if blob is saved, this is normal
      if (!blobSaved) {
        throw fsErr;
      }
    }

    const publicUrl = `/images/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al procesar la subida del archivo", details: String(error) },
      { status: 500 }
    );
  }
}
