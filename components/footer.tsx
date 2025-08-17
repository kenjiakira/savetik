"use client"

import { Heart, Moon, Sun } from "lucide-react"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { useSafeTheme } from "@/components/theme-provider"
import { LocalizedLink } from "@/lib/localized-links"

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
    <footer className="border-t py-6 md:py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-medium text-lg mb-3">{t("footer.about.title")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("footer.about.description")}</p>
          </div>

          <div>
            <h3 className="font-medium mb-3">{t("footer.links.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LocalizedLink href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.links.home")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.links.premium")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.links.blog")}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">{t("footer.legal.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LocalizedLink href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.legal.terms")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.legal.privacy")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/dmca" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.legal.dmca")}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">{t("footer.contact.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">{t("footer.contact.name")}</li>
              <li>
                <LocalizedLink href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.contact.contactUs")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="mailto:contact@savetik.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.contact.email")}
                </LocalizedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t("footer.copyright")}</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={toggleTheme}
              title={currentTheme === 'dark' ? t("common.lightMode") || "Light mode" : t("common.darkMode") || "Dark mode"}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">
                {currentTheme === 'dark' ? t("common.lightMode") || "Light mode" : t("common.darkMode") || "Dark mode"}
              </span>
            </Button>
            
            <nav className="flex gap-4 text-sm">
              <LocalizedLink href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.legal.terms")}
              </LocalizedLink>
              <LocalizedLink href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.legal.privacy")}
              </LocalizedLink>
              <LocalizedLink href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("footer.contact.contactUs")}
              </LocalizedLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
