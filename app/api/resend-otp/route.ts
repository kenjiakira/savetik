import { NextResponse } from "next/server"
import { db, collections } from "@/lib/db"
import { generateOTP } from "@/lib/utils"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get the users collection
    const usersCollection = await db.getCollection(collections.users)
    
    // Find user with matching email
    const foundUser = await usersCollection.findOne({ email })

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If user is already verified, return error
    if (foundUser.emailVerified) {
      return NextResponse.json({ error: "Email is already verified" }, { status: 400 })
    }

    // Generate new OTP
    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10) // OTP expires in 10 minutes

    // Update user with new OTP
    await usersCollection.updateOne(
      { _id: foundUser._id },
      {
        $set: {
          verificationToken: otp,
          verificationTokenExpiry: otpExpiry,
          updatedAt: new Date()
        }
      }
    )

    // Send verification email
    await sendVerificationEmail(email, otp, foundUser.name || "User")

    return NextResponse.json({
      message: "Verification code sent successfully",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
