import { createContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const mainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const [memberInfo, setMemberInfo] = useState([])
  const path = usePathname()

  const handleMemberInfo = (e) => {
    setMemberInfo(e)
  }

  useEffect(() => {
    const userInfo = localStorage.getItem('USER')
    setMemberInfo(userInfo ? JSON.parse(userInfo) : null)
  }, [path])

  const value = {
    memberInfo,
    onMemberInfo: handleMemberInfo
  }

  return (
    <mainContext.Provider value={value}>
      {children}
    </mainContext.Provider>
  )
}
