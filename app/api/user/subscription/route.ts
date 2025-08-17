import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

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

    // Lấy thông tin subscription của người dùng từ database
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      columns: {
        subscription: true,
        subscriptionStart: true,
        subscriptionEnd: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const now = new Date()
    const isActive = user.subscription === 'premium' && 
                    user.subscriptionEnd && 
                    new Date(user.subscriptionEnd) > now

    // Tính toán số ngày còn lại trong subscription
    let daysRemaining = 0
    if (isActive && user.subscriptionEnd) {
      const endDate = new Date(user.subscriptionEnd)
      const diffTime = endDate.getTime() - now.getTime()
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    return NextResponse.json({
      subscription: user.subscription || 'free',
      isActive,
      daysRemaining,
      startDate: user.subscriptionStart,
      endDate: user.subscriptionEnd
    })
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    )
  }
}