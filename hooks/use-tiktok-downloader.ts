"use client"

import { useState, useEffect } from "react"
import { TikTokData, DownloadType } from "@/types/tiktok"

export function useTikTokDownloader() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TikTokData | null>(null)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (inputUrl: string) => {
    if (!inputUrl.trim()) {
      setError("Vui lòng nhập liên kết TikTok")
      return
    }

    setLoading(true)
    setError(null)
    setUrl(inputUrl)

    try {
      const response = await fetch("/api/tiktok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi tải video")
      }

      if (data.code !== 0) {
        throw new Error(data.msg || "Có lỗi xảy ra khi xử lý video")
      }

      setResult(data.data)
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại sau")
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = async (url: string, filename: string) => {
    try {
      setDownloadLoading(true)
      const response = await fetch('/api/force-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, filename }),
      })

      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Có lỗi xảy ra khi tải xuống. Vui lòng thử lại sau.')
    } finally {
      setDownloadLoading(false)
    }
  }

  const generateFileName = (type: DownloadType) => {
    if (!result) return ''
    
    const cleanId = result.id.replace(/[^a-zA-Z0-9]/g, '')
    const cleanTitle = result.title
      ?.slice(0, 50)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || ''

    switch (type) {
      case 'hd':
        return `tiktok_${cleanId}_hd_${cleanTitle}.mp4`
      case 'sd':
        return `tiktok_${cleanId}_sd_${cleanTitle}.mp4`
      case 'video':
        return `tiktok_${cleanId}_${cleanTitle}.mp4`
      case 'music':
        return `tiktok_${cleanId}_music_${cleanTitle}.mp3`
      case 'image':
        return `tiktok_${cleanId}_image`
      default:
        return `tiktok_${cleanId}`
    }
  }

  return {
    loading,
    error,
    result,
    downloadLoading,
    isMobile,
    handleSubmit,
    downloadFile,
    generateFileName
  }
}
