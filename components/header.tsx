"use client"

import Logo from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"

export function AppHeader() {
  return (
    <header className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50 shadow-sm">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5" />
      
      <div className="relative container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="animate-fade-in">
            <Logo />
          </div>
          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
