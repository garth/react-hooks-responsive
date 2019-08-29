import { useState, useEffect } from 'react'

export type Orientation = 'landscape' | 'portrait'

export interface Screen<T> {
  size: keyof T
  orientation: Orientation
  screenIsAtLeast(breakpoint: keyof T, andOrientation?: Orientation): boolean
  screenIsAtMost(breakpoint: keyof T, andOrientation?: Orientation): boolean
}

export const useResponsive = <T extends { [name: string]: number }>(breakpoints: T): Screen<T> => {
  const sizes = Object.entries(breakpoints).sort(([a, aSize], [b, bSize]) => bSize - aSize)
  if (sizes[sizes.length - 1][1] !== 0) {
    console.warn('fixing', sizes[sizes.length - 1][0], 'size which should be 0')
    sizes[sizes.length - 1][1] = 0
  }

  const getScreen = (): Screen<T> => {
    const width = window.innerWidth
    const size = sizes.find(([_, size]) => size < width)[0]
    const orientation = width > window.innerHeight ? 'landscape' : 'portrait'
    return {
      size,
      orientation,
      screenIsAtLeast(breakpoint, andOrientation) {
        return width >= breakpoints[breakpoint] && (!andOrientation || andOrientation === orientation)
      },
      screenIsAtMost(breakpoint, andOrientation) {
        return width <= breakpoints[breakpoint] && (!andOrientation || andOrientation === orientation)
      }
    }
  }

  const [screen, setScreen] = useState(getScreen())

  useEffect(
    () => {
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
    },
    [screen, setScreen, getScreen]
  )

  return screen
}
