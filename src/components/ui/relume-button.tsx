
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const relumeButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-relume-md text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accentBleu text-white hover:bg-accentBleu/90 shadow-relume-soft hover:shadow-relume-medium",
        destructive: "bg-accentRouge text-white hover:bg-accentRouge/90 shadow-relume-soft hover:shadow-relume-medium",
        outline: "border-2 border-accentBleu bg-transparent text-accentBleu hover:bg-accentBleu/10",
        secondary: "bg-formBackground text-textPrincipal border border-formBorder hover:bg-formBorder/20",
        ghost: "bg-transparent text-textPrincipal hover:bg-formBackground",
        link: "text-accentBleu underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
        xl: "h-14 px-8 py-4 text-lg",
        icon: "h-11 w-11 p-2",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-relume-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      fullWidth: false,
    },
  }
);

export interface RelumeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof relumeButtonVariants> {
  asChild?: boolean;
}

const RelumeButton = React.forwardRef<HTMLButtonElement, RelumeButtonProps>(
  ({ className, variant, size, fullWidth, rounded, children, ...props }, ref) => {
    return (
      <button
        className={cn(relumeButtonVariants({ variant, size, fullWidth, rounded, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RelumeButton.displayName = "RelumeButton";

export { RelumeButton, relumeButtonVariants };
