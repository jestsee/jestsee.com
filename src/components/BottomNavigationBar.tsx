import { Dock, DockIcon } from './ui/dock'
import { HandWaving } from './icons/HandWaving'
import { Briefcase } from './icons/Briefcase'
import { ChatTeardropDots } from './icons/ChatTeardrop'
import { Bookmarks } from './icons/Bookmarks'
import { Github } from './icons/Github'
import { LinkedIn } from './icons/LinkedIn'
import { Envelope } from './icons/Envelope'
import { Separator } from './ui/separator'

const bottomNavigationItems = [
  {
    name: 'Home',
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
  return (
    <div className='fixed bottom-8 z-50'>
      <Dock direction='middle'>
        {bottomNavigationItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <Icon className='size-6' />
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full' />
        {socialMediaItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <Icon className='size-6' />
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

export default BottomNavigationBar
