import React from 'react'

export const useNavTooltipHandler = () => {
  React.useEffect(() => {
    const config = {
      theme: 'dark',
      locked: false,
      speed: 0.25,
      blur: 4,
      debug: false,
      flow: 'horizontal'
    }

    const update = () => {
      document.documentElement.dataset.theme = config.theme
      document.documentElement.dataset.debug = config.debug
      document.documentElement.dataset.locked = config.locked
      document.documentElement.dataset.flow = config.flow
      document.documentElement.style.setProperty('--speed', config.speed)
      document.documentElement.style.setProperty('--blur', config.blur)
    }

    update()
    const nav = document.querySelector('nav')
    const navSize = nav.getBoundingClientRect().width
    nav.style.opacity = '1'
    nav.style.setProperty('--width', navSize)

    document.documentElement.dataset.orientation = 'horizontal'

    // This is the part required for the pointer tracking...
    let bounds
    const track = ({ x, y }) => {
      console.info({ x, y })
      document.documentElement.style.setProperty('--tip-x', x - bounds.left)
      document.documentElement.style.setProperty('--tip-y', y - bounds.top)
    }

    const teardown = () => {
      nav.removeEventListener('pointermove', track)
      nav.removeEventListener('pointerleave', teardown)
    }

    const initPointerTrack = () => {
      bounds = nav.getBoundingClientRect()
      nav.addEventListener('pointermove', track)
      nav.addEventListener('pointerleave', teardown)
    }

    nav.addEventListener('pointerenter', initPointerTrack)
  }, [])
}
