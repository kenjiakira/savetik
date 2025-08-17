import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// Số lượng kết quả trên mỗi trang
const PAGE_SIZE = 10

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    
    // Lấy tham số phân trang từ URL
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const type = url.searchParams.get('type') // 'video', 'images', hoặc null cho tất cả

    if (page < 1) {
      return NextResponse.json(
        { error: 'Invalid page number' },
        { status: 400 }
      )
    }

    // Xây dựng query condition dựa vào loại nội dung
    let whereCondition;
    if (type) {
      whereCondition = (downloads, { eq, and }) => and(
        eq(downloads.userId, userId),
        eq(downloads.type, type)
      );
    } else {
      whereCondition = (downloads, { eq }) => eq(downloads.userId, userId);
    }

    // Truy vấn lịch sử tải xuống của người dùng với phân trang
    const downloads = await db.query.downloads.findMany({
      where: whereCondition,
      orderBy: (downloads, { desc }) => [desc(downloads.createdAt)],
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    })

    // Đếm tổng số bản ghi để tính số trang
    const totalCount = await db.query.downloads.count({
      where: whereCondition
    })

    // Tính toán thông tin phân trang
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      downloads,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    })
  } catch (error) {
    console.error('Error fetching download history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch download history' },
      { status: 500 }
    )
  }
}