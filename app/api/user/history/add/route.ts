import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { url, title, type, contentId, thumbnail } = await request.json()

    if (!url || !type) {
      return NextResponse.json(
        { error: 'URL and type are required' },
        { status: 400 }
      )
    }

    // Kiểm tra loại nội dung hợp lệ
    const validTypes = ['video', 'image', 'images', 'music']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    // Lưu lịch sử tải xuống vào database
    const download = await db.insert(db.downloads).values({
      userId,
      url,
      title: title || 'Untitled',
      type,
      contentId: contentId || url,
      thumbnail: thumbnail || null,
      createdAt: new Date(),
    }).returning()

    return NextResponse.json({
      success: true,
      message: 'Download history recorded successfully',
      download: download[0]
    })
  } catch (error) {
    console.error('Error recording download history:', error)
    return NextResponse.json(
      { error: 'Failed to record download history' },
      { status: 500 }
    )
  }
}