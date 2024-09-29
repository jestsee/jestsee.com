import { Dock, DockIcon } from './ui/dock'
import { HandWaving } from './icons/HandWaving'
import { Briefcase } from './icons/Briefcase'
import { ChatTeardropDots } from './icons/ChatTeardrop'
import { Bookmarks } from './icons/Bookmarks'
import { Github } from './icons/Github'
import { LinkedIn } from './icons/LinkedIn'
import { Envelope } from './icons/Envelope'
import { Separator } from './ui/separator'
import { Tooltip } from './ui/tooltip'
import { useEffect, useRef, useState } from 'react'
import { HandPalm } from './icons/HandPalm'
import { cn } from '@/lib/utils'

const bottomNavigationItems = [
  {
    name: 'Hi 👋',
    icon: HandWaving,
    href: '/'
  },
  {
    name: 'Works',
    icon: Briefcase,
    href: '/works'
  },
  {
    name: 'Blog',
    icon: ChatTeardropDots,
    href: '/blog'
  },
  {
    name: 'About',
    icon: HandPalm,
    href: '/about'
  },
  {
    name: 'Bookmarks',
    icon: Bookmarks,
    href: '/bookmarks'
  }
]

const socialMediaItems = [
  {
    name: 'Email',
    icon: Envelope,
    href: ''
  },
  {
    name: 'LinkedIn',
    icon: LinkedIn,
    href: ''
  },
  {
    name: 'Github',
    icon: Github,
    href: ''
  }
]

const BottomNavigationBar = () => {
  const [currentPath, setCurrentPath] = useState('')

  const scrollY = useRef(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    window.addEventListener('scroll', handleScroll)

    document.addEventListener('astro:page-load', () => {
      const pathname = window.location.pathname
      setCurrentPath(pathname)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    const isScrollingDown = scrollY.current < currentScrollY

    scrollY.current = currentScrollY

    setShow(!isScrollingDown)
  }

  return (
    <div
      className={cn('fixed z-10 transition-all duration-500', {
        'bottom-8': show,
        '-bottom-20': !show
      })}
    >
      <Dock direction='middle'>
        {bottomNavigationItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <a href={href}>
              <Tooltip content={name}>
                <Icon className='size-6' />
              </Tooltip>
            </a>
            {currentPath === href && (
              <div className='absolute bottom-2 size-1 rounded-full bg-orange-600'></div>
            )}
          </DockIcon>
        ))}
        {/* <Separator orientation='vertical' className='h-full' />
        {socialMediaItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <Tooltip content={name}>
              <Icon className='size-6' />
            </Tooltip>
          </DockIcon>
        ))} */}
      </Dock>
    </div>
  )
}

export default BottomNavigationBar
