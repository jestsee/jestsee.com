import type { SVGProps } from 'react'
import { TypeScript } from '../icons/TypeScript'
import { NextJs } from '../icons/NextJs'
import { ReactJs } from '../icons/ReactJs'
import { Reactquery } from '../icons/ReactQuery'
import { Tailwindcss } from '../icons/Tailwind'
import { Puppeteer } from '../icons/Puppeteer'
import { Prisma } from '../icons/Prisma'
import { Drizzle } from '../icons/Drizzle'
import { Nestjs } from '../icons/NestJs'
import { Hono } from '../icons/Hono'
import { Astro } from '../icons/Astro'
import { Vuejs } from '../icons/VueJs'
import { Nuxtjs } from '../icons/NuxtJs'
import { Docker } from '../icons/Docker'

type TechStack = {
  name: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  description: string
}

const techStacks: TechStack[] = [
  {
    name: 'TypeScript',
    icon: TypeScript,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Next',
    icon: NextJs,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'React Native',
    icon: ReactJs,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'React Query',
    icon: Reactquery,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Tailwind',
    icon: Tailwindcss,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Puppeteer',
    icon: Puppeteer,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Prisma',
    icon: Prisma,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Drizzle',
    icon: Drizzle,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Nest',
    icon: Nestjs,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Hono',
    icon: Hono,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Astro',
    icon: Astro,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Vue',
    icon: Vuejs,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Nuxt',
    icon: Nuxtjs,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  },
  {
    name: 'Docker',
    icon: Docker,
    description:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
  }
]

export default techStacks
