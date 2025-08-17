import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Check if it's a vt.tiktok.com link that needs resolving
    if (url.includes('vt.tiktok.com')) {
      try {
        // Follow the redirect to get the original URL
        const response = await fetch(url, {
          method: 'HEAD',
          redirect: 'follow'
        });
        
        const resolvedUrl = response.url;
        
        return NextResponse.json({
          success: true,
          originalUrl: url,
          resolvedUrl: resolvedUrl
        });
      } catch (error) {
        console.error("Error resolving vt.tiktok.com link:", error);
        return NextResponse.json(
          { error: "Failed to resolve vt.tiktok.com link" },
          { status: 500 }
        );
      }
    }

    // If it's not a vt.tiktok.com link, return the original URL
    return NextResponse.json({
      success: true,
      originalUrl: url,
      resolvedUrl: url
    });

  } catch (error: any) {
    console.error("Resolve link API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
