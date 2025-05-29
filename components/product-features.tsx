import { Badge } from "@/components/ui/badge"
import { Star, Award, Zap, Shield } from "lucide-react"

interface ProductFeaturesProps {
  productName: string
  control: string
}

export function ProductFeatures({ productName, control }: ProductFeaturesProps) {
  const name = productName.toLowerCase()
  const features = []

  // Add features based on product type
  if (name.includes("latex")) {
    features.push({ icon: <Zap className="w-3 h-3" />, text: "Latex Material", color: "bg-yellow-100 text-yellow-800" })
  }

  if (name.includes("zipper")) {
    features.push({ icon: <Award className="w-3 h-3" />, text: "Zipper Closure", color: "bg-blue-100 text-blue-800" })
  }

  if (name.includes("hook") || name.includes("eye")) {
    features.push({ icon: <Award className="w-3 h-3" />, text: "Hook & Eye", color: "bg-green-100 text-green-800" })
  }

  if (name.includes("post-surgery") || name.includes("surgery")) {
    features.push({
      icon: <Shield className="w-3 h-3" />,
      text: "Post-Surgery",
      color: "bg-purple-100 text-purple-800",
    })
  }

  if (name.includes("sport") || name.includes("performance")) {
    features.push({ icon: <Star className="w-3 h-3" />, text: "Sport Design", color: "bg-orange-100 text-orange-800" })
  }

  if (control === "Extra-Firm") {
    features.push({ icon: <Shield className="w-3 h-3" />, text: "Extra-Firm", color: "bg-red-100 text-red-800" })
  }

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {features.slice(0, 2).map((feature, index) => (
        <Badge
          key={index}
          variant="outline"
          className={`text-xs ${feature.color} border-current/20 flex items-center gap-1`}
        >
          {feature.icon}
          {feature.text}
        </Badge>
      ))}
    </div>
  )
}
