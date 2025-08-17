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

    // Lấy thông tin subscription hiện tại
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      columns: {
        subscription: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.subscription !== 'premium') {
      return NextResponse.json(
        { error: 'No active subscription to cancel' },
        { status: 400 }
      )
    }

    // Trong thực tế, đây là nơi bạn sẽ gọi API của nhà cung cấp thanh toán
    // để hủy subscription (như Stripe, PayPal, v.v.)
    // const paymentProvider = await cancelSubscriptionWithProvider(userId)

    // Cập nhật trạng thái trong database
    // Lưu ý: Chúng ta không xóa ngày kết thúc vì người dùng vẫn được
    // sử dụng dịch vụ đến khi hết hạn đăng ký hiện tại
    await db.update(db.users)
      .set({ 
        subscriptionStatus: 'canceled',
        autoRenew: false,
        updatedAt: new Date() 
      })
      .where(db.eq(db.users.id, userId))

    return NextResponse.json({
      success: true,
      message: 'Subscription canceled successfully. You will have access until the end of your current billing period.'
    })
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}