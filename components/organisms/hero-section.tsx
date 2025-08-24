"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n-client"
import { SearchForm } from "@/components/molecules/search-form"

interface HeroSectionProps {
  onSubmit: (url: string) => Promise<void>
  loading: boolean
  error: string | null
}

export function HeroSection({ onSubmit, loading, error }: HeroSectionProps) {
  const t = useI18n()

  return (
    <div className="relative w-full overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-400/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent">
              {t("home.hero.title")}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t("home.hero.description")}
          </p>
          
          {/* Search Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <SearchForm 
              onSubmit={onSubmit}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
