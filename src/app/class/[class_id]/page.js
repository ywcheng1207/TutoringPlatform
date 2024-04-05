'use client'
//
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, notification, Statistic } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { io } from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react'
import { getClassHistoryData, patchCompleteClasses } from '@/apis/apis'
//
const who = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')
const id = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')

//
export default function ClassesPage({ params }) {
  const classId = params.class_id
  const router = useRouter()
  const [socket, setSocket] = useState(null)
  const [inbox, setInbox] = useState([])
  const deadline = Date.now() + 1000 * 60 * 3
  const [userInClass, setUserInClass] = useState(false)

  const handleSendMessage = (newMessage) => {
    const data = newMessage
    socket.emit('message', classId, id, data)
    setInbox([...inbox, { user: id, text: data }])
  }

  useEffect(() => {
    // const socketInstance = io('http://10.0.0.136:3000')
    // const socketInstance = io('http://localhost:3001')
    // const socketInstance = io('https://tutor-online.zeabur.app')
    // const socketInstance = io('https://tutor-online2024wb.uk')
    const socketInstance = io('https://alive-lizard-eagerly.ngrok-free.app', {
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
    socketInstance.emit('joinRoom', classId, id, (response) => {
      // setInbox((currentInbox) => [...currentInbox, `${id}準備通話`])
    })
    socketInstance.on('message', ({ email, data }) => {
      setInbox((currentInbox) => [...currentInbox, { user: email, text: data }])
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchClassesHistoryData = async () => {
      try {
        const res = await getClassHistoryData({ id: classId })
        if (typeof res?.data?.data !== 'string') {
          const transformedArray = res?.data?.data?.map(item => ({
            text: item.data,
            user: item.email
          }))
          setInbox(transformedArray)
        }
      } catch (error) {
        // console.error('課程歷史資料', error)
        notification.error({
          message: '資料讀取失敗，請重新嘗試!',
          duration: 1
        })
        router.push('/home')
      }
      // setIsLoading(false)
    }
    fetchClassesHistoryData()
  }, [])

  return (
    <div className='w-full'>
      <Statistic.Countdown
        title={<div><div className='text-red-500 text-2xl font-bold'>DEMO</div><div>課程剩餘時間</div></div>}
        value={deadline}
        format="mm分ss秒"
        onFinish={async () => {
          try {
            const res = await patchCompleteClasses({ id: classId })
            router.push('/home')
            notification.info({
              message: '課程時間結束!',
              duration: 1
            })
          } catch (error) {
          }
        }}
      />
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
        <iframe className='w-full min-w-[500px] h-[500px]' src="https://www.youtube.com/embed/w4OeGMFTZak" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
    if (text.length === 0) return
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

function MessageList({ inbox }) {
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
