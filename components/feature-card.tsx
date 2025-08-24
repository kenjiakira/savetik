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
    <Card className="group relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 hover:-translate-y-1">
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-8">
        <div className="flex flex-col items-center text-center">
          {/* Icon Container */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                {getIcon()}
              </div>
            </div>
            {/* Icon Glow */}
            <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
