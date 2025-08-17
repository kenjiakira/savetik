"use client"

import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-client"

interface ImageGalleryProps {
  images: string[]
  isMobile: boolean
  downloadLoading: boolean
  onDownloadImage: (imageUrl: string, filename: string) => void
  generateFileName: (type: 'image') => string
}

export function ImageGallery({
  images,
  isMobile,
  downloadLoading,
  onDownloadImage,
  generateFileName
}: ImageGalleryProps) {
  const t = useI18n()

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
            <img
              src={image}
              alt={`${t("home.results.image")} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:text-white hover:border-white" 
                onClick={() => onDownloadImage(
                  image, 
                  `${generateFileName('image')}_${index + 1}.jpg`
                )}
                disabled={downloadLoading}
              >
                {downloadLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Download className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-muted-foreground">
              {t("home.results.image")} {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onDownloadImage(
                image,
                `${generateFileName('image')}_${index + 1}.jpg`
              )}
              disabled={downloadLoading}
            >
              {downloadLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
