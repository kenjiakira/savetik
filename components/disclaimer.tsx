import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useI18n } from "@/lib/i18n-client" 

export default function Disclaimer() {
  const t = useI18n()

  return (
    <Alert className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="ml-2 text-sm">
        {t("common.disclaimer") || "Savetik is a tool for downloading videos from TikTok for personal use only. Please respect intellectual property rights and do not use downloaded content for commercial purposes."}
      </AlertDescription>
    </Alert>
  )
}
