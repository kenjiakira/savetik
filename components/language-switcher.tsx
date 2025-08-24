"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-client"

export function LanguageSwitcher() {
  const params = useParams()
  const router = useRouter()
  const t = useI18n()
  const currentLocale = (params?.locale as string) || "vi"

  const toggleLanguage = () => {
    const newLocale = currentLocale === "vi" ? "en" : "vi"
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(/^\/(vi|en)/, "")
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleLanguage}
      className="relative"
      title={t("common.language")}
    >
      <Globe className="h-4 w-4" />
    </Button>
  )
}
