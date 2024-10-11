import React, { useRef } from 'react'

export const useNavTooltipHandler = () => {
  const tipX = useRef(0)
  const tipY = useRef(0)

  const setTipXY = () => {
    document.documentElement.style.setProperty(
      '--tip-x',
      tipX.current.toString()
    )
    document.documentElement.style.setProperty(
      '--tip-y',
      tipY.current.toString()
    )
  }

  let bounds: DOMRect

  const track = ({ x, y }: { x: number; y: number }) => {
    tipX.current = x - bounds.left
    tipY.current = y - bounds.top

    setTipXY()
  }

  React.useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return

    const navSize = nav.getBoundingClientRect().width
    nav.style.opacity = '1'
    nav.style.setProperty('--width', navSize.toString())

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

  return { setTipXY }
}
