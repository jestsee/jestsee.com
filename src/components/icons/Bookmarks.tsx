import type { SVGProps } from 'react'

export function Bookmarks(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        fill='currentColor'
        d='M192 24H96a16 16 0 0 0-16 16v16H64a16 16 0 0 0-16 16v152a8 8 0 0 0 12.65 6.51L112 193.83l51.36 36.68A8 8 0 0 0 176 224v-39.31l19.35 13.82A8 8 0 0 0 208 192V40a16 16 0 0 0-16-16m-32 184.46l-43.36-31a8 8 0 0 0-9.3 0L64 208.45V72h96Zm32-32L176 165V72a16 16 0 0 0-16-16H96V40h96Z'
      ></path>
    </svg>
  )
}
