'use client'

//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Select, Input, Button } from 'antd'

//
import iconHeart from '@/assets/icon-heart.svg'

//
import NoPhoto from '@/components/NoPhoto'
import { getTeacherPageData, getTeacherClassesData } from '@/apis/apis'

//
export default function TeacherPersonal({ params }) {
  const teacherId = params.teacher_id
  const [classFilter, setClassFilter] = useState(0)
  const [classOption, setClassOption] = useState(null)
  const [theTeacherData, setTheTeacherData] = useState([])
  const [classesOpenedInTwoWeeks, setClassesOpenedInTwoWeeks] = useState([])
  const classOptions = classFilter === 0
    ? classesOpenedInTwoWeeks
    : classesOpenedInTwoWeeks.filter(ele => ele.categoryId === classFilter)

  const classType = [
    { key: 0, type: '全部' },
    { key: 1, type: '生活英文' },
    { key: 2, type: '商業英文' },
    { key: 3, type: '旅遊英文' },
    { key: 4, type: '兒童英文' }
  ]
  const classType2 = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']

  const handleClassFilter = (e) => {
    setClassFilter(e)
    setClassOption(null)
  }

  const handleClassOption = (e) => {
    setClassOption(e)
  }

  const handleSendBooking = () => {
    console.log('選哪位老師的課=>老師id:', teacherId)
    console.log('選哪一門課=>該老師的這門課程的id:', classOption)
  }

  useEffect(() => {
    const fetchTeacherPageData = async () => {
      try {
        const res = await getTeacherPageData({ id: teacherId })
        // console.log('學生看老師頁的老師頁資料', res.data.data)
        setTheTeacherData(res.data.data)
      } catch (error) {
        console.error('學生看老師頁的老師資料', error)
      }
    }
    const fetchTeacherClassesDataData = async () => {
      try {
        const res = await getTeacherClassesData({ id: teacherId })
        // console.log('學生看老師頁的老師開課資訊', res.data.data)
        setClassesOpenedInTwoWeeks(res.data.data)
      } catch (error) {
        console.error('學生看老師頁的老師開課資訊', error)
      }
    }
    fetchTeacherPageData()
    fetchTeacherClassesDataData()
  }, [])

  return (
    <div className='flex flex-col gap-3 md:flex-row'>
      <div className='basis-3/5'>
        <div className='flex flex-col items-center gap-3 md:flex-row md:mb-10'>
          <NoPhoto size='big' photo={theTeacherData.avatar} />
          <div className='flex flex-col gap-3 md:gap-10'>
            <div className='flex justify-center md:justify-start'>
              {theTeacherData.name}
            </div>
            <div className='flex'>
              <h3 className='mr-3'>{theTeacherData.country}</h3>
              <Image src={iconHeart} alt='like' />
              <h3 className='text-orange-400'>4.8 (缺老師評分)</h3>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center md:justify-start gap-3 py-6'>
          <div className='flex items-center'>
            <p className='text-green-600'>&#10003;</p>
            <p className=''>生活英文</p>
          </div>
          <div className='flex items-center'>
            <p className='text-green-600'>&#10003;</p>
            <p className=''>旅遊英文</p>
          </div>
          <div className='flex items-center'>
            <p className='text-green-600'>&#10003;</p>
            <p className=''>商業英文</p>
          </div>
          <div className='flex items-center'>
            <p className='text-green-600'>&#10003;</p>
            <p className=''>兒童英文</p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <h1>簡介</h1>
          <h6 className='mb-3'>
            {theTeacherData.introduction}
          </h6>
          <h1>教學風格</h1>
          <h6 className='mb-3'>
            {theTeacherData.style}
          </h6>
          <h1>經歷</h1>
          <h6 className='mb-3 text-orange-400'>
            缺老師經歷
          </h6>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-5'>
        <Select
          placeholder='課程種類'
          value={classFilter}
          style={{ width: '100%' }}
          showSearch={true}
          onChange={handleClassFilter}
        >
          {
            classType.map(ele => <Select.Option value={ele.key} key={ele.key}>{ele.type}</Select.Option>)
          }
        </Select>
        <Select
          placeholder='選擇課程'
          value={classOption}
          style={{ width: '100%' }}
          showSearch={true}
          onChange={handleClassOption}
        >
          {
            classOptions.map(ele => <Select.Option value={ele.id} key={ele.id}>
              {ele.name} {`(${ele.dateTimeRange})`} <span className='bg-[#66BFFF] text-[#FFF] px-2 rounded-lg '>{classType2[ele.categoryId]}</span>
            </Select.Option>)
          }
        </Select>
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF' }}
          onClick={handleSendBooking}
        >
          預約
        </Button>
      </div>
    </div>
  )
}
