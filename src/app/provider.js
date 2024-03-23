'use client'
import { useEffect, useState } from 'react'
import { MainContextProvider } from '@/context/mainContext'

export function Provider({ children }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <MainContextProvider>
      {isClient && children}
    </MainContextProvider>
  )
}
