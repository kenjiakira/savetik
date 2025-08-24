"use client"

import { DownloadButton } from "@/components/atoms/download-button"
import { ShareButtons } from "@/components/molecules/share-buttons"
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
    <div className="space-y-4">
      {result.hdplay && (
        <div className="grid gap-3 md:grid-cols-2">
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadHD")}
            onDownload={() => onDownload(result.hdplay || '', generateFileName('hd'))}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-xl h-12"
          />
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadSD")}
            onDownload={() => onDownload(result.play, generateFileName('sd'))}
            variant="outline"
            className="border-2 rounded-xl h-12 font-medium"
          />
        </div>
      )}
      
      <div className="grid gap-3 md:grid-cols-2">
        <DownloadButton
          isLoading={downloadLoading}
          label={t("home.results.downloadVideo")}
          onDownload={() => onDownload(result.play, generateFileName('video'))}
          variant={result.hdplay ? "outline" : "default"}
          className={!result.hdplay ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-xl h-12" : "border-2 rounded-xl h-12 font-medium"}
        />
        
        {result.music && (
          <DownloadButton
            isLoading={downloadLoading}
            label={t("home.results.downloadMusic")}
            onDownload={() => onDownload(result.music || '', generateFileName('music'))}
            variant="outline"
            className="border-2 rounded-xl h-12 font-medium"
          />
        )}
      </div>

      {/* Share Buttons */}
      <div className="pt-6 border-t border-gray-200">
        <ShareButtons 
          url={result.play} 
          title={result.title || "TikTok Video"}
        />
      </div>
    </div>
  )
}
