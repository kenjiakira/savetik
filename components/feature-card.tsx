import { CheckCircle, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = (): JSX.Element => {
    switch (icon) {
      case "check-circle":
        return <CheckCircle className="h-6 w-6" />
      case "zap":
        return <Zap className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      default:
        return <CheckCircle className="h-6 w-6" />
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">{getIcon()}</div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
