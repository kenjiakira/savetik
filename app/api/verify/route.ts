import { NextResponse } from "next/server"
import { db, collections, ObjectId } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, otp } = body

    // Debug: Log verification attempt
    console.log("Verification attempt:", { email, otp })

    if (!email || !otp) {
      console.log("Missing fields:", { email: !!email, otp: !!otp })
      return NextResponse.json({ error: "Missing email or verification code" }, { status: 400 })
    }

    // Get the users collection
    const usersCollection = await db.getCollection(collections.users)

    // Find the user by email
    const user = await usersCollection.findOne({ email })
    
    // Debug: Log user found status
    console.log("User lookup result:", {
      email,
      found: !!user,
      verificationToken: user?.verificationToken,
      tokenMatches: String(user?.verificationToken) === String(otp),
      tokenExpiry: user?.verificationTokenExpiry,
      isExpired: user?.verificationTokenExpiry ? new Date() > new Date(user.verificationTokenExpiry) : "N/A",
      currentTime: new Date(),
    })

    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Convert both tokens to strings for comparison to handle number/string type issues
    const userToken = String(user.verificationToken);
    const submittedToken = String(otp);

    // Check if OTP matches and isn't expired
    if (userToken !== submittedToken) {
      console.log("OTP mismatch:", {
        providedOTP: submittedToken,
        storedOTP: userToken,
        otpLength: submittedToken.length,
        storedOTPLength: userToken.length,
        typesMatch: typeof submittedToken === typeof userToken
      })
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }

    // Check if OTP is expired
    if (user.verificationTokenExpiry && new Date() > new Date(user.verificationTokenExpiry)) {
      console.log("OTP expired:", {
        expiry: user.verificationTokenExpiry,
        currentTime: new Date()
      })
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 })
    }

    // Update the user as verified
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified: new Date(),
          verificationToken: null,
          verificationTokenExpiry: null,
          updatedAt: new Date()
        }
      }
    )

    console.log("User verified successfully:", email)
    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
