import type { SVGProps } from 'react'

export function Scroll(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M5.975 16.987V6.532c0-1.345.057-2.906 1.065-3.8C7.866 2 9.034 2 10.14 2h7.31c1.027 0 2.092.018 3.012.47q.112.055.213.115C22.042 3.388 22 5.302 22 6.885v10.532c0 1.041-.048 2.111-.48 3.059c-.414.907-.98 1.314-2.024 1.506M5.975 16.987h8.83c.413 0 .785.253.93.638c.126.337.23.627.323.9c.323.958.607 1.969 1.287 2.717c.409.45.838.678 1.41.74m-12.78-4.995H2.969c-.553 0-1.011.447-.966.997c.047.576.15 1.078.34 1.615c.336.95.92 1.911 1.88 2.225c.354.115.746.153 1.251.158h13.28m.742 0a4 4 0 0 1-.742 0m.742 0h-.742M10.469 7h7m-7 4h3.5'
        color='currentColor'
      ></path>
    </svg>
  )
}
