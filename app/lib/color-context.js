'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { swatchArray, swatchArrayAll } from './colors/swatches'

const ColorContext = createContext()

// Throttle function for resize handler
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function ColorProvider({ children }) {
  // Memoize color data since it never changes
  const colorData = useMemo(() => ({
    color_list: swatchArray || [],
    color_list_flat: swatchArrayAll || [],
    color_state: null
  }), [])

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  )
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Set initial window width
    const updateWidth = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Throttle resize handler to improve performance
    const handleResize = throttle(updateWidth, 100)
    
    updateWidth()
    window.addEventListener('resize', handleResize, { passive: true })
    
    // Load fonts with preload for better performance
    const existingLink = document.querySelector('link[href="/assets/fonts.css"]')
    if (!existingLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '/assets/fonts.css'
      link.media = 'print'
      link.onload = () => {
        link.media = 'all'
        setFontsLoaded(true)
      }
      document.head.appendChild(link)
    } else {
      setFontsLoaded(true)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    colorData,
    windowWidth,
    fontsLoaded
  }), [colorData, windowWidth, fontsLoaded])

  return (
    <ColorContext.Provider value={contextValue}>
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

