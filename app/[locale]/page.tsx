"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useI18n } from "@/lib/i18n-client"
import { Download, Loader2, AlertCircle, Check, Crown, Globe, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { LocalizedLink } from "@/lib/localized-links"
import Logo from "@/components/logo"
import FeatureCard from "@/components/feature-card"
import Footer from "@/components/footer"
import PremiumBanner from "@/components/premium-banner"
import { VideoPlayer } from "@/components/ui/video-player"
import Disclaimer from "@/components/disclaimer"

interface TikTokData {
  id: string
  title: string
  cover: string
  origin_cover: string
  play: string
  wmplay: string
  hdplay?: string
  music?: string
  music_info?: {
    title: string
    author: string
  }
  play_count: number
  digg_count: number
  comment_count: number
  share_count: number
  download_count: number
  create_time: number
  author: {
    id: string
    unique_id: string
    nickname: string
    avatar: string
  }
  images?: string[]
}

interface ApiResponse {
  code: number
  msg: string
  data: TikTokData
  processed_time?: number
}

export default function Home() {
  const t = useI18n()
  const { data: session, status } = useSession()
  const [url, setUrl] = useState("")
  const [batchUrls, setBatchUrls] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TikTokData | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("single")
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const targetUrl = activeTab === "single" ? url : batchUrls.split("\n")[0]

    if (!targetUrl.trim()) {
      setError(activeTab === "single" ? "Vui lòng nhập liên kết TikTok" : "Vui lòng nhập ít nhất một liên kết TikTok")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/tiktok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra khi tải video")
      }

      if (data.code !== 0) {
        throw new Error(data.msg || "Có lỗi xảy ra khi xử lý video")
      }

      setResult(data.data)
      if (data.data.images) {
        setSelectedImages(data.data.images)
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại sau")
    } finally {
      setLoading(false)
    }
  }

  const toggleImageSelection = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image))
    } else {
      setSelectedImages([...selectedImages, image])
    }
  }

  const selectAllImages = () => {
    if (result?.images) {
      setSelectedImages([...result.images])
    }
  }

  const deselectAllImages = () => {
    setSelectedImages([])
  }

  const downloadFile = async (url: string, filename: string) => {
    try {
      setDownloadLoading(true);
      const response = await fetch('/api/force-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, filename }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Có lỗi xảy ra khi tải xuống. Vui lòng thử lại sau.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const generateFileName = (type: 'hd' | 'sd' | 'video' | 'music' | 'image') => {
    if (!result) return '';
    
    const cleanId = result.id.replace(/[^a-zA-Z0-9]/g, '');
    const cleanTitle = result.title
      ?.slice(0, 50)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || '';

    switch (type) {
      case 'hd':
        return `tiktok_${cleanId}_hd_${cleanTitle}.mp4`;
      case 'sd':
        return `tiktok_${cleanId}_sd_${cleanTitle}.mp4`;
      case 'video':
        return `tiktok_${cleanId}_${cleanTitle}.mp4`;
      case 'music':
        return `tiktok_${cleanId}_music_${cleanTitle}.mp3`;
      case 'image':
        return `tiktok_${cleanId}_image`;
      default:
        return `tiktok_${cleanId}`;
    }
  };

  // Add useEffect to check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/en" prefetch={false}>
                      English
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/vi" prefetch={false}>
                      Tiếng Việt
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {session.user.name}
                      <Badge className="ml-2 bg-primary">
                        {session.user.subscription === "premium" ? t("common.premium") : t("common.free")}
                      </Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <LocalizedLink href="/profile">{t("common.profile")}</LocalizedLink>
                    </DropdownMenuItem>
                    {session.user.subscription !== "premium" && (
                      <DropdownMenuItem asChild>
                        <LocalizedLink href="/pricing">{t("common.premium")}</LocalizedLink>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => signOut({ callbackUrl: '/' })}>
                      {t("common.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="hidden md:flex">
                        <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                        {t("common.premium")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t("home.upgrade.title")}</DialogTitle>
                        <DialogDescription>{t("home.upgrade.description")}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{t("home.upgrade.features.batch")}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("home.upgrade.features.batchDescription")}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{t("home.upgrade.features.noAds")}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("home.upgrade.features.noAdsDescription")}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{t("home.upgrade.features.priority")}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("home.upgrade.features.priorityDescription")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                        >
                          <LocalizedLink href="/login">{t("common.login")}</LocalizedLink>
                        </Button>
                        <Button asChild variant="outline">
                          <LocalizedLink href="/register">{t("common.register")}</LocalizedLink>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" asChild>
                    <LocalizedLink href="/login">{t("common.login")}</LocalizedLink>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("home.hero.description")}</p>
          </div>

          <Disclaimer />

          <Card className="max-w-3xl mx-auto border-2 shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="single" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="single">{t("home.tabs.single")}</TabsTrigger>
                  <TabsTrigger value="batch" className="relative">
                    {t("home.tabs.batch")}
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-amber-500">
                      Premium
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="single">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-3">
                      <Input
                        type="text"
                        placeholder={t("home.form.placeholder")}
                        className="flex-1 h-12 text-base"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("home.form.processing")}
                          </>
                        ) : (
                          t("home.form.button")
                        )}
                      </Button>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="text-center text-sm text-muted-foreground">{t("home.form.support")}</div>
                  </form>
                </TabsContent>
                <TabsContent value="batch">
                  {session?.user.subscription === "premium" ? (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-3">
                        <textarea
                          placeholder={t("home.tabs.batchPlaceholder")}
                          className="flex-1 h-32 text-base rounded-md border border-input bg-background px-3 py-2 resize-none"
                          value={batchUrls}
                          onChange={(e) => setBatchUrls(e.target.value)}
                          disabled={loading}
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                          disabled={loading}
                        >
                          <Crown className="mr-2 h-4 w-4" /> {t("home.tabs.batchButton")}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <PremiumBanner />
                      <form className="space-y-6 opacity-60 pointer-events-none">
                        <div className="flex flex-col gap-3">
                          <textarea
                            placeholder={t("home.tabs.batchPlaceholder")}
                            className="flex-1 h-32 text-base rounded-md border border-input bg-background px-3 py-2 resize-none"
                            value={batchUrls}
                            onChange={(e) => setBatchUrls(e.target.value)}
                            disabled
                          />
                          <Button
                            type="submit"
                            size="lg"
                            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                            disabled
                          >
                            <Crown className="mr-2 h-4 w-4" /> {t("home.tabs.batchButton")}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-12 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t("home.results.title")}</h2>

            <div className="bg-background rounded-lg border p-6 max-w-3xl mx-auto shadow-sm">
              {!result && !loading && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-2">{t("home.results.empty")}</p>
                  <Download className="h-12 w-12 text-muted-foreground/50" />
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">{t("home.results.processing")}</p>
                </div>
              )}

              {result && !result.images && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-3xl mx-auto mb-6">
                    <h3 className="font-medium text-lg mb-4 line-clamp-2">{result.title || "TikTok Video"}</h3>

                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={result.author.avatar || "/placeholder.svg"}
                        alt={result.author.nickname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{result.author.nickname}</p>
                        <p className="text-sm text-muted-foreground">@{result.author.unique_id}</p>
                      </div>
                    </div>

                    <div className="w-full bg-black rounded-lg mb-6 overflow-hidden">
                      <VideoPlayer
                        src={result.play}
                        poster={result.origin_cover}
                        preload="metadata"
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-3">
                      {result.hdplay && (
                        <div className="grid gap-3 md:grid-cols-2">
                          <Button
                            className="bg-green-500 hover:bg-green-600"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.hdplay || '', generateFileName('hd'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadHD")}
                          </Button>
                          <Button
                            variant="outline"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.play, generateFileName('sd'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadSD")}
                          </Button>
                        </div>
                      )}
                      
                      <div className="grid gap-3 md:grid-cols-2">
                        <Button
                          variant={result.hdplay ? "outline" : "default"}
                          className={!result.hdplay ? "bg-green-500 hover:bg-green-600" : ""}
                          disabled={downloadLoading}
                          onClick={() => downloadFile(result.play, generateFileName('video'))}
                        >
                          {downloadLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-4 w-4" />
                          )}
                          {t("home.results.downloadVideo")}
                        </Button>
                        
                        {result.music && (
                          <Button
                            variant="outline"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.music || '', generateFileName('music'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadMusic")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result && result.images && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md mx-auto mb-6">
                    <h3 className="font-medium text-lg mb-4 line-clamp-2">{result.title || "TikTok Video"}</h3>

                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={result.author.avatar || "/placeholder.svg"}
                        alt={result.author.nickname}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{result.author.nickname}</p>
                        <p className="text-sm text-muted-foreground">@{result.author.unique_id}</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {result.hdplay && (
                        <div className="grid gap-3 md:grid-cols-2">
                          <Button
                            className="bg-green-500 hover:bg-green-600"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.hdplay || '', generateFileName('hd'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadHD")}
                          </Button>
                          <Button
                            variant="outline"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.play, generateFileName('sd'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadSD")}
                          </Button>
                        </div>
                      )}
                      
                      <div className="grid gap-3 md:grid-cols-2">
                        <Button
                          variant={result.hdplay ? "outline" : "default"}
                          className={!result.hdplay ? "bg-green-500 hover:bg-green-600" : ""}
                          disabled={downloadLoading}
                          onClick={() => downloadFile(result.play, generateFileName('video'))}
                        >
                          {downloadLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-4 w-4" />
                          )}
                          {t("home.results.downloadVideo")}
                        </Button>
                        
                        {result.music && (
                          <Button
                            variant="outline"
                            disabled={downloadLoading}
                            onClick={() => downloadFile(result.music || '', generateFileName('music'))}
                          >
                            {downloadLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="mr-2 h-4 w-4" />
                            )}
                            {t("home.results.downloadMusic")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
                    {result.images.map((image, index) => (
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
                              onClick={() => downloadFile(
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
                            onClick={() => downloadFile(
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
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t("home.features.title")}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="zap"
              title={t("home.features.fast.title")}
              description={t("home.features.fast.description")}
            />
            <FeatureCard
              icon="shield"
              title={t("home.features.safe.title")}
              description={t("home.features.safe.description")}
            />
            <FeatureCard
              icon="check-circle"
              title={t("home.features.quality.title")}
              description={t("home.features.quality.description")}
            />
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t("home.howto.title")}</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-medium mb-2">{t("home.howto.step1.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.howto.step1.description")}</p>
              </div>

              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-medium mb-2">{t("home.howto.step2.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.howto.step2.description")}</p>
              </div>

              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-violet-100 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-medium mb-2">{t("home.howto.step3.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.howto.step3.description")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl p-6 md:p-8 border border-pink-500/20">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("home.upgrade.title")}</h2>
                <p className="text-muted-foreground mb-6">{t("home.upgrade.description")}</p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                >
                  <LocalizedLink href={session ? "/pricing" : "/login"}>
                    <Crown className="mr-2 h-4 w-4" /> {t("home.upgrade.button")}
                  </LocalizedLink>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t("home.upgrade.features.batch")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t("home.upgrade.features.noAds")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t("home.upgrade.features.priority")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t("home.upgrade.features.support")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t("home.upgrade.features.quality")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
