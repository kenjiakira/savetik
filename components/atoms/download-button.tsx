"use client"

import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonProps } from "@/components/ui/button"

interface DownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  isLoading: boolean
  label: string
  onDownload: () => void
}

export function DownloadButton({ 
  isLoading, 
  label, 
  onDownload, 
  className,
  variant = "default",
  disabled,
  ...props 
}: DownloadButtonProps) {
  return (
    <Button
      variant={variant}
      className={className}
      disabled={disabled || isLoading}
      onClick={onDownload}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {label}
    </Button>
  )
}
