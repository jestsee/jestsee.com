import { Github } from './icons/Github'
import { Gitlab } from './icons/Gitlab'
import { LinkedIn } from './icons/LinkedIn'

const SocialMediaIcons = () => {
  return (
    <div className='flex gap-8'>
      <Github className='size-8' />
      <Gitlab className='size-8' />
      <LinkedIn className='size-8' />
    </div>
  )
}

export default SocialMediaIcons
