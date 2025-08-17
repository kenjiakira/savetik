import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateOTP(length = 6) {
  // Always generate exactly 6 digits for OTP regardless of length parameter
  const digits = "0123456789"
  let OTP = ""

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }

  return OTP
}

export function generateSecureToken(length = 32) {
  // Generate a secure random string for password reset tokens
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return token
}

export function generateUID() {
  const digits = "0123456789"
  let uid = ""
  
  uid += digits.substring(1, 10)[Math.floor(Math.random() * 9)]
  
  for (let i = 0; i < 8; i++) {
    uid += digits[Math.floor(Math.random() * 10)]
  }
  
  return uid
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export async function detectUserLanguage() {
  try {
    const response = await fetch("https://ipwho.is/")
    const data = await response.json()

    if (data.success && data.country_code) {
     
      const languageMap: Record<string, string> = {
        VN: "vi",
        US: "en",
        GB: "en",
     
      }

      return languageMap[data.country_code] || "en"
    }

    return "en"
  } catch (error) {
    console.error("Error detecting language:", error)
    return "en"
  }
}
