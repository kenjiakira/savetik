import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, ObjectId } from '@/lib/db'

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
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Lấy collection sessions
    const sessionsCollection = await db.getCollection(db.collections.sessions)

    // Xác minh session thuộc về user hiện tại
    const targetSession = await sessionsCollection.findOne({
      _id: new ObjectId(sessionId),
      userId: userId
    })

    if (!targetSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Kiểm tra xem đây có phải là phiên hiện tại không
    const isCurrentSession = targetSession.sessionToken === session.sessionToken

    // Xóa session khỏi database
    await sessionsCollection.deleteOne({ _id: new ObjectId(sessionId) })

    return NextResponse.json({
      success: true,
      message: 'Session revoked successfully',
      isCurrentSession
    })
  } catch (error) {
    console.error('Error revoking session:', error)
    return NextResponse.json(
      { error: 'Failed to revoke session' },
      { status: 500 }
    )
  }
}