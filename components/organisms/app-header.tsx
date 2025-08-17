"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
