import * as React from 'react'

const BibleBreathing = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={64}
    height={64}
    viewBox='0 0 1024 1024'
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path fill='#fff' d='M0 0h1024v1024H0z' />
      <g clipPath='url(#b)'>
        <path fill='#C6FFC2' d='M0 0h1024v1024H0z' />
        <circle cx={512} cy={1024} r={1024} fill='url(#c)' />
        <path
          fill='url(#d)'
          d='M822.605 589.333a51.02 51.02 0 0 1-33.691 48.306l-166.776 61.628-61.433 166.904a51.471 51.471 0 0 1-48.306 33.694 51.475 51.475 0 0 1-48.306-33.694l-61.821-166.904-166.905-61.434a51.476 51.476 0 0 1 0-96.612L402.272 479.4l61.433-166.905a51.476 51.476 0 0 1 96.612 0L622.138 479.4l166.905 61.433a51.028 51.028 0 0 1 33.562 48.5Zm-181.067-310.4h51.734v51.734a25.866 25.866 0 1 0 51.733 0v-51.734h51.733a25.866 25.866 0 1 0 0-51.733h-51.733v-51.733a25.866 25.866 0 1 0-51.733 0V227.2h-51.734a25.866 25.866 0 1 0 0 51.733ZM926.072 382.4h-25.867v-25.867a25.866 25.866 0 1 0-51.733 0V382.4h-25.867a25.866 25.866 0 1 0 0 51.733h25.867V460a25.864 25.864 0 0 0 25.866 25.867A25.867 25.867 0 0 0 900.205 460v-25.867h25.867a25.866 25.866 0 1 0 0-51.733Z'
        />
      </g>
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h1024v1024H0z' />
      </clipPath>
      <clipPath id='b'>
        <path fill='#fff' d='M0 0h1024v1024H0z' />
      </clipPath>
      <radialGradient
        id='c'
        cx={0}
        cy={0}
        r={1}
        gradientTransform='rotate(90 -256 768) scale(1024)'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.255} stopColor='#356D39' />
        <stop offset={0.75} stopColor='#A7DBAA' />
        <stop offset={1} stopColor='#C6FFC2' stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id='d'
        x1={576.806}
        x2={576.806}
        y1={149.6}
        y2={899.865}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.5} stopColor='#fff' />
        <stop offset={1} stopColor='#669A6A' />
      </linearGradient>
    </defs>
  </svg>
)

export default BibleBreathing
