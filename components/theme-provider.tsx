'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from 'next-themes'

const THEME_STORAGE_KEY = 'savetik-theme-preference'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Theo dõi xem component đã mount hoàn toàn chưa
  const [mounted, setMounted] = useState(false)

  // Đọc theme từ localStorage khi component mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Đảm bảo sử dụng storageKey nhất quán
  const storageKey = props.storageKey || THEME_STORAGE_KEY

  // Đọc theme đã lưu từ localStorage (nếu có)
  const getStoredTheme = () => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(storageKey)
      if (item) {
        try {
          // Thử phân tích JSON trước
          return JSON.parse(item)
        } catch {
          // Nếu không phải JSON, có thể là chuỗi trực tiếp
          return item.replace(/^"(.*)"$/, '$1')
        }
      }
    } catch (e) {
      console.error('Không thể đọc theme từ localStorage:', e)
    }
    return null
  }

  // Ưu tiên theme được lưu trong localStorage hoặc fallback về default
  const actualDefaultTheme = getStoredTheme() || props.defaultTheme || 'system'

  // Ẩn nội dung cho đến khi đã mount để tránh hiện flash
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <NextThemesProvider 
      {...props} 
      defaultTheme={actualDefaultTheme}
      storageKey={storageKey}
    >
      {children}
    </NextThemesProvider>
  )
}

// Hook tùy chỉnh để sử dụng theme một cách an toàn
export function useSafeTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme, ...rest } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Hàm thiết lập theme một cách an toàn
  const setThemeSafely = React.useCallback((newTheme: string) => {
    // Lưu theme trực tiếp vào localStorage để đảm bảo nó được áp dụng ngay lập tức
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme))
      } catch (e) {
        console.error('Không thể lưu theme vào localStorage:', e)
      }
    }
    // Sử dụng API của next-themes để cập nhật theme
    setTheme(newTheme)
  }, [setTheme])
  
  return {
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    setTheme: setThemeSafely,
    ...rest,
    mounted
  }
}
