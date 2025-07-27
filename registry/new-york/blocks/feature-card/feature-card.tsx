import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  buttonText?: string
  onButtonClick?: () => void
  variant?: "default" | "highlighted"
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  buttonText = "Learn More",
  onButtonClick,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        variant === "highlighted" &&
          "border-primary/20 bg-primary/5 hover:border-primary/30",
        className
      )}
    >
      {variant === "highlighted" && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                variant === "highlighted"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <CardTitle className="text-xxl">{title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {(buttonText || onButtonClick) && (
        <CardContent className="pt-0">
          <Button
            variant={variant === "highlighted" ? "default" : "outline"}
            size="sm"
            onClick={onButtonClick}
            className="w-full"
          >
            {buttonText}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
