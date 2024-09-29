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
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    document.addEventListener('astro:page-load', () => {
      const pathname = window.location.pathname
      setCurrentPath(pathname)
    })
  }, [])

  return (
    <div className='fixed bottom-8 z-10'>
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
        <Separator orientation='vertical' className='h-full' />
        {socialMediaItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <Tooltip content={name}>
              <Icon className='size-6' />
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

export default BottomNavigationBar
