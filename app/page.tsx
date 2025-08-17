"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Download, Loader2, AlertCircle, Check, Crown } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@/components/logo"
import FeatureCard from "@/components/feature-card"
import Footer from "@/components/footer"
import PremiumBanner from "@/components/premium-banner"
import SchemaMarkup from "@/components/schema-markup"

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
  const [url, setUrl] = useState("")
  const [batchUrls, setBatchUrls] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TikTokData | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("single")

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <SchemaMarkup />
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                    Premium
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nâng cấp lên Savetik Premium</DialogTitle>
                    <DialogDescription>
                      Trải nghiệm tính năng cao cấp và không giới hạn với Savetik Premium
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Tải hàng loạt không giới hạn</p>
                        <p className="text-sm text-muted-foreground">
                          Tải nhiều video TikTok cùng lúc, tiết kiệm thời gian
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Không quảng cáo</p>
                        <p className="text-sm text-muted-foreground">Trải nghiệm mượt mà không bị gián đoạn</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Ưu tiên tốc độ</p>
                        <p className="text-sm text-muted-foreground">Tốc độ tải nhanh hơn với máy chủ riêng</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Hỗ trợ ưu tiên</p>
                        <p className="text-sm text-muted-foreground">Được hỗ trợ kỹ thuật nhanh chóng</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                      <Crown className="h-4 w-4 mr-2" /> Nâng cấp ngay - 99.000đ/tháng
                    </Button>
                    <Button variant="outline">Xem thêm gói khác</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/contact">Liên hệ</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              Tải Video & Ảnh TikTok
            </h1>
            <p className="text-lg text-muted-foreground">
              Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng
            </p>
          </div>

          <Card className="max-w-3xl mx-auto border-2 shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="single" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="single">Tải đơn lẻ</TabsTrigger>
                  <TabsTrigger value="batch" className="relative">
                    Tải hàng loạt
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
                        placeholder="Dán liên kết TikTok vào đây..."
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
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý
                          </>
                        ) : (
                          "Tải xuống"
                        )}
                      </Button>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="text-center text-sm text-muted-foreground">
                      Hỗ trợ tất cả video TikTok, bao gồm cả Slideshow và các video có nhạc
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="batch">
                  <PremiumBanner />
                  <form className="space-y-6 opacity-60 pointer-events-none">
                    <div className="flex flex-col gap-3">
                      <textarea
                        placeholder="Dán nhiều liên kết TikTok, mỗi liên kết một dòng..."
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
                        <Crown className="mr-2 h-4 w-4" /> Tải xuống hàng loạt
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-12 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Kết quả tìm kiếm</h2>

            <div className="bg-background rounded-lg border p-6 max-w-3xl mx-auto shadow-sm">
              {!result && !loading && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-2">Dán liên kết TikTok để xem kết quả</p>
                  <Download className="h-12 w-12 text-muted-foreground/50" />
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Đang xử lý video TikTok của bạn...</p>
                </div>
              )}

              {result && (
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

                    {result.images ? (
                      // For image slideshow
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Chọn ảnh để tải xuống</h4>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={selectAllImages}>
                              Chọn tất cả
                            </Button>
                            <Button variant="outline" size="sm" onClick={deselectAllImages}>
                              Bỏ chọn
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 max-h-[400px] overflow-y-auto p-1">
                          {result.images.map((image, index) => (
                            <div
                              key={index}
                              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImages.includes(image) ? "border-primary" : "border-transparent"
                              }`}
                              onClick={() => toggleImageSelection(image)}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover cursor-pointer"
                              />
                              <div className="absolute top-2 right-2">
                                <Checkbox
                                  checked={selectedImages.includes(image)}
                                  onCheckedChange={() => toggleImageSelection(image)}
                                  className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                                Ảnh {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid gap-3">
                          <Button
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={selectedImages.length === 0}
                            onClick={() => {
                              // Download each selected image
                              selectedImages.forEach((imageUrl, index) => {
                                setTimeout(() => {
                                  const link = document.createElement('a');
                                  link.href = imageUrl;
                                  link.download = `tiktok-image-${index + 1}.jpg`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }, index * 300); // Add a slight delay between downloads
                              });
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" /> Tải {selectedImages.length} ảnh đã chọn
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // For video
                      <div className="aspect-[9/16] bg-black rounded-lg mb-6 overflow-hidden">
                        <video
                          src={result.play}
                          poster={result.origin_cover}
                          controls
                          className="w-full h-full"
                          preload="metadata"
                        />
                      </div>
                    )}

                    {!result.images && (
                      <div className="grid gap-3 md:grid-cols-2">
                        {result.hdplay && (
                          <Button
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = result.hdplay || '';
                              link.download = `tiktok-hd-${result.id || 'video'}.mp4`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" /> Tải HD
                          </Button>
                        )}
                        <Button
                          variant={result.hdplay ? "outline" : "default"}
                          className={!result.hdplay ? "bg-green-500 hover:bg-green-600" : ""}
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = result.play;
                            link.download = `tiktok-${result.hdplay ? 'sd' : 'video'}-${result.id || 'video'}.mp4`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" /> Tải {result.hdplay ? "SD" : "Video"}
                        </Button>
                        {result.music && (
                          <Button
                            variant="outline"
                            className="md:col-span-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = result.music || '';
                              link.download = `tiktok-music-${result.id || 'audio'}.mp3`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" /> Tải nhạc
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Tại sao chọn Savetik?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="zap"
              title="Nhanh chóng"
              description="Tải video TikTok trong vài giây, không cần đăng ký"
            />
            <FeatureCard icon="shield" title="An toàn" description="Không lưu trữ dữ liệu cá nhân, bảo mật 100%" />
            <FeatureCard
              icon="check-circle"
              title="Chất lượng cao"
              description="Tải video không có watermark với chất lượng HD"
            />
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Hướng dẫn sử dụng</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-medium mb-2">Sao chép liên kết</h3>
                <p className="text-sm text-muted-foreground">Mở ứng dụng TikTok và sao chép liên kết video</p>
              </div>

              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-medium mb-2">Dán vào Savetik</h3>
                <p className="text-sm text-muted-foreground">Dán liên kết vào ô tìm kiếm và nhấn Tải xuống</p>
              </div>

              <div className="bg-background rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-violet-100 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-medium mb-2">Tải xuống</h3>
                <p className="text-sm text-muted-foreground">Chọn chất lượng và tải video xuống thiết bị của bạn</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl p-6 md:p-8 border border-pink-500/20">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Nâng cấp lên Premium</h2>
                <p className="text-muted-foreground mb-6">
                  Trải nghiệm đầy đủ tính năng với Savetik Premium. Tải hàng loạt, không quảng cáo và nhiều tính năng
                  độc quyền khác.
                </p>
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                  <Crown className="mr-2 h-4 w-4" /> Nâng cấp ngay
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Tải hàng loạt không giới hạn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Không quảng cáo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Ưu tiên tốc độ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Hỗ trợ ưu tiên 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Tải xuống với chất lượng cao nhất</span>
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
