"use client"

import { Download, Loader2 } from "lucide-react"
import { useI18n } from "@/lib/i18n-client"
import { VideoResult } from "./video-result"
import { ImagesResult } from "./images-result"
import { TikTokData, DownloadType } from "@/types/tiktok"

interface ResultsSectionProps {
  result: TikTokData | null
  loading: boolean
  isMobile: boolean
  downloadLoading: boolean
  onDownload: (url: string, filename: string) => void
  generateFileName: (type: DownloadType) => string
}

export function ResultsSection({
  result,
  loading,
  isMobile,
  downloadLoading,
  onDownload,
  generateFileName
}: ResultsSectionProps) {
  const t = useI18n()

  return (
    <div className="mt-12 md:mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {t("home.results.title")}
      </h2>

      <div className="bg-background rounded-lg border p-6 max-w-3xl mx-auto shadow-sm">
        {!result && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-2">{t("home.results.empty")}</p>
            <Download className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("home.results.processing")}</p>
          </div>
        )}

        {result && !result.images && (
          <VideoResult
            result={result}
            downloadLoading={downloadLoading}
            onDownload={onDownload}
            generateFileName={generateFileName}
          />
        )}

        {result && result.images && (
          <ImagesResult
            result={result}
            isMobile={isMobile}
            downloadLoading={downloadLoading}
            onDownload={onDownload}
            generateFileName={generateFileName}
          />
        )}
      </div>
    </div>
  )
}
