
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const relumeCardVariants = cva(
  "rounded-relume-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-100 shadow-relume-soft hover:shadow-relume-medium",
        elevated: "bg-white border border-gray-100 shadow-relume-medium hover:shadow-relume-strong",
        flat: "bg-formBackground border border-formBorder",
        dark: "bg-dark-light border border-dark-medium text-dark-foreground",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hover: {
        true: "hover:-translate-y-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: false,
    },
  }
);

export interface RelumeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof relumeCardVariants> {}

const RelumeCard = React.forwardRef<HTMLDivElement, RelumeCardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        className={cn(relumeCardVariants({ variant, padding, hover, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

RelumeCard.displayName = "RelumeCard";

const RelumeCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));

RelumeCardHeader.displayName = "RelumeCardHeader";

const RelumeCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-textPrincipal",
      className
    )}
    {...props}
  />
));

RelumeCardTitle.displayName = "RelumeCardTitle";

const RelumeCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-textPrincipal/70", className)}
    {...props}
  />
));

RelumeCardDescription.displayName = "RelumeCardDescription";

const RelumeCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));

RelumeCardContent.displayName = "RelumeCardContent";

const RelumeCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
));

RelumeCardFooter.displayName = "RelumeCardFooter";

export {
  RelumeCard,
  RelumeCardHeader,
  RelumeCardFooter,
  RelumeCardTitle,
  RelumeCardDescription,
  RelumeCardContent,
};
