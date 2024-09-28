import type { SVGProps } from 'react'

export function TriangleDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path fill='currentColor' d='M1 3h22L12 22'></path>
    </svg>
  )
}
