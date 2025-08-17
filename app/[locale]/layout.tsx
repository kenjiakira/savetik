import * as React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientProviders from "@/components/client-providers"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale === 'en' ? 'en' : 'vi'
  
  const baseTitle = locale === 'en' 
    ? "Savetik - Download TikTok Videos & Images Without Watermark" 
    : "Savetik - Tải Video & Ảnh TikTok Không Watermark"
  
  const baseDescription = locale === 'en'
    ? "Download TikTok videos without watermark and high-quality images for free, quickly and easily. Vietnam's leading TikTok video downloader."
    : "Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng. Công cụ tải video TikTok hàng đầu Việt Nam."

  const keywords = locale === 'en' 
    ? ["download tiktok", "tiktok video download", "no watermark", "tiktok image download", "download tiktok", "batch tiktok download"]
    : ["tải tiktok", "tải video tiktok", "không watermark", "tải ảnh tiktok", "download tiktok", "tải tiktok hàng loạt"]

  const ogLocale = locale === 'en' ? 'en_US' : 'vi_VN'
  const altLocale = locale === 'en' ? 'vi_VN' : 'en_US'

  return {
    title: {
      default: baseTitle,
      template: `%s | Savetik`
    },
    description: baseDescription,
    keywords: keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'vi': '/vi',
        'en': '/en',
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: altLocale,
      url: `https://savetik.vn/${locale}`,
      title: baseTitle,
      description: baseDescription,
      siteName: "Savetik",
      images: [{
        url: `https://savetik.vn/og-image-${locale}.png`,
        width: 1200,
        height: 630,
        alt: baseTitle
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: baseDescription,
      images: [`https://savetik.vn/og-image-${locale}.png`],
      creator: "@savetik_vn",
    },
  }
}

// Main layout is a server component
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Properly await the params to ensure locale is available
  const locale = await Promise.resolve(params.locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders locale={locale}>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
