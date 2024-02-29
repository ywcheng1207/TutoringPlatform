import { createContext, useState } from 'react'

export const mainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const [data, setData] = useState('測試')

  return (
    <mainContext.Provider value={data}>
      {children}
    </mainContext.Provider>
  )
}
