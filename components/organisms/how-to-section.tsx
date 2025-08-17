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
      colorClass: "bg-pink-100 text-pink-500"
    },
    {
      number: 2,
      title: t("home.howto.step2.title"),
      description: t("home.howto.step2.description"),
      colorClass: "bg-purple-100 text-purple-500"
    },
    {
      number: 3,
      title: t("home.howto.step3.title"),
      description: t("home.howto.step3.description"),
      colorClass: "bg-violet-100 text-violet-500"
    }
  ]

  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t("home.howto.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              stepNumber={step.number}
              title={step.title}
              description={step.description}
              colorClass={step.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
