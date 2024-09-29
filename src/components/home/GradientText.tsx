import { cn } from '@/lib/utils'
import AnimatedGradientText from '../magicui/animated-gradient-text'
import { ChevronRight } from '../icons/ChevronRight'

const GradientText = () => {
  return (
    <div className='z-10 flex items-center justify-center'>
      <AnimatedGradientText>
        🔥
        <span className='mx-2 h-4 w-[1px] shrink-0 bg-gray-300/25' />
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ff4430] via-[#d66d30] to-[#ff4430] bg-[length:var(--bg-size)_100%] bg-clip-text font-normal tracking-wide text-transparent max-sm:text-xs`
          )}
        >
          Check out my latest work
        </span>
        <ChevronRight className='ml-1 size-4 text-zinc-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
      </AnimatedGradientText>
    </div>
  )
}

export default GradientText
