"use client"

import { VideoPlayer } from "@/components/ui/video-player"
import { AuthorInfo } from "@/components/atoms/author-info"
import { DownloadActions } from "@/components/molecules/download-actions"
import { TikTokData, DownloadType } from "@/types/tiktok"

interface VideoResultProps {
  result: TikTokData
  downloadLoading: boolean
  onDownload: (url: string, filename: string) => void
  generateFileName: (type: DownloadType) => string
}

export function VideoResult({ 
  result, 
  downloadLoading, 
  onDownload, 
  generateFileName 
}: VideoResultProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto mb-6">
        <h3 className="font-medium text-lg mb-4 line-clamp-2">
          {result.title || "TikTok Video"}
        </h3>

        <AuthorInfo
          avatar={result.author.avatar}
          nickname={result.author.nickname}
          uniqueId={result.author.unique_id}
        />

        <div className="w-full bg-black rounded-lg mb-6 overflow-hidden">
          <VideoPlayer
            src={result.play}
            poster={result.origin_cover}
            preload="metadata"
            className="w-full"
          />
        </div>

        <DownloadActions
          result={result}
          downloadLoading={downloadLoading}
          onDownload={onDownload}
          generateFileName={generateFileName}
        />
      </div>
    </div>
  )
}
