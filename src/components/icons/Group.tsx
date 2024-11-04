import type { SVGProps } from 'react'

export function Group(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='none' stroke='currentColor' strokeWidth='1.5'>
        <circle cx='9' cy='6' r='4'></circle>
        <path d='M12.5 4.341a3 3 0 1 1 0 3.318' opacity='.5'></path>
        <ellipse cx='9' cy='17' rx='7' ry='4'></ellipse>
        <path
          strokeLinecap='round'
          d='M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37'
          opacity='.5'
        ></path>
      </g>
    </svg>
  )
}