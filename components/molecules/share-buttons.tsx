"use client"

import { useState } from "react"
import { Share2, QrCode, Facebook, Twitter, Link, Copy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n-client"
import { QRCodeSVG } from "qrcode.react"

interface ShareButtonsProps {
  url: string
  title?: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const t = useI18n()
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url
  const shareTitle = title || "Check out this TikTok video!"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    window.open(telegramUrl, '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-3">{t("home.results.share") || "Share this video"}</h4>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="outline"
          onClick={() => setShowQR(true)}
          className="flex flex-col items-center gap-2 h-16 rounded-xl"
        >
          <QrCode className="h-5 w-5" />
          <span className="text-xs">QR Code</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleFacebookShare}
          className="flex flex-col items-center gap-2 h-16 rounded-xl"
        >
          <Facebook className="h-5 w-5 text-blue-600" />
          <span className="text-xs">Facebook</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleTwitterShare}
          className="flex flex-col items-center gap-2 h-16 rounded-xl"
        >
          <Twitter className="h-5 w-5 text-blue-400" />
          <span className="text-xs">Twitter</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 h-16 rounded-xl"
        >
          {copied ? (
            <>
              <Copy className="h-5 w-5 text-green-600" />
              <span className="text-xs text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Link className="h-5 w-5" />
              <span className="text-xs">Copy Link</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-green-50 hover:bg-green-100 border-green-200"
        >
          <span className="text-green-600 font-semibold">WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleTelegramShare}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border-blue-200"
        >
          <span className="text-blue-600 font-semibold">Telegram</span>
        </Button>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG 
                value={shareUrl} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to share the video on your mobile device
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
