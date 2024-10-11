import { Dock, DockIcon } from './ui/dock'
import { HandWaving } from './icons/HandWaving'
import { Briefcase } from './icons/Briefcase'
import { ChatTeardropDots } from './icons/ChatTeardrop'
import { Bookmarks } from './icons/Bookmarks'
import { useEffect, useRef, useState } from 'react'
import { HandPalm } from './icons/HandPalm'
import { cn } from '@/lib/utils'

import './BottomNavigationBar.css'
import { useNavTooltipHandler } from './useNavTooltipHandler'

export const bottomNavigationItems = [
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

const BottomNavigationBar = () => {
  const [currentPath, setCurrentPath] = useState('')

  const scrollY = useRef(0)
  const [show, setShow] = useState(true)

  const { setTipXY } = useNavTooltipHandler()

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    const handlePathChange = () => {
      const pathname = window.location.pathname
      setCurrentPath(pathname)
      setTipXY()
    }

    document.addEventListener('astro:page-load', handlePathChange)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('astro:page-load', handlePathChange)
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
    <>
      <nav
        className={cn('nav', 'fixed transition-all duration-500', {
          'bottom-8 max-xs:bottom-4': show,
          '-bottom-20': !show
        })}
      >
        <Dock direction='middle'>
          {bottomNavigationItems.map(({ name, icon: Icon, href }) => (
            <DockIcon key={name}>
              <a href={href}>
                <Icon className='size-6' />
              </a>
              {currentPath === href && (
                <div className='absolute bottom-2 size-1 rounded-full bg-emerald-200'></div>
              )}
            </DockIcon>
          ))}
        </Dock>
      </nav>
      <div className='tip' aria-hidden='true'>
        <div className='tip__track'>
          {bottomNavigationItems.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BottomNavigationBar
