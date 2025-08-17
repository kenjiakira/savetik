"use client"

import { useI18n } from "@/lib/i18n-client"

export function HeroSection() {
  const t = useI18n()

  return (
    <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        {t("home.hero.title")}
      </h1>
      <p className="text-lg text-muted-foreground">{t("home.hero.description")}</p>
    </div>
  )
}
