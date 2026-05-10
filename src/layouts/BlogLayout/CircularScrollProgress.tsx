import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'motion/react'

interface Props {
  className?: string
}
export default function CircularScrollProgress({ className }: Props) {
  const { scrollYProgress } = useScroll()

  const radius = 8
  const circumference = 2 * Math.PI * radius

  // Map scroll progress (0 → 1) to stroke offset (circumference → 0)
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  )

  return (
    <div className={cn('relative', className)}>
      <svg width='32' height='32' className='-rotate-90 transform'>
        {/* Background circle */}
        <circle
          cx='16'
          cy='16'
          r={radius}
          stroke='currentColor'
          strokeWidth='2.5'
          fill='none'
          className='opacity-20'
        />

        {/* Progress circle */}
        <motion.circle
          cx='16'
          cy='16'
          r={radius}
          stroke='currentColor'
          strokeWidth='2.5'
          fill='none'
          strokeLinecap='round'
          strokeDasharray={circumference}
          style={{
            strokeDashoffset
          }}
        />
      </svg>

      {/* Center dot */}
      {/* <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-1 w-1 rounded-full bg-current opacity-60' />
      </div> */}
    </div>
  )
}
