import React, { useRef, type PropsWithChildren } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  magnification?: number
  distance?: number
  direction?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
  'mx-auto w-max h-[58px] p-2 flex gap-2 rounded-full border supports-backdrop-blur:bg-black/10 backdrop-blur-md border-slate-800'
)

const Dock = React.forwardRef<HTMLUListElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = 'bottom',
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)
    const mouseY = useRef(0)

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance
        })
      })
    }

    return (
      <motion.ul
        ref={ref}
        onMouseMove={(e) => {
          mouseX.set(e.pageX)
          mouseY.current = e.pageY
        }}
        onMouseLeave={(e) => {
          if (mouseX.get() !== e.pageX || mouseY.current !== e.pageY)
            return mouseX.set(Infinity)

          const mouseEventHandler = (e: MouseEvent) => {
            // compare the current y value with the previous y value
            if (Math.abs(mouseY.current - e.pageY) > 20) {
              // if the difference is greater than 20 then set the mouseX value to infinity and remove the mousemove event listener
              mouseX.set(Infinity)
              document.removeEventListener('mousemove', mouseEventHandler)
            }
          }
          document.addEventListener('mousemove', mouseEventHandler)
        }}
        {...props}
        className={cn(dockVariants({ className }), {
          'items-start': direction === 'top',
          'items-center': direction === 'middle',
          'items-end': direction === 'bottom'
        })}
      >
        {renderChildren()}
      </motion.ul>
    )
  }
)

Dock.displayName = 'Dock'

export interface DockIconProps {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: any
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLLIElement>(null)

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  )

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  return (
    <motion.li
      ref={ref}
      style={{ width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </motion.li>
  )
}

DockIcon.displayName = 'DockIcon'

export { Dock, DockIcon, dockVariants }
