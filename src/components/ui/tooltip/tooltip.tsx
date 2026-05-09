// Tremor Tooltip [v0.0.2]

import * as TooltipPrimitives from '@radix-ui/react-tooltip'
import Markdown from 'markdown-to-jsx'
import React from 'react'

import { cn } from '@/lib/utils'

import TooltipArrow from './tooltip-arrow'
import TooltipArrowPrimitive from './tooltip-arrow-primitive'

interface TooltipProps
  extends Omit<TooltipPrimitives.TooltipContentProps, 'content' | 'onClick'>,
    Pick<
      TooltipPrimitives.TooltipProps,
      'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration'
    > {
  content: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  side?: 'bottom' | 'left' | 'top' | 'right'
  showArrow?: boolean
  triggerAsChild?: boolean
  isMarkdownContent?: boolean
  withUnderline?: boolean
}

type TooltipContentProps = Omit<
  TooltipProps,
  | 'content'
  | 'delayDuration'
  | 'defaultOpen'
  | 'open'
  | 'onClick'
  | 'onOpenChange'
  | 'triggerAsChild'
>

type TooltipProviderProps = Pick<
  TooltipProps,
  'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration' | 'children'
>

const TooltipProvider = ({
  children,
  delayDuration = 150,
  ...restProps
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitives.Provider delayDuration={delayDuration}>
      <TooltipPrimitives.Root
        tremor-id='tremor-raw'
        delayDuration={delayDuration}
        {...restProps}
      >
        {children}
      </TooltipPrimitives.Root>
    </TooltipPrimitives.Provider>
  )
}
const TooltipTrigger = TooltipPrimitives.Trigger

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitives.Content>,
  TooltipContentProps
>((props, forwardedRef) => {
  const {
    children,
    showArrow = true,
    sideOffset = 12,
    className,
    ...restProps
  } = props

  return (
    <TooltipPrimitives.Portal>
      <TooltipPrimitives.Content
        ref={forwardedRef}
        align='center'
        className={cn(
          // base
          'max-w-96 select-none rounded-lg px-4 py-2 text-[0.9rem] leading-relaxed tracking-wide shadow-md',
          // text color
          'text-zinc-400',
          // background color
          'bg-[var(--tooltip-color)]',
          // transition
          'will-change-[transform,opacity]',
          'data-[side=bottom]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=right]:animate-slideRightAndFade data-[side=top]:animate-slideUpAndFade data-[state=closed]:animate-hide',
          // other
          'z-50 border border-[var(--tooltip-border-color)]',
          'tooltip-content',
          className
        )}
        sideOffset={sideOffset}
        {...restProps}
      >
        {children}
        {showArrow && (
          <>
            <TooltipArrowPrimitive />
            <TooltipArrow aria-hidden='true' />
          </>
        )}
      </TooltipPrimitives.Content>
    </TooltipPrimitives.Portal>
  )
})

/**
 * simply use this component if the tooltip content is simple
 * and doesn't need any additional configuration
 */
const Tooltip = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitives.Content>,
  TooltipProps
>(
  (
    {
      children,
      content,
      delayDuration,
      defaultOpen,
      open,
      onClick,
      onOpenChange,
      triggerAsChild = false,
      isMarkdownContent = false,
      withUnderline,
      ...props
    }: TooltipProps,
    forwardedRef
  ) => {
    return (
      <TooltipProvider
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipTrigger onClick={onClick} asChild={triggerAsChild}>
          {withUnderline ? (
            <span className='underline decoration-zinc-600 decoration-dashed underline-offset-2'>
              {children}
            </span>
          ) : (
            children
          )}
        </TooltipTrigger>
        <TooltipContent ref={forwardedRef} {...props}>
          {isMarkdownContent ? (
            <Markdown
              options={{
                overrides: {
                  a: {
                    props: {
                      className: 'text-emerald-400 hover:underline',
                      target: '_blank'
                    }
                  }
                }
              }}
            >
              {content as string}
            </Markdown>
          ) : (
            content
          )}
        </TooltipContent>
      </TooltipProvider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export {
  Tooltip,
  TooltipContent,
  type TooltipProps,
  TooltipProvider,
  TooltipTrigger
}
