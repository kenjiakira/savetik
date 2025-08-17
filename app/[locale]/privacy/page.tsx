"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  const t = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t("privacy.title")}</h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <p>{t("privacy.lastUpdated")}: 08/05/2025</p>

          <h2>1. {t("privacy.introduction.title")}</h2>
          <p>
            {t("privacy.introduction.content")}
          </p>

          <h2>2. {t("privacy.dataCollection.title")}</h2>
          <p>{t("privacy.dataCollection.intro")}</p>
          <ul>
            <li>
              <strong>{t("privacy.dataCollection.usage.title")}</strong> {t("privacy.dataCollection.usage.content")}
            </li>
            <li>
              <strong>{t("privacy.dataCollection.device.title")}</strong> {t("privacy.dataCollection.device.content")}
            </li>
            <li>
              <strong>{t("privacy.dataCollection.cookies.title")}</strong> {t("privacy.dataCollection.cookies.content")}
            </li>
          </ul>

          <h2>3. {t("privacy.dataUse.title")}</h2>
          <p>{t("privacy.dataUse.intro")}</p>
          <ul>
            <li>{t("privacy.dataUse.provide")}</li>
            <li>{t("privacy.dataUse.protect")}</li>
            <li>{t("privacy.dataUse.understand")}</li>
            <li>{t("privacy.dataUse.improve")}</li>
          </ul>

          <h2>4. {t("privacy.dataSharing.title")}</h2>
          <p>
            {t("privacy.dataSharing.content")}
          </p>

          <h2>5. {t("privacy.dataSecurity.title")}</h2>
          <p>
            {t("privacy.dataSecurity.content")}
          </p>

          <h2>6. {t("privacy.userRights.title")}</h2>
          <p>
            {t("privacy.userRights.content")}
          </p>

          <h2>7. {t("privacy.policyChanges.title")}</h2>
          <p>
            {t("privacy.policyChanges.content")}
          </p>

          <h2>8. {t("privacy.contact.title")}</h2>
          <p>{t("privacy.contact.intro")}</p>
          <ul>
            <li>{t("privacy.contact.name")}</li>
            <li>{t("privacy.contact.phone")}</li>
            <li>{t("privacy.contact.email")}</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}