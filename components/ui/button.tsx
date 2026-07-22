import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        green: 'bg-cube-green text-white hover:bg-cube-green-dark active:bg-cube-green-dark',
        blue: 'bg-cube-blue text-white hover:bg-cube-blue/90 active:bg-cube-blue/80',
        navy: 'bg-cube-navy text-white hover:bg-cube-navy/90 active:bg-cube-navy/80',
        outlineBlue: 'border border-cube-blue bg-transparent text-cube-blue hover:bg-cube-blue hover:text-white',
        outlineGreen: 'border border-cube-green bg-transparent text-cube-green hover:bg-cube-green hover:text-white',
        whiteOnDark: 'bg-white text-cube-navy hover:bg-white/90 active:bg-white/80',
        text: 'bg-transparent text-cube-blue underline-offset-4 hover:underline',
        destructive: 'bg-cube-red text-white hover:bg-cube-red/90 active:bg-cube-red/80',
        outline: 'border border-input bg-background hover:bg-cube-soft hover:text-cube-navy',
        secondary: 'bg-cube-soft text-cube-navy hover:bg-cube-soft/80',
        ghost: 'hover:bg-cube-soft hover:text-cube-navy',
        link: 'text-cube-blue underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm min-h-[2.25rem]',
        md: 'h-11 px-5 text-sm min-h-[2.75rem]',
        lg: 'h-12 px-7 text-base min-h-[3rem]',
        default: 'h-11 px-5 text-sm min-h-[2.75rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'green', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
          {children}
        </Comp>
      );
    }
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
