// This file contains both server and client exports for i18n

// Server-side dictionary loaders - can be used in Server Components
export const loadDictionary = async (locale: string) => {
  switch (locale) {
    case 'en':
      return import('./locales/en').then(module => module.default)
    case 'vi':
      return import('./locales/vi').then(module => module.default)
    default:
      return import('./locales/vi').then(module => module.default) // fallback to Vietnamese
  }
}

export const defaultLocale = 'vi'
export const locales = ['en', 'vi'] as const
export type Locale = (typeof locales)[number]

// Client-side implementation
// Must be imported only in Client Components
export const createClientI18n = () => {
  "use client"
  
  const { createI18n } = require("next-international")

  return createI18n({
    en: () => import("./locales/en"),
    vi: () => import("./locales/vi"),
  })
}
