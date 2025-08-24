"use client"

import { useI18n } from "@/lib/i18n-client"
import FeatureCard from "@/components/feature-card"

export function FeaturesSection() {
  const t = useI18n()

  return (
    <section className="relative overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-400/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-4 animate-fade-in">
            {t("home.features.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full animate-slide-in" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <FeatureCard
              icon="zap"
              title={t("home.features.fast.title")}
              description={t("home.features.fast.description")}
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <FeatureCard
              icon="shield"
              title={t("home.features.safe.title")}
              description={t("home.features.safe.description")}
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <FeatureCard
              icon="check-circle"
              title={t("home.features.quality.title")}
              description={t("home.features.quality.description")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
