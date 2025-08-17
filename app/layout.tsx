import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import ClientProviders from "@/components/client-providers"
import { defaultLocale } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" }
  ],
}

export const metadata: Metadata = {
  title: {
    default: "Savetik - Tải Video & Ảnh TikTok Không Watermark",
    template: "%s | Savetik"
  },
  description: "Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng. Công cụ tải video TikTok hàng đầu Việt Nam.",
  generator: "Next.js",
  applicationName: "Savetik",
  keywords: ["tải tiktok", "tải video tiktok", "không watermark", "tải ảnh tiktok", "download tiktok", "tải tiktok hàng loạt"],
  authors: [{ name: "Savetik Team" }],
  creator: "Savetik Team",
  publisher: "Savetik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://savetik.vn"),
  alternates: {
    canonical: "/",
    languages: {
      'vi': '/vi',
      'en': '/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    url: "https://savetik.vn/",
    title: "Savetik - Tải Video & Ảnh TikTok Không Watermark",
    description: "Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng. Công cụ tải video TikTok hàng đầu Việt Nam.",
    siteName: "Savetik",
    images: [{
      url: "https://savetik.vn/og-image.png",
      width: 1200,
      height: 630,
      alt: "Savetik - Tải Video & Ảnh TikTok Không Watermark"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savetik - Tải Video & Ảnh TikTok Không Watermark",
    description: "Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng. Công cụ tải video TikTok hàng đầu Việt Nam.",
    images: ["https://savetik.vn/og-image.png"],
    creator: "@savetik_vn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders locale={defaultLocale}>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
