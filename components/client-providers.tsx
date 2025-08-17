"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n-client"

// Hằng số cho khóa lưu theme trong localStorage
const THEME_STORAGE_KEY = 'savetik-theme-preference'

export default function ClientProviders({ 
  children, 
  locale 
}: { 
  children: React.ReactNode, 
  locale: string 
}) {
  const [mounted, setMounted] = useState(false)

  // Đảm bảo component được mount hoàn toàn
  useEffect(() => {
    setMounted(true)
  }, [])

  // Nhiều trình duyệt có thể bị lỗi khi làm việc với localStorage trong SSR
  // nên chúng ta phải đảm bảo là ở môi trường client trước
  const getStoredTheme = () => {
    if (typeof window === 'undefined') return null
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY)
      return theme ? JSON.parse(theme) : null
    } catch (e) {
      console.error("Lỗi khi đọc theme từ localStorage:", e)
      return null
    }
  }

  return (
    <SessionProvider>
      <I18nProvider locale={locale as "en" | "vi"}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
          storageKey={THEME_STORAGE_KEY}
        >
          {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeProvider>
      </I18nProvider>
    </SessionProvider>
  )
}