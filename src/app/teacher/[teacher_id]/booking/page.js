'use client'

//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Select, Input, Button, notification, Skeleton } from 'antd'

//
import iconHeart from '@/assets/icon-heart.svg'

//
import NoPhoto from '@/components/NoPhoto'
import { getTeacherPageData, getTeacherClassesData, patchTeacherClasses } from '@/apis/apis'

//
export default function TeacherPersonal({ params }) {
  const teacherId = params.teacher_id
  const [classFilter, setClassFilter] = useState(0)
  const [classOption, setClassOption] = useState(null)
  const [theTeacherData, setTheTeacherData] = useState([])
  const [classesOpenedInTwoWeeks, setClassesOpenedInTwoWeeks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let classOptions = ''
  if (typeof classesOpenedInTwoWeeks !== 'string') {
    classOptions = classFilter === 0
      ? classesOpenedInTwoWeeks
      : classesOpenedInTwoWeeks?.filter(ele => ele.categoryId === classFilter)
  }
  // const currentClassesType =
  //   Array.from(new Set(classesOpenedInTwoWeeks.map(item => item.categoryId))).sort((a, b) => a - b)

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
    // console.log(e)
    setClassOption(e)
  }

  const handleSendBooking = async () => {
    try {
      const res = await patchTeacherClasses({ id: teacherId, dateTimeRange: classOption })
      notification.success({
        message: '預約成功!',
        duration: 1
      })
    } catch (error) {
      if (error.response.data.message === 'Error: This class is booked!') {
        return notification.error({
          message: '您已經預約過這項課程!',
          duration: 1
        })
      }
      notification.error({
        message: '預約失敗，請稍後再試一次!',
        duration: 1
      })
    }
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
      setIsLoading(false)
    }
    fetchTeacherPageData()
    fetchTeacherClassesDataData()
  }, [])

  return (
    <>
      {
        !isLoading &&
        <div className='flex flex-col gap-3 md:flex-row'>
          <div className='basis-3/5'>
            <div className='flex flex-col items-center gap-3 md:flex-row md:mb-10'>
              <NoPhoto size='big' photo={theTeacherData.avatar} />
              <div className='flex flex-col gap-3 md:gap-10'>
                <div className='flex justify-center md:justify-start'>
                  {theTeacherData.name}
                </div>
                <div className='flex item-center gap-1'>
                  <h3 className='mr-3'>{theTeacherData.country}</h3>
                  <Image src={iconHeart} alt='like' width={20} />
                  <h3 className=''>{theTeacherData.ScoreAvg}</h3>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center md:justify-start gap-3 py-6'>
              {theTeacherData.categoryId?.map(ele => <ClassesTypeTag key={ele} text={classType2[ele]} />)}
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
              {typeof classOptions !== 'string' &&
                classOptions.map(ele => <Select.Option value={ele.dateTimeRange} key={ele.id}>
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
      }
      {isLoading &&
        <>
          <div className='w-full flex flex-col items-center gap-10 px-10 md:hidden'>
            <Skeleton.Avatar
              size={100}
              shape="square"
              active
              style={{ width: '150px', height: '150px' }}
            />
            <Skeleton active paragraph={{ rows: 2 }} style={{ width: '100%' }} />
            <Skeleton active paragraph={{ rows: 2 }} style={{ width: '100%' }} />
            <div className='w-full'>
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
            </div>
          </div>
          <div className='hidden md:flex w-full gap-5'>
            <div className='flex flex-col justify-between h-[500px] w-8/12'>
              <div className='flex gap-10'>
                <Skeleton.Avatar
                  size={100}
                  shape="square"
                  active
                  style={{ width: '200px', height: '200px' }}
                />
                <Skeleton active paragraph={{ rows: 1 }} />
              </div>
              <Skeleton active paragraph={{ rows: 5 }} />
            </div>
            <div className='flex flex-col h-[500px] w-4/12'>
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
              <Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
            </div>
          </div>
        </>
      }
    </>
  )
}

const ClassesTypeTag = ({ text }) => {
  return (
    <div className='flex items-center'>
      <p className='text-green-600'>&#10003;</p>
      <p className=''>{text}</p>
    </div>
  )
}
