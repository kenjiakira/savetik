"use client"

import { DownloadButton } from "@/components/atoms/download-button"
import { useI18n } from "@/lib/i18n-client"
import { TikTokData, DownloadType } from "@/types/tiktok"

interface DownloadActionsProps {
  result: TikTokData
  downloadLoading: boolean
  onDownload: (url: string, filename: string) => void
  generateFileName: (type: DownloadType) => string
}

export function DownloadActions({ 
  result, 
  downloadLoading, 
  onDownload, 
  generateFileName 
}: DownloadActionsProps) {
  const t = useI18n()

  return (
    <div className="grid gap-3">
      {result.hdplay && (
        <div className="grid gap-3 md:grid-cols-2">
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadHD")}
            onDownload={() => onDownload(result.hdplay || '', generateFileName('hd'))}
            className="bg-green-500 hover:bg-green-600"
          />
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadSD")}
            onDownload={() => onDownload(result.play, generateFileName('sd'))}
            variant="outline"
          />
        </div>
      )}
      
      <div className="grid gap-3 md:grid-cols-2">
        <DownloadButton
          isLoading={downloadLoading}
          label={t("home.results.downloadVideo")}
          onDownload={() => onDownload(result.play, generateFileName('video'))}
          variant={result.hdplay ? "outline" : "default"}
          className={!result.hdplay ? "bg-green-500 hover:bg-green-600" : ""}
        />
        
        {result.music && (
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadMusic")}
            onDownload={() => onDownload(result.music || '', generateFileName('music'))}
            variant="outline"
          />
        )}
      </div>
    </div>
  )
}
