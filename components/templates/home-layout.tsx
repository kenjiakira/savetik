"use client"

import { AppHeader } from "@/components/header"
import { HeroSection } from "@/components/organisms/hero-section"
import { ResultsSection } from "@/components/organisms/results-section"
import { FeaturesSection } from "@/components/organisms/features-section"
import { HowToSection } from "@/components/organisms/how-to-section"
import Footer from "@/components/footer"
import { useTikTokDownloader } from "@/hooks/use-tiktok-downloader"

export function HomeLayout() {
  const {
    loading,
    error,
    result,
    downloadLoading,
    isMobile,
    handleSubmit,
    downloadFile,
    generateFileName
  } = useTikTokDownloader()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <AppHeader />

      <main className="flex-1">
        <HeroSection onSubmit={handleSubmit} loading={loading} error={error} />
        <section className="container mx-auto px-4 py-8 md:py-12">
          <ResultsSection
            result={result}
            loading={loading}
            isMobile={isMobile}
            downloadLoading={downloadLoading}
            onDownload={downloadFile}
            generateFileName={generateFileName}
          />
        </section>

        <FeaturesSection />
        <HowToSection />
      </main>

      <Footer />
    </div>
  )
}
