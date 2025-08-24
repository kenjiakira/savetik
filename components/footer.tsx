"use client"

import { Heart, Moon, Sun, Mail, Phone, Facebook, Twitter, Instagram, Download, Shield, Zap, Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { useSafeTheme } from "@/components/theme-provider"
import { LocalizedLink } from "@/lib/localized-links"
import { Badge } from "@/components/ui/badge"

export default function Footer() {
  const t = useI18n()
  const { theme, resolvedTheme, setTheme, mounted } = useSafeTheme()

  // Xác định theme hiện tại (ưu tiên resolvedTheme vì nó đã tính đến theme "system")
  const currentTheme = resolvedTheme || theme
  
  // Chuyển đổi theme một cách an toàn
  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  // Không render nút chuyển theme khi chưa mount để tránh hydration mismatch
  if (!mounted) return null;

  return (
    <footer className="relative bg-gradient-to-b from-background via-background to-muted/30 border-t">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4))]" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <img 
                    src="https://imgur.com/t15Z648.png" 
                    alt="Savetik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground">Savetik</h3>
                  <Badge variant="secondary" className="text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    TikTok Downloader
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("footer.about.description")}
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10"
                  asChild
                >
                  <a href="https://facebook.com/savetik" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10"
                  asChild
                >
                  <a href="https://twitter.com/savetik_vn" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10"
                  asChild
                >
                  <a href="https://instagram.com/savetik_vn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t("footer.links.title")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <LocalizedLink 
                    href="/" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.links.home")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink 
                    href="/blog" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.links.blog")}
                  </LocalizedLink>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {t("footer.legal.title")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <LocalizedLink 
                    href="/terms" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.legal.terms")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink 
                    href="/privacy" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.legal.privacy")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink 
                    href="/dmca" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.legal.dmca")}
                  </LocalizedLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("footer.contact.title")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <LocalizedLink 
                    href="/contact" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    {t("footer.contact.contactUs")}
                  </LocalizedLink>
                </li>
                <li>
                  <a 
                    href="mailto:contact@savetik.com" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-foreground transition-colors" />
                    contact@savetik.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t bg-muted/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Copyright */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t("footer.copyright")}</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span>by Savetik Team</span>
              </div>

              {/* Theme Toggle & Quick Links */}
              <div className="flex items-center gap-6">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10"
                  onClick={toggleTheme}
                  title={currentTheme === 'dark' ? t("common.lightMode") || "Light mode" : t("common.darkMode") || "Dark mode"}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">
                    {currentTheme === 'dark' ? t("common.lightMode") || "Light mode" : t("common.darkMode") || "Dark mode"}
                  </span>
                </Button>
                
                {/* Quick Links */}
                <nav className="flex items-center gap-4 text-sm">
                  <LocalizedLink 
                    href="/terms" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t("footer.legal.terms")}
                  </LocalizedLink>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <LocalizedLink 
                    href="/privacy" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t("footer.legal.privacy")}
                  </LocalizedLink>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <LocalizedLink 
                    href="/contact" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t("footer.contact.contactUs")}
                  </LocalizedLink>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
