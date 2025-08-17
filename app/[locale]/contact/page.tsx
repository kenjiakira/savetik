"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Mail, Phone, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Footer from "@/components/footer"

export default function ContactPage() {
  const t = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">{t("contact.title")}</h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">{t("contact.info.title")}</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("contact.info.phone")}</p>
                      <p className="text-muted-foreground">0354683398</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("contact.info.email")}</p>
                      <p className="text-muted-foreground">contact@savetik.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("contact.info.address")}</p>
                      <p className="text-muted-foreground">Hà Nội, Việt Nam</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{t("contact.about.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("contact.about.description")}
                </p>
                <p className="text-muted-foreground">
                  {t("contact.about.manager")}: <span className="font-medium">Hoàng Ngọc Từ</span>
                </p>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{t("contact.form.title")}</h2>

              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("contact.form.name")}
                  </label>
                  <Input id="name" placeholder={t("contact.form.namePlaceholder")} />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("contact.form.email")}
                  </label>
                  <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("contact.form.subject")}
                  </label>
                  <Input id="subject" placeholder={t("contact.form.subjectPlaceholder")} />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contact.form.message")}
                  </label>
                  <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} rows={5} />
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                  <Send className="h-4 w-4 mr-2" /> {t("contact.form.send")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}