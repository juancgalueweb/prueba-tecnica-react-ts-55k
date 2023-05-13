import { useEffect, useState } from 'react'

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(mediaQuery.matches ? 'dark' : 'light')

    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleColorSchemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleColorSchemeChange)
    }
  }, [])

  return { colorScheme }
}

export default useColorScheme
