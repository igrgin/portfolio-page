import type { ComponentProps } from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib'

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn('bg-slate-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full', className)}
      {...props}
    />
  )
}
