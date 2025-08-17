import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db, collections, ObjectId } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Get users collection
    const usersCollection = await db.getCollection(collections.users)

    // Update user in MongoDB
    await usersCollection.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          name,
          updatedAt: new Date()
        }
      }
    )

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        ...session.user,
        name,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
