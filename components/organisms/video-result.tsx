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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {result.title || "TikTok Video"}
        </h3>
        <AuthorInfo
          avatar={result.author.avatar}
          nickname={result.author.nickname}
          uniqueId={result.author.unique_id}
        />
      </div>

      <div className="w-full max-w-2xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
        <VideoPlayer
          src={result.play}
          poster={result.origin_cover}
          preload="metadata"
          className="w-full"
        />
      </div>

      <div className="max-w-md mx-auto">
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
