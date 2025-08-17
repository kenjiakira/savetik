import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Savetik - Trang chủ">
      <div className="relative w-10 h-10">
        <Image 
          src="https://imgur.com/t15Z648.png" 
          alt="Savetik Logo - Tải video TikTok không watermark" 
          fill
          sizes="(max-width: 768px) 30px, 40px"
          className="object-contain"
          priority
        />
      </div>
      <span className="font-bold text-xl">Savetik</span>
    </Link>
  )
}
