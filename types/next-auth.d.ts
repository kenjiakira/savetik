import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      uid: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      subscription: string
    }
  }

  interface User {
    id: string
    uid: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
    subscription: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    uid: string
    role: string
    subscription: string
  }
}
