import { createContext, useState, useEffect } from 'react'

export const mainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const [memberInfo, setMemberInfo] = useState([])

  const handleMemberInfo = (e) => {
    setMemberInfo(e)
  }

  useEffect(() => {
    const userInfo = localStorage.getItem('USER')
    setMemberInfo(userInfo ? JSON.parse(userInfo) : null)
  }, [])

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
