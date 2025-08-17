import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db, collections } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const usersCollection = await db.getCollection(collections.users)
          
          const user = await usersCollection.findOne({ email: credentials.email })
          
          if (!user) {
            return null
          }

          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in")
          }

          const passwordMatch = await compare(credentials.password, user.password)
          
          if (!passwordMatch) {
            return null
          }

          return {
            id: user._id.toString(),
            uid: user.uid,
            name: user.name,
            email: user.email,
            role: user.role || "user",
            subscription: user.subscription || "free",
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.uid = user.uid
        token.role = user.role
        token.subscription = user.subscription
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.uid = token.uid as string
        session.user.role = token.role as string
        session.user.subscription = token.subscription as string
      }
      return session
    },
  },
}
