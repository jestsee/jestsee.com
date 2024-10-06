import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import './RayLight.css'

interface Props extends Pick<ComponentProps<'div'>, 'className'> {}

const RayLight = (props: Props) => {
  return (
    <div
      className={cn(
        'absolute h-[130px] w-[1190px] rounded-full',
        '-top-14 left-[84px] -rotate-[32deg]',
        'opacity-30 blur-[48px]',
        'ray-light',
        props.className
      )}
    ></div>
  )
}

export default RayLight
