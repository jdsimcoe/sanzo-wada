'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { swatchArray, swatchArrayAll } from './colors/swatches'

const ColorContext = createContext()

export function ColorProvider({ children }) {
  const [colorData, setColorData] = useState({
    color_list: swatchArray || [],
    color_list_flat: swatchArrayAll || [],
    color_state: null
  })
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  )
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Set initial window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Load fonts
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/assets/fonts.css'
    document.head.appendChild(link)
    
    link.onload = () => {
      setFontsLoaded(true)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ColorContext.Provider value={{
      colorData,
      windowWidth,
      fontsLoaded
    }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColorContext() {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error('useColorContext must be used within ColorProvider')
  }
  return context
}

