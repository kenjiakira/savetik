import { type NextRequest, NextResponse } from "next/server"

const TIKTOK_API_URL = "https://www.tikwm.com/api/"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { url } = body

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 })
    }

    // Clean up URL - remove @ prefix if present
    url = url.trim().replace(/^@+/, '');
    
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!isValidTikTokUrl(url)) {
      return NextResponse.json(
        { message: "Invalid TikTok URL. Please provide a valid TikTok video URL." },
        { status: 400 },
      )
    }

    // Resolve vt.tiktok.com and vm.tiktok.com links to get the original URL
    if (url.includes('vt.tiktok.com') || url.includes('vm.tiktok.com')) {
      try {
        console.log(`Attempting to resolve short link: ${url}`);
        
        // Try multiple resolution methods
        let resolvedUrl = null;
        
        // Method 1: GET request with follow redirects
        try {
          const resolveResponse = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
              'Accept-Encoding': 'gzip, deflate, br',
              'DNT': '1',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1'
            }
          });
          
          if (resolveResponse.url && resolveResponse.url !== url) {
            resolvedUrl = resolveResponse.url;
          }
        } catch (getError) {
          console.log('GET method failed, trying HEAD method:', getError.message);
          
          // Method 2: HEAD request as fallback
          try {
            const headResponse = await fetch(url, {
              method: 'HEAD',
              redirect: 'follow',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              }
            });
            
            if (headResponse.url && headResponse.url !== url) {
              resolvedUrl = headResponse.url;
            }
          } catch (headError) {
            console.log('HEAD method also failed:', headError.message);
          }
        }
        
        // Check if we got a proper resolution
        if (resolvedUrl && resolvedUrl.includes('tiktok.com') && resolvedUrl !== url) {
          url = resolvedUrl;
          console.log(`Successfully resolved link: ${body.url} -> ${url}`);
        } else {
          console.log(`Resolution failed or no redirect found for: ${url}`);
        }
      } catch (error) {
        console.error("Error resolving short TikTok link:", error);
        // Continue with original URL if resolution fails
      }
    }

    const response = await fetch(TIKTOK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          message: errorData.data?.error_message || "Failed to fetch TikTok video data",
          code: errorData.code || -1,
        },
        { status: response.status },
      )
    }

    const responseData = await response.json()

    if (responseData.code !== 0) {
      return NextResponse.json(
        {
          message: responseData.msg || "TikTok API error",
          code: responseData.code || -1,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(responseData)
  } catch (error: any) {
    console.error("TikTok downloader API error:", error)
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
  }
}

function isValidTikTokUrl(url: string): boolean {
  // Match common TikTok URL formats:
  // - https://www.tiktok.com/@username/video/1234567890
  // - https://www.tiktok.com/@username/photo/1234567890
  // - https://vm.tiktok.com/XXXXXXXX/
  // - https://vt.tiktok.com/XXXXXXXX/ (short links that need resolving)
  // - https://m.tiktok.com/v/1234567890.html
  
  // Check if it's a TikTok domain
  if (!url.includes('tiktok.com')) {
    return false;
  }
  
  // More flexible regex for different TikTok URL formats
  const patterns = [
    // Full URLs with username and video ID
    /^https?:\/\/(www\.)?tiktok\.com\/@[\w._-]+\/(video|photo)\/\d+/,
    // Short URLs (vm.tiktok.com, vt.tiktok.com)
    /^https?:\/\/(vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/,
    // Mobile URLs
    /^https?:\/\/m\.tiktok\.com\/v\/\d+/,
    // Other variations
    /^https?:\/\/(www\.)?tiktok\.com\/.*[A-Za-z0-9]/
  ];
  
  return patterns.some(pattern => pattern.test(url));
}
