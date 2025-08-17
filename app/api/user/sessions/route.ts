import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, ObjectId } from '@/lib/db'

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

    // Lấy tất cả các phiên đăng nhập của user từ database
    const sessionsCollection = await db.getCollection(db.collections.sessions)
    const userSessions = await sessionsCollection.find({ 
      userId: userId 
    }).toArray()

    // Định dạng dữ liệu phiên đăng nhập cho client
    const formattedSessions = userSessions.map(sessionData => ({
      id: sessionData._id.toString(),
      userAgent: sessionData.userAgent || 'Unknown device',
      lastUsedAt: sessionData.expires,
      isCurrentSession: sessionData.sessionToken === session.sessionToken
    }))

    return NextResponse.json(
      { sessions: formattedSessions },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}