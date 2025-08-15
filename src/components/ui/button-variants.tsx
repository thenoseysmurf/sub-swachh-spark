import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5",
        primary: "bg-gradient-primary text-white hover:shadow-xl glow-primary font-semibold",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-dark/20 shadow-sm hover:shadow-md",
        success: "bg-gradient-savings text-success-foreground hover:shadow-xl glow-success font-semibold",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-border-accent",
        "outline-primary": "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        "ghost-primary": "text-primary hover:bg-primary/10 hover:text-primary-dark",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
        soft: "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
        glass: "glass-surface text-foreground hover:bg-accent/50 backdrop-blur-md",
        premium: "bg-gradient-hero text-white shadow-glow hover:shadow-2xl animate-gradient font-bold",
        floating: "bg-card shadow-xl hover:shadow-2xl border border-border hover:-translate-y-1"
      },
      size: {
        xs: "h-8 px-3 py-1 text-xs",
        sm: "h-9 px-4 py-2 text-sm",
        default: "h-11 px-6 py-2.5 text-sm",
        lg: "h-12 px-8 py-3 text-base font-semibold",
        xl: "h-14 px-10 py-4 text-lg font-semibold",
        "2xl": "h-16 px-12 py-5 text-xl font-bold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);