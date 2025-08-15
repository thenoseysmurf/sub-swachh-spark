import { cn } from "@/lib/utils";
interface WidgetCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "savings";
  onClick?: () => void;
}
export function WidgetCard({
  children,
  className,
  variant = "default",
  onClick
}: WidgetCardProps) {
  return;
}