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
        <div key={index} className="group">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={`${t("home.results.image")} ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30 hover:scale-110 transition-all" 
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
        </div>
      ))}
    </div>
  )
}
