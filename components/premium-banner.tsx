"use client"

import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-client"
import Link from "next/link"

export default function PremiumBanner() {
  const t = useI18n()

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-4 mb-4 border border-yellow-500/30">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-2 rounded-full">
          <Crown className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{t("common.premium")}</h3>
          <p className="text-xs text-muted-foreground">{t("home.upgrade.features.batchDescription")}</p>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
          asChild
        >
          <Link href="/pricing">{t("home.upgrade.button")}</Link>
        </Button>
      </div>
    </div>
  )
}
