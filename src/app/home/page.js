'use client'

//
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Select, Input, Button, Radio, List } from 'antd'
import axios from 'axios'

//
import TeacherCard from '@/components/TeacherCard'
import iconBell from '@/assets/icon-bell.svg'
import NoPhoto from '@/components/NoPhoto'
import HomeList from '@/components/HomeList'

//
const BASEURL = 'https://tutor-online.zeabur.app'

//
// export const metadata = {
//   title: 'home',
//   description: 'Generated by YWJ'
// }

const data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 }
]
const rankinData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
]
//
const Home = () => {
  const [studendRankData, setStudentRankData] = useState([])

  const handleNavigate = ({ id }) => {
    console.log(id)
  }

  useEffect(() => {
    const getStudentRankData = async () => {
      try {
        const token = localStorage.getItem('TOKEN')
        const response = await axios.get(`${BASEURL}/students`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response)
      } catch (error) {
        console.error('GetStudentRankData Failed:', error)
      }
    }

    getStudentRankData()
  }, [])

  return (
    <div className='bg-yellow'>
      <div className='flex flex-col gap-5 md:hidden'>
        <Select placeholder='課程' style={{ width: '100%' }} showSearch={true} />
        <Select placeholder='教師國籍' style={{ width: '100%' }} showSearch={true} />
        <Input
          placeholder='搜尋老師的名字' style={{ width: '100%' }}
          suffix={<Button style={{ color: '#fff', background: '#66BFFF' }}>搜尋</Button>}
        />
        <StudyRanking />
        <MobileCardList />
      </div>
      <div className='hidden md:flex gap-5'>
        <HomeList data={data} />
        <StudyRanking />
      </div>
    </div>
  )
}
export default Home

const StudyRanking = () => {
  return (
    <div className='min-h-[100px] border-[1px] border-solid border-[#CCC] rounded-[3px] p-3'>
      <div className='bg-[#DDD] text-[#fff] py-1 rounded-sm flex justify-center gap-2 items-center mb-3'>
        <Image src={iconBell} alt='bell' />
        <div>學習時數排行</div>
      </div>
      <div className='flex flex-wrap gap-3 md:justify-center md:block md:w-[200px]'>
        {rankinData.map(item => (
          <div key={item.id} className='flex items-center py-2'>
            <div className='flex items-center gap-3'>
              <NoPhoto size='avatar' />
              <h2 className='hidden md:block w-20 overflow-hidden text-nowrap text-ellipsis'>
                同學{item.id}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <h2 className='mt-3 text-red-600'>還在等什麼? 每天在過年?</h2>
    </div>
  )
}

const MobileCardList = () => {
  return (
    <div className='flex flex-col gap-3'>
      {data.map(teacher => <TeacherCard id={teacher.id} key={teacher.id} />)}
    </div>
  )
}
