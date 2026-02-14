import { Button } from "@/registry/aui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/aui/ui/card"
import type { LucideIcon } from "lucide-react"

export interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  actionLabel = "Learn more",
  onAction,
}: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter>
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
