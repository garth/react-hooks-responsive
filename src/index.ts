import { useState, useEffect } from 'react'

export const useResponsive = <T extends { [name: string]: number }>(
  breakpoints: T
): [keyof T, 'landscape' | 'portrait'] => {
  const sizes = Object.entries(breakpoints).sort(([a, aSize], [b, bSize]) => bSize - aSize)
  if (sizes[sizes.length - 1][1] !== 0) {
    console.warn('fixing', sizes[sizes.length - 1][0], 'size which should be 0')
    sizes[sizes.length - 1][1] = 0
  }

  const getScreen = (): { size: keyof T; orientation: 'landscape' | 'portrait' } => {
    const width = window.innerWidth
    return {
      size: sizes.find(([_, size]) => size < width)[0],
      orientation: width > window.innerHeight ? 'landscape' : 'portrait'
    }
  }

  const [screen, setScreen] = useState(getScreen())

  useEffect(() => {
    const onResize = () => {
      const current = getScreen()

      if (current.size !== screen.size || current.orientation !== screen.orientation) {
        setScreen(current)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return [screen.size, screen.orientation]
}
