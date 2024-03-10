'use client'

import { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { io } from 'socket.io-client'

export default function ClassesPage({ params }) {
  const classId = params.class_id
  const [socket, setSocket] = useState(null)
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState('')
  const [roomName, setRoomName] = useState('')
  const theUser = '使用者A'

  const handleSendMessage = () => {
    socket.emit('message', message, roomName, theUser)
  }

  const handleJoinRoom = () => {
    socket.emit('joinRoom', roomName, theUser)
    setInbox((currentInbox) => [...currentInbox, `${theUser} 進入聊天室 ${roomName}`])
  }

  useEffect(() => {
    const socketInstance = io('http://localhost:3001')

    socketInstance.on('message', (newMessage) => {
      setInbox((currentInbox) => [...currentInbox, newMessage])
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <div className='h-full'>
      <div className="text-[20px] text-[#66BFFF]">課程編號 {classId} 頁面施工中...</div>

      <div className='min-h-[300px] bg-black text-[#fff]'>
        {
          inbox.map((message, index) => (
            <div key={index}>{message}</div>
          ))
        }
      </div>
      <Input onChange={e => setRoomName(e.target.value)} />
      <Button onClick={handleJoinRoom}>進入聊天室</Button>

      <Input onChange={e => setMessage(e.target.value)} />
      <Button onClick={handleSendMessage}>發送訊息</Button>
    </div>
  )
}
