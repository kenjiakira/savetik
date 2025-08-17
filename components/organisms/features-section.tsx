"use client"

import { useI18n } from "@/lib/i18n-client"
import FeatureCard from "@/components/feature-card"

export function FeaturesSection() {
  const t = useI18n()

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {t("home.features.title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon="zap"
          title={t("home.features.fast.title")}
          description={t("home.features.fast.description")}
        />
        <FeatureCard
          icon="shield"
          title={t("home.features.safe.title")}
          description={t("home.features.safe.description")}
        />
        <FeatureCard
          icon="check-circle"
          title={t("home.features.quality.title")}
          description={t("home.features.quality.description")}
        />
      </div>
    </section>
  )
}
