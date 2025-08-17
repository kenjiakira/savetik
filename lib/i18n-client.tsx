"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import en from "./locales/en"
import vi from "./locales/vi"
import type { Locale } from './i18n'

// Simple types for our i18n system
type LocaleType = "en" | "vi" 
type TranslationsType = Record<string, any>

// Create a context for our i18n functionality
const I18nContext = React.createContext<{
  locale: LocaleType;
  t: (key: string, params?: Record<string, any>) => string;
  changeLocale: (locale: LocaleType) => void;
} | null>(null)

type I18nContextType = {
  locale: Locale
  t: (key: string, params?: Record<string, string>) => string
}

const Context = createContext<I18nContextType | null>(null)

// Available translations
const translations: Record<LocaleType, TranslationsType> = {
  en,
  vi,
}

// Get translation by dot notation (e.g., "common.button.submit")
function getNestedTranslation(obj: any, path: string): string {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) return path
    result = result[key]
  }

  return result !== undefined && typeof result === 'string' ? result : path
}

// Handle replacements like {count} in strings
function formatString(str: string, params?: Record<string, any>): string {
  if (!params) return str
  
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, 'g'), String(value))
  }, str)
}

// Create our provider component
export function I18nProvider({
  children,
  locale = "vi", // Default to Vietnamese
}: {
  children: React.ReactNode;
  locale?: LocaleType;
}) {
  const [currentLocale, setCurrentLocale] = React.useState<LocaleType>(locale as LocaleType)

  // Translation function
  const t = React.useCallback(
    (key: string, params?: Record<string, any>) => {
      const translation = getNestedTranslation(translations[currentLocale], key)
      return formatString(translation, params)
    },
    [currentLocale]
  )

  // Change locale function
  const changeLocale = React.useCallback((newLocale: LocaleType) => {
    setCurrentLocale(newLocale)
  }, [])

  const value = React.useMemo(() => {
    return { locale: currentLocale, t, changeLocale }
  }, [currentLocale, t, changeLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// Custom hook to use our i18n functionality
export function useI18n() {
  const context = React.useContext(I18nContext)
  
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  
  return context.t
}

// Scoped i18n hook for compatibility with original API
export function useScopedI18n(scope: string) {
  const t = useI18n()
  
  return React.useCallback(
    (key: string, params?: Record<string, any>) => {
      return t(`${scope}.${key}`, params)
    },
    [t, scope]
  )
}

/**
 * Hook để tạo đường dẫn có ngôn ngữ chính xác
 * Sử dụng hook này khi cần tạo liên kết đến các trang khác để đảm bảo giữ nguyên ngôn ngữ
 */
export function useLocalizedPath() {
  const context = useContext(Context)
  if (context === null) {
    throw new Error('useLocalizedPath must be used within I18nProvider')
  }
  
  const { locale } = context
  
  return (path: string) => {
    // Nếu đường dẫn đã bắt đầu bằng /locale/ thì không cần thêm locale nữa
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return path
    }
    
    // Nếu đường dẫn bắt đầu bằng / thì thêm locale vào đầu
    if (path.startsWith('/')) {
      return `/${locale}${path}`
    }
    
    // Nếu không, giả định đây là đường dẫn tương đối và thêm /locale/ vào đầu
    return `/${locale}/${path}`
  }
}

// Default export for backward compatibility
export default { useI18n, useScopedI18n, I18nProvider }