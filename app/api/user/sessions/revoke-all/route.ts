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
    const currentSessionToken = session.sessionToken

    // Lấy collection sessions
    const sessionsCollection = await db.getCollection(db.collections.sessions)

    // Xóa tất cả các phiên của người dùng ngoại trừ phiên hiện tại
    const result = await sessionsCollection.deleteMany({
      userId: userId,
      sessionToken: { $ne: currentSessionToken }
    })

    return NextResponse.json({
      success: true,
      message: 'All other sessions revoked successfully',
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error revoking all sessions:', error)
    return NextResponse.json(
      { error: 'Failed to revoke sessions' },
      { status: 500 }
    )
  }
}