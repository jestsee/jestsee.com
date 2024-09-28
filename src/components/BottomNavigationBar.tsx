import { Dock, DockIcon } from './ui/dock'
import { HandWaving } from './icons/HandWaving'
import { Briefcase } from './icons/Briefcase'
import { ChatTeardropDots } from './icons/ChatTeardrop'
import { Bookmarks } from './icons/Bookmarks'

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

const BottomNavigationBar = () => {
  return (
    <div className='fixed bottom-8 z-50'>
      <Dock direction='middle'>
        {bottomNavigationItems.map(({ name, icon: Icon, href }) => (
          <DockIcon key={name}>
            <Icon className='size-6' />
          </DockIcon>
        ))}
      </Dock>
    </div>
  )
}

export default BottomNavigationBar
