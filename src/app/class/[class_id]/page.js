'use client'

//
import { useEffect, useState, useRef } from 'react'
import { Button, Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { io } from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'

//

const who = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')
const id = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')

//
export default function ClassesPage({ params }) {
  const classId = params.class_id
  const [socket, setSocket] = useState(null)
  const [inbox, setInbox] = useState([])

  const handleSendMessage = (newMessage) => {
    // const message = { user: who, text: newMessage }
    // socket.emit('message', newMessage)
    const data = newMessage
    // socket.emit('message', id, data)
    socket.emit('message', id, data)
    // setInbox([...inbox, newMessage])
  }

  useEffect(() => {
    // const socketInstance = io('http://10.0.0.136:3000')
    // const socketInstance = io('http://localhost:3001')
    const socketInstance = io('https://tutor-online.zeabur.app')
    // const socketInstance = io('https://boss-shad-deadly.ngrok-free.app')
    // const socketInstance = io('')
    // console.log(socketInstance)
    socketInstance.on('connect', () => {
      console.log('已連線')
    })
    socketInstance.on('connect_error', (err) => {
      console.log(`connect_error due to ${err}`)
    })
    // const socketInstance = io('')
    // socketInstance.on('message', (newMessage) => {
    //   setInbox((currentInbox) => [...currentInbox, newMessage])
    // })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <div className='w-full'>
      <div className='w-full bg-[#CCC] text-[#fff] text-center py-2 rounded-sm mb-3'>課程編號 - {classId}</div>
      <ChatWindow inbox={inbox} handleSendMessage={handleSendMessage} />
    </div>
  )
}

//
function ChatWindow({ inbox, handleSendMessage }) {
  // const [messages, setMessages] = useState([{ user: '老師001', text: '歡迎光臨，喜歡都可以試穿看看哦 (?' }, { user: who, text: '別鬧' }])

  // const handleSendMessage = (newMessage) => {
  //   const message = { user: who, text: newMessage }
  //   setMessages([...messages, message])
  //   console.log(who.email)
  // }

  return (
    <div className='flex flex-col gap-3'>
      <MessageList inbox={inbox} />
      <MessageInput onSendMessage={handleSendMessage} />
      {/* <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} /> */}
    </div>
  )
}
function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e?.preventDefault()
    onSendMessage(text)
    setText('')
  }

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji)
  }

  return (
    <div className='flex justify-between items-center'>
      <Input value={text} onChange={e => setText(e.target.value)} onPressEnter={handleSubmit} />
      <MyEmojiPicker onEmojiSelect={handleEmojiSelect} />
      <Button
        type="submit"
        onClick={handleSubmit}
        style={{ background: '#66BFFF', color: 'white', width: 70 }}
      >
        發送
      </Button>
    </div>
  )
}

const MyEmojiPicker = ({ onEmojiSelect }) => {
  const [showEmoji, setShowEmoji] = useState(false)
  const emojiPickerRef = useRef(null)

  const handleShowEmoji = () => setShowEmoji(!showEmoji)

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmoji(false)
    }
  }

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmoji])

  const onEmojiClick = (event) => {
    onEmojiSelect(event.emoji)
    setShowEmoji(false)
  }

  return (
    <div className='relative' ref={emojiPickerRef}>
      <div className='w-[50px] flex justify-center'>
        <SmileOutlined onClick={handleShowEmoji} style={{ color: '#66BFFF', fontSize: 25 }} />
      </div>
      {showEmoji && (
        <div className='absolute bottom-0 right-0'>
          <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle='twitter' lazyLoadEmojis={true} />
        </div>
      )}
    </div>
  )
}

function MessageList({ messages }) {
  return (
    <ul
      className='h-[500px] overflow-y-scroll custom-scrollbar
     bg-[#90d1ff] p-5 rounded-lg flex flex-col gap-1'
    >
      {messages?.map((message, index) => (
        <li
          key={index}
          className={
            `text-[#66BFFF] break-words py-4 pb-6 px-4 rounded-md bg-[#FFF]
            ${message.user === who && 'text-right'} 
            border border-white border-w-1`
          }
        >
          {message.user}: {message.text}
        </li>
      ))}
    </ul>
  )
}
// export default function ClassesPage({ params }) {
//   const classId = params.class_id
//   const [socket, setSocket] = useState(null)
//   const [inbox, setInbox] = useState([])
//   const [message, setMessage] = useState('')
//   const [roomName, setRoomName] = useState('')
//   const theUser = '使用者A'

//   const handleSendMessage = () => {
//     socket.emit('message', message, roomName, theUser)
//   }

//   const handleJoinRoom = () => {
//     socket.emit('joinRoom', roomName, theUser)
//     setInbox((currentInbox) => [...currentInbox, `${theUser} 進入聊天室 ${roomName}`])
//   }

//   useEffect(() => {
//     const socketInstance = io('http://localhost:3001')

//     socketInstance.on('message', (newMessage) => {
//       setInbox((currentInbox) => [...currentInbox, newMessage])
//     })

//     setSocket(socketInstance)

//     return () => {
//       socketInstance.disconnect()
//     }
//   }, [])

//   return (
//     <div className='h-full'>
//       <div className="text-[20px] text-[#66BFFF]">課程編號 {classId} 頁面施工中...</div>

//       <div className='min-h-[300px] bg-black text-[#fff]'>
//         {
//           inbox.map((message, index) => (
//             <div key={index}>{message}</div>
//           ))
//         }
//       </div>
//       <Input onChange={e => setRoomName(e.target.value)} />
//       <Button onClick={handleJoinRoom}>進入聊天室</Button>

//       <Input onChange={e => setMessage(e.target.value)} />
//       <Button onClick={handleSendMessage}>發送訊息</Button>
//     </div>
//   )
// }
