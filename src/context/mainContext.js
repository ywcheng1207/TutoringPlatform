import { createContext, useState } from 'react'

export const mainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const [memberInfo, setMemberInfo] = useState([])

  const handleMemberInfo = (e) => {
    setMemberInfo(e)
  }

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
