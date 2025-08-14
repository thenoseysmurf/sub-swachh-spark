import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-button active:scale-[0.98]",
        primary: "bg-gradient-primary text-white hover:shadow-lg active:scale-[0.98] font-semibold",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "bg-gradient-savings text-success-foreground hover:shadow-lg active:scale-[0.98] font-semibold",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        soft: "bg-primary-light/10 text-primary hover:bg-primary-light/20 border border-primary-light/20"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base font-semibold",
        xl: "h-16 px-10 py-5 text-lg font-semibold",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);