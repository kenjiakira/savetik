"use client"

import { useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

  return (
    <Card className="max-w-3xl mx-auto border-2 shadow-lg">
      <CardContent className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              type="text"
              placeholder={t("home.form.placeholder")}
              className="flex-1 h-12 text-base"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
              disabled={loading || !url.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("home.form.processing")}
                </>
              ) : (
                t("home.form.button")
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-muted-foreground">
            {t("home.form.support")}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
