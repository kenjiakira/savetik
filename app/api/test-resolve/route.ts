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

    // Clean up URL - remove @ prefix if present
    let cleanUrl = url.trim().replace(/^@+/, '');
    
    // Ensure URL has protocol
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    console.log(`Testing URL resolution for: ${cleanUrl}`);

    // Try different methods to resolve the URL
    const methods = [
      // Method 1: Simple fetch with redirect follow
      async () => {
        const response = await fetch(cleanUrl, {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        return response.url;
      },
      
      // Method 2: HEAD request
      async () => {
        const response = await fetch(cleanUrl, {
          method: 'HEAD',
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        return response.url;
      }
    ];

    const results = [];

    for (let i = 0; i < methods.length; i++) {
      try {
        const resolvedUrl = await methods[i]();
        results.push({
          method: `Method ${i + 1}`,
          success: true,
          resolvedUrl,
          isResolved: resolvedUrl !== cleanUrl,
          isTikTok: resolvedUrl.includes('tiktok.com')
        });
      } catch (error: any) {
        results.push({
          method: `Method ${i + 1}`,
          success: false,
          error: error.message,
          resolvedUrl: null
        });
      }
    }

    return NextResponse.json({
      success: true,
      originalUrl: url,
      cleanedUrl: cleanUrl,
      results
    });

  } catch (error: any) {
    console.error("Test resolve API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
