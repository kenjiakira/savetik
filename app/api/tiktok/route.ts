import { type NextRequest, NextResponse } from "next/server"

const TIKTOK_API_URL = "https://www.tikwm.com/api/"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 })
    }

    if (!isValidTikTokUrl(url)) {
      return NextResponse.json(
        { message: "Invalid TikTok URL. Please provide a valid TikTok video URL." },
        { status: 400 },
      )
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
  // - https://m.tiktok.com/v/1234567890.html
  return /^(https?:\/\/)?(www\.|vm\.|m\.)?tiktok\.com\/([@\w]+\/(video|photo)\/\d+|v\/\d+|[A-Za-z0-9]+\/?$)/.test(url)
}
