import { cn } from '@/lib/utils'
import AnimatedGradientText from '../magicui/animated-gradient-text'
import { ChevronRight } from '../icons/ChevronRight'

const GradientText = () => {
  return (
    <div className='z-10 flex items-center justify-center'>
      <AnimatedGradientText>
        🎉
        <span className='mx-2 h-4 w-[1px] shrink-0 bg-gray-300/25' />
        <span
          className={cn(
            `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
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
