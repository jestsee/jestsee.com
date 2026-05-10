import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import React from 'react'

import { cn } from '@/lib/utils'

interface ScrollProgressBarType {
  strokeSize?: number
  targetId?: string
  className?: string
}

const getContainerElement = (id?: string) => {
  if (!id) return null

  return document.getElementById(id)
}

export default function ScrollProgressBar({
  strokeSize = 0,
  targetId,
  className
}: Readonly<ScrollProgressBarType>) {
  const targetRef = React.useRef<HTMLElement | null>(null)

  targetRef.current = getContainerElement(targetId)

  const { scrollYProgress } = useScroll({
    ...(targetRef.current && {
      target: targetRef,
      offset: ['start center', 'end end']
    })
  })

  const widthValue = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const width = useTransform(widthValue, [0, 1], ['0%', '100%'])

  return (
    <motion.span
      className={cn(
        'pointer-events-none fixed end-0 start-0 top-0 z-30',
        'w-0 overflow-clip rounded-full'
      )}
      style={{ height: `${strokeSize + 2}px`, width }}
    >
      <span
        className={cn(
          'absolute block h-full w-screen bg-emerald-400',
          className
        )}
      ></span>
    </motion.span>
  )
}
