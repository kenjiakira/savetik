interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  colorClass: string
}

export function StepCard({ stepNumber, title, description, colorClass }: StepCardProps) {
  return (
    <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20 dark:border-slate-700/20">
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-orange-500/5 to-yellow-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Step Number */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 font-bold text-lg`}>
            {stepNumber}
          </div>
          {/* Number Glow */}
          <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  )
}
