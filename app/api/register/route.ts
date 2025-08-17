import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db, collections } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"
import { z } from "zod"
import { generateOTP } from "@/lib/utils"
import { generateUID } from "@/lib/utils"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const result = registerSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }
    
    const { name, email, password } = result.data
    
    const usersCollection = await db.getCollection(collections.users)
    const existingUser = await usersCollection.findOne({ email })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }
    
    // Generate verification token (6-digit OTP)
    const verificationToken = generateOTP()
    const verificationTokenExpiry = new Date()
    verificationTokenExpiry.setMinutes(verificationTokenExpiry.getMinutes() + 10) // OTP expires in 10 minutes
    
    // Hash password
    const hashedPassword = await hash(password, 12)
    
    // Generate a unique 9-digit UID
    const uid = generateUID()
    
    // Create new user
    const user = {
      uid, // 9-digit unique identifier
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
      subscription: "free",
    }
    
    await usersCollection.insertOne(user)
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken, name)
    
    return NextResponse.json(
      { message: "Registration successful. Please check your email to verify your account." },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
