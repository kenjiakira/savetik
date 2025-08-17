"use client"

import { AuthorInfo } from "@/components/atoms/author-info"
import { DownloadActions } from "@/components/molecules/download-actions"
import { ImageGallery } from "@/components/molecules/image-gallery"
import { TikTokData, DownloadType } from "@/types/tiktok"

interface ImagesResultProps {
  result: TikTokData
  isMobile: boolean
  downloadLoading: boolean
  onDownload: (url: string, filename: string) => void
  generateFileName: (type: DownloadType) => string
}

export function ImagesResult({ 
  result, 
  isMobile,
  downloadLoading, 
  onDownload, 
  generateFileName 
}: ImagesResultProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mx-auto mb-6">
        <h3 className="font-medium text-lg mb-4 line-clamp-2">
          {result.title || "TikTok Video"}
        </h3>

        <AuthorInfo
          avatar={result.author.avatar}
          nickname={result.author.nickname}
          uniqueId={result.author.unique_id}
        />

        <DownloadActions
          result={result}
          downloadLoading={downloadLoading}
          onDownload={onDownload}
          generateFileName={generateFileName}
        />
      </div>

      {result.images && (
        <ImageGallery
          images={result.images}
          isMobile={isMobile}
          downloadLoading={downloadLoading}
          onDownloadImage={onDownload}
          generateFileName={generateFileName}
        />
      )}
    </div>
  )
}
