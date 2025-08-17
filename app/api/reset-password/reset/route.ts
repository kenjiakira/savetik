import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { hash } from "bcryptjs"
import { db, collections } from "@/lib/db"

const resetSchema = z.object({
  token: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json()
    
    // Validate input
    const result = resetSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }
    
    const { token, password } = result.data
    
    // Get users collection
    const usersCollection = await db.getCollection(collections.users)
    
    // Find user by reset token
    const user = await usersCollection.findOne({ 
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Ensure token hasn't expired
    })
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired password reset token" },
        { status: 400 }
      )
    }
    
    // Hash the new password
    const hashedPassword = await hash(password, 12)
    
    // Update the user's password and clear the reset token
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: {
          password: hashedPassword,
          updatedAt: new Date()
        },
        $unset: {
          resetToken: "",
          resetTokenExpiry: ""
        }
      }
    )
    
    return NextResponse.json(
      { message: "Password has been reset successfully. You can now login with your new password." },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
