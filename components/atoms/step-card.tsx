interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  colorClass: string
}

export function StepCard({ stepNumber, title, description, colorClass }: StepCardProps) {
  return (
    <div className="bg-background rounded-lg p-6 text-center shadow-sm">
      <div className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
        {stepNumber}
      </div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
