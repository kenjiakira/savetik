"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check, ChevronLeft, Crown } from "lucide-react"
import Logo from "@/components/logo"
import Footer from "@/components/footer"

export default function PricingPage() {
  const t = useI18n()
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.home")}
              </Link>
            </Button>
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("pricing.title")}</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("pricing.description")}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
                  {t("pricing.monthly")}
                </span>
                <Switch checked={billingCycle === "yearly"} onCheckedChange={toggleBillingCycle} />
                <span className={`text-sm ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                  {t("pricing.yearly")}
                </span>
                {billingCycle === "yearly" && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                    {t("pricing.savePercent", { percent: 16 })}
                  </span>
                )}
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-8">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-col space-y-1.5">
                  <CardTitle>{t("pricing.free.title")}</CardTitle>
                  <CardDescription>{t("pricing.free.description")}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t("pricing.free.price")}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 flex-1">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.free.features.downloads")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.free.features.quality")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.free.features.ads")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.free.features.support")}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled={session?.user.subscription === "free"}>
                    {session?.user.subscription === "free" ? t("pricing.free.button") : t("pricing.free.buttonAlt")}
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col border-2 border-primary/50 shadow-lg">
                <CardHeader className="flex flex-col space-y-1.5 bg-primary/5 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                      {t("pricing.premium.title")}
                    </CardTitle>
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                  <CardDescription>{t("pricing.premium.description")}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {billingCycle === "monthly" ? t("pricing.premium.price") : t("pricing.premium.yearlyPrice")}
                    </span>
                    <span className="text-muted-foreground">{billingCycle === "monthly" ? "/month" : "/year"}</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 flex-1">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.downloads")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.quality")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.ads")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.support")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.history")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t("pricing.premium.features.priority")}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                    disabled={session?.user.subscription === "premium"}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    {session?.user.subscription === "premium"
                      ? t("pricing.premium.button")
                      : t("pricing.premium.buttonAlt")}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto grid gap-6">
                <div className="text-left">
                  <h3 className="font-medium mb-2">How does the billing work?</h3>
                  <p className="text-muted-foreground">
                    You can choose between monthly or yearly billing. Yearly billing gives you a 16% discount. You can
                    cancel your subscription at any time.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade to Premium at any time. If you want to downgrade, your Premium benefits will
                    continue until the end of your billing period.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="font-medium mb-2">Is there a free trial for Premium?</h3>
                  <p className="text-muted-foreground">
                    We don't currently offer a free trial, but we have a 7-day money-back guarantee if you're not
                    satisfied with the Premium features.
                  </p>
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
