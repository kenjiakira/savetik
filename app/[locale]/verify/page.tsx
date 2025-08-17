"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ChevronLeft } from "lucide-react"
import Logo from "@/components/logo"

export default function VerifyPage() {
  const t = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // Get email from search params when component mounts
    const emailParam = searchParams.get("email")
    if (!emailParam) {
      // If no email param is provided, show error and redirect after 3 seconds
      setError("No email address provided. Redirecting to registration page...")
      setTimeout(() => {
        router.push("/register")
      }, 3000)
    } else {
      setEmail(emailParam)
    }
  }, [searchParams, router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email and OTP before submitting
    if (!email) {
      setError("Email address is missing. Please return to the registration page.")
      return
    }
    
    if (!otp) {
      setError("Please enter the verification code.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Submitting verification with:", { email, otp })
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      // Redirect to login page after successful verification
      router.push("/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email) {
      setError("Email address is missing. Please return to the registration page.")
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP")
      }

      // Start countdown for 60 seconds
      setCountdown(60)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.home")}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl text-center">{t("auth.verify.title")}</CardTitle>
            <CardDescription className="text-center">{t("auth.verify.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" value={email} disabled />
              </div>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  {t("auth.verify.code")}
                </label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !email}>
                {loading ? "Loading..." : t("auth.verify.button")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              {t("auth.verify.resend")}{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleResendOTP}
                disabled={countdown > 0 || loading || !email}
              >
                {countdown > 0 ? `${t("auth.verify.resendButton")} (${countdown}s)` : t("auth.verify.resendButton")}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
