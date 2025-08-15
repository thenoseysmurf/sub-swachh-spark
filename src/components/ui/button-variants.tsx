import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 glow-primary",
        primary: "bg-gradient-primary text-white hover:shadow-xl glow-primary font-semibold hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-dark/30 shadow-sm hover:shadow-md border border-border-accent/20",
        success: "bg-gradient-savings text-success-foreground hover:shadow-xl glow-success font-semibold hover:scale-105",
        warning: "bg-gradient-warning text-warning-foreground hover:bg-warning/90 shadow-md hover:shadow-lg glow-premium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg hover:scale-105",
        outline: "border-2 border-border-accent/40 bg-background/50 backdrop-blur-sm hover:bg-accent/20 hover:text-accent-foreground hover:border-border-accent",
        "outline-primary": "border-2 border-primary/60 text-primary bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground glow-primary",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm",
        "ghost-primary": "text-primary hover:bg-primary/15 hover:text-primary-dark backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto gradient-text",
        soft: "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30 backdrop-blur-sm",
        glass: "glass-surface text-foreground hover:bg-accent/30 backdrop-blur-md glow-primary",
        premium: "bg-gradient-hero text-white shadow-glow hover:shadow-premium animate-gradient font-bold hover:scale-105 glow-premium",
        floating: "bg-card/80 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-border-accent/20 hover:-translate-y-1 glow-primary"
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