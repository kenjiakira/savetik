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
      <div className="max-w-4xl mx-auto">
        {!result && !loading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Download className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg">{t("home.results.empty")}</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <p className="text-muted-foreground text-lg">{t("home.results.processing")}</p>
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
