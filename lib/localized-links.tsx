"use client"

import React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

/**
 * Hook lấy locale hiện tại từ route params
 */
export function useCurrentLocale() {
  const params = useParams()
  return (params?.locale as string) || "vi" // Mặc định là tiếng Việt
}

/**
 * Hook tạo đường dẫn với locale
 */
export function useLocalizedLink() {
  const locale = useCurrentLocale()
  
  return (path: string) => {
    // Nếu đường dẫn đã có locale hoặc là đường dẫn ngoại bộ hoặc là anchor
    if (path.startsWith('/api') || path.startsWith('http') || path.startsWith('#')) {
      return path
    }
    
    // Xử lý path đặc biệt như "/"
    if (path === "/") {
      return `/${locale}`
    }
    
    // Tránh thêm locale nếu đường dẫn đã có locale
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return path
    }
    
    // Thêm locale cho đường dẫn 
    return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`
  }
}

/**
 * Component Link có locale tự động
 */
export function LocalizedLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const getLocalizedPath = useLocalizedLink()
  
  // Chuyển đổi href thành string nếu cần
  const hrefStr = typeof href === "string" ? href : href.toString()
  
  return <Link {...props} href={getLocalizedPath(hrefStr)} />
}