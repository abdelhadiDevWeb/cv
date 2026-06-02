import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const CV_FILE = "cv_boudjemline.pdf";
const DOWNLOAD_NAME = "Mohamed_Boudjemline_CV.pdf";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", CV_FILE);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "CV file not found" }, { status: 404 });
  }
}
