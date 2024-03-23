'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
type VariantButtonProps =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'primary';
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: VariantButtonProps;
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = 'primary',
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
