'use client'

//
import { useEffect, useState } from 'react'
import { getClassHistoryData } from '@/apis/apis'
import { useRouter } from 'next/navigation'
import { notification } from 'antd'
const who = typeof window !== 'undefined' && (JSON.parse(localStorage.getItem('USER'))?.email || '未登入')

//
export default function History({ params }) {
  const historyId = params.history_id
  const [inbox, setInbox] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchClassesHistoryData = async () => {
      try {
        const res = await getClassHistoryData({ id: historyId })
        if (typeof res?.data?.data !== 'string') {
          const transformedArray = res?.data?.data?.map(item => ({
            text: item.data,
            user: item.email
          }))
          setInbox(transformedArray)
        }
      } catch (error) {
        notification.error({
          message: '資料讀取失敗，請重新嘗試!',
          duration: 1
        })
        router.push('/home')
      }
      setLoading(false)
    }
    fetchClassesHistoryData()
  }, [])

  return (
    <div className='w-full'>
      <div className='w-full bg-[#CCC] text-[#fff] text-center py-2 rounded-sm mb-3'>課程編號 - {historyId}</div>
      <MessageList inbox={inbox} loading={loading} />
    </div>
  )
}

function MessageList({ inbox, loading }) {
  return (
    <ul
      className='h-[500px] w-full overflow-y-scroll custom-scrollbar
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
      {
        inbox?.length === 0 && <div className='w-full h-full flex justify-center items-center text-4xl text-[#fff]'>{loading ? '紀錄載入中...' : '這堂課沒有聊天紀錄哦!'}</div>
      }
    </ul>
  )
}
