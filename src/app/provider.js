'use client'

import { MainContextProvider } from "@/context/mainContext"

export function Provider({ children }) {
  return (
    <MainContextProvider>
      {children}
    </MainContextProvider>
  )
}