"use client"

import { useState } from "react"
import { Loader2, AlertCircle, Clipboard, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useI18n } from "@/lib/i18n-client"

interface SearchFormProps {
  onSubmit: (url: string) => Promise<void>
  loading: boolean
  error: string | null
}

export function SearchForm({ onSubmit, loading, error }: SearchFormProps) {
  const t = useI18n()
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    await onSubmit(url.trim())
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  return (
    <div className="w-full">
      <form className="space-y-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
        {/* Main Search Container */}
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Input Container */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Textarea
                  placeholder={t("home.form.placeholder")}
                  className="w-full min-h-[56px] max-h-[120px] resize-none border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 rounded-2xl px-6 py-4 pr-20 text-base bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 break-words"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                  disabled={loading}
                  rows={1}
                />
                
                {/* Paste Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handlePaste}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 z-10"
                >
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold text-white"
              disabled={loading || !url.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>{t("home.form.processing")}</span>
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  <span>{t("home.form.button")}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="animate-bounce-in">
            <Alert variant="destructive" className="border-red-200 bg-red-50/50 dark:bg-red-900/20 dark:border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Support Text */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {t("home.form.support")}
          </p>
        </div>
      </form>
    </div>
  )
}
