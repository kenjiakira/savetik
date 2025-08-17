import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, filename } = await request.json();

    if (!url || !filename) {
      return NextResponse.json(
        { error: "URL and filename are required" },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from ${url}`);
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": response.headers.get("Content-Length") || String(blob.size),
      },
    });
  } catch (error: any) {
    console.error("Direct download error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to download file" },
      { status: 500 }
    );
  }
}
