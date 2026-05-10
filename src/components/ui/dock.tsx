import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import React, { type PropsWithChildren, useRef } from 'react'

import { cn } from '@/lib/utils'

export interface DockProps {
  className?: string
  magnification?: number
  distance?: number
  children: React.ReactNode
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 280

const Dock = React.forwardRef<HTMLUListElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
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
        id='nav-dock'
        ref={ref}
        onMouseMove={(e) => {
          if (document.body.classList.contains('disable-scroll')) return

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
        className={cn(
          'mx-auto w-max p-1',
          'flex items-center',
          'transition-all duration-300',
          className
        )}
        {...props}
      >
        {renderChildren()}
      </motion.ul>
    )
  }
)

Dock.displayName = 'Dock'

export interface DockIconProps
  extends Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'> {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: any
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
  href?: string
  onClick?: () => void
  name: string
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  name,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLAnchorElement>(null)

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [48, magnification, 48]
  )

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  const getWidth = () => {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
    return { width: isMobile ? '48px' : width }
  }

  return (
    <li style={{ viewTransitionName: name }}>
      <motion.a
        ref={ref}
        style={getWidth()}
        className={cn(
          'flex items-center justify-center',
          'relative cursor-pointer rounded-full',
          'h-10',
          className
        )}
        {...props}
      >
        {children}
      </motion.a>
    </li>
  )
}

DockIcon.displayName = 'DockIcon'

export { Dock, DockIcon }
