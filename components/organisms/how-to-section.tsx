"use client"

import { useI18n } from "@/lib/i18n-client"
import { StepCard } from "@/components/atoms/step-card"

export function HowToSection() {
  const t = useI18n()

  const steps = [
    {
      number: 1,
      title: t("home.howto.step1.title"),
      description: t("home.howto.step1.description"),
      colorClass: "bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400"
    },
    {
      number: 2,
      title: t("home.howto.step2.title"),
      description: t("home.howto.step2.description"),
      colorClass: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      number: 3,
      title: t("home.howto.step3.title"),
      description: t("home.howto.step3.description"),
      colorClass: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400"
    }
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/50 dark:from-amber-900/20 dark:via-orange-900/30 dark:to-yellow-900/20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-400/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/5 to-amber-400/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-yellow-700 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-300 bg-clip-text text-transparent mb-4 animate-fade-in">
            {t("home.howto.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full animate-slide-in" />
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <StepCard
                stepNumber={step.number}
                title={step.title}
                description={step.description}
                colorClass={step.colorClass}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
