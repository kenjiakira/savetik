"use client"

import { useEffect, useState } from "react"

interface JsonLdProps {
  data: Record<string, any>
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  )
}

export const WebsiteSchema = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Savetik",
    "url": "https://savetik.vn/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://savetik.vn/?url={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "description": "Tải video TikTok không có watermark và ảnh chất lượng cao miễn phí, nhanh chóng và dễ dàng",
    "publisher": {
      "@type": "Organization",
      "name": "Savetik",
      "logo": {
        "@type": "ImageObject",
        "url": "https://savetik.vn/logo.png",
        "width": 180,
        "height": 180
      }
    }
  }

  return <JsonLd data={data} />
}

export const SoftwareApplicationSchema = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Savetik",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1024"
    }
  }

  return <JsonLd data={data} />
}

export const OrganizationSchema = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Savetik",
    "url": "https://savetik.vn",
    "logo": "https://savetik.vn/logo.png",
    "sameAs": [
      "https://facebook.com/savetik",
      "https://twitter.com/savetik_vn",
      "https://instagram.com/savetik_vn"
    ]
  }

  return <JsonLd data={data} />
}

export const FAQSchema = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Savetik có tính phí không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Savetik cung cấp dịch vụ cơ bản miễn phí. Chúng tôi cũng có gói Premium với các tính năng nâng cao như tải hàng loạt và không quảng cáo."
        }
      },
      {
        "@type": "Question",
        "name": "Làm thế nào để tải video TikTok không có watermark?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chỉ cần sao chép liên kết video TikTok, dán vào hộp tìm kiếm trên Savetik và nhấn nút Tải xuống. Hệ thống sẽ xử lý và cung cấp cho bạn video không có watermark để tải xuống."
        }
      },
      {
        "@type": "Question",
        "name": "Savetik có an toàn không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Có, Savetik hoàn toàn an toàn để sử dụng. Chúng tôi không lưu trữ dữ liệu cá nhân người dùng và hệ thống được bảo mật 100%."
        }
      },
      {
        "@type": "Question", 
        "name": "Tôi có thể tải ảnh từ TikTok không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Có, Savetik hỗ trợ tải slideshow ảnh từ TikTok với chất lượng cao. Bạn có thể chọn tất cả hoặc chỉ một số ảnh trong slideshow để tải xuống."
        }
      },
      {
        "@type": "Question",
        "name": "Savetik hỗ trợ những định dạng video nào?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Savetik hỗ trợ tải xuống video TikTok ở nhiều định dạng khác nhau, bao gồm cả SD và HD. Đối với người dùng Premium, chúng tôi còn cung cấp tải xuống ở chất lượng cao nhất có thể."
        }
      }
    ]
  }

  return <JsonLd data={data} />
}

export default function SchemaMarkup() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <WebsiteSchema />
      <SoftwareApplicationSchema />
      <OrganizationSchema />
      <FAQSchema />
    </>
  )
}