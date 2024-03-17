'use client'
//
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { io } from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react'

//
const who = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')
const id = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')

//
export default function ClassesPage({ params }) {
  const classId = params.class_id
  const router = useRouter()
  const [socket, setSocket] = useState(null)
  const [inbox, setInbox] = useState([])
  const [userInClass, setUserInClass] = useState(false)

  const handleSendMessage = (newMessage) => {
    const data = newMessage
    socket.emit('message', id, data)
    setInbox([...inbox, { user: id, text: data }])
  }

  useEffect(() => {
    // const socketInstance = io('http://10.0.0.136:3000')
    // const socketInstance = io('http://localhost:3001')
    // const socketInstance = io('https://tutor-online.zeabur.app')
    const socketInstance = io('https://boss-shad-deadly.ngrok-free.app', {
      extraHeaders: {
        'ngrok-skip-browser-warning': '69420'
      }
    })
    socketInstance.on('connect', () => {
      setUserInClass(true)
    })
    socketInstance.on('connect_error', () => {
      setUserInClass(false)
    })
    // const socketInstance = io('')
    socketInstance.on('message', ({ id, data }) => {
      console.log(id)
      console.log(data)
      setInbox((currentInbox) => [...currentInbox, { user: id, text: data }])
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  useEffect(() => {
    if (userInClass) {
      notification.success({
        message: `${who}進入課程${classId}!`,
        duration: 1
      })
    } else if (who === '未登入') {
      notification.error({
        message: '請先登入後重新嘗試!',
        duration: 1
      })
      router.push('/signin')
    } else if (!classId) {
      notification.error({
        message: '找不到該課程，請稍後重新嘗試!',
        duration: 1
      })
    }
    // else {
    //   notification.error({
    //     message: 'Oops課程出了一點狀況，請稍後重新嘗試!',
    //     duration: 1
    //   })
    // }
  }, [userInClass])

  return (
    <div className='w-full'>
      <div className='w-full bg-[#CCC] text-[#fff] text-center py-2 rounded-sm mb-3'>課程編號 - {classId}</div>
      <ChatWindow inbox={inbox} handleSendMessage={handleSendMessage} />
    </div>
  )
}

//
function ChatWindow({ inbox, handleSendMessage }) {
  return (
    <div className='flex flex-col lg:flex-row gap-3'>
      <div className="max-w-7/12">
        <iframe className='w-full min-w-[500px] h-[500px]' src="https://www.youtube.com/embed/w4OeGMFTZak" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div className='flex flex-col w-full gap-3 max-w-3/12'>
        <MessageList inbox={inbox} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
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
    <div className='w-full flex justify-between items-center'>
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

function MessageList({ messages, inbox }) {
  return (
    <ul
      className='h-[500px] overflow-y-scroll custom-scrollbar
     bg-[#90d1ff] p-5 rounded-lg flex flex-col gap-1'
    >
      {inbox?.map((message, index) => (
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
