import { NextResponse } from "next/server"
import { db, collections } from "@/lib/db"
import { generateSecureToken } from "@/lib/utils"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get users collection
    const usersCollection = await db.getCollection(collections.users)

    // Find user with matching email
    const foundUser = await usersCollection.findOne({ email })

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Generate secure reset token
    const resetToken = generateSecureToken()
    const resetTokenExpiry = new Date()
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1) // Token expires in 1 hour

    // Update user with reset token
    await usersCollection.updateOne(
      { _id: foundUser._id },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
          updatedAt: new Date()
        }
      }
    )

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken, foundUser.name || "User")

    return NextResponse.json({
      message: "Password reset link sent successfully",
    })
  } catch (error) {
    console.error("Reset password request error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
