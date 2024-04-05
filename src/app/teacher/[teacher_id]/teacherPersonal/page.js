'use client'
//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input, Skeleton } from 'antd'

//
import NoPhoto from '@/components/NoPhoto'
import {
  getTeacherPageData,
  getTeacherClassesData,
  getTeacherCommentData
} from '@/apis/apis'

//
import iconHeart from '@/assets/icon-heart.svg'
import iconPersonalInfo from '@/assets/icon-personal-info.svg'
import iconFlag from '@/assets/icon-flag.svg'
import iconChair from '@/assets/icon-chair.svg'
import iconSpeak from '@/assets/icon-speak.svg'

//
export default function StudentPersonal({ params }) {
  const teacherId = params.teacher_id
  const router = useRouter()
  const [teacherPersonalData, setTeacherPersonalData] = useState([])
  const [classesOpenedInTwoWeeks, setClassesOpenedInTwoWeeks] = useState([])
  const [teacherCommentData, setTeacherCommentData] = useState([])
  const [imgLink, setImgLInk] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const classType2 = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']

  useEffect(() => {
    const fetchTeacherPersonalData = async () => {
      try {
        const res = await getTeacherPageData({ id: teacherId })
        setTeacherPersonalData(res.data.data)
        setImgLInk(res.data.data?.avatar)
      } catch (error) {
        console.error('老師個人資料', error)
      }
    }
    const fetchTeacherClassesDataData = async () => {
      try {
        const res = await getTeacherClassesData({ id: teacherId })
        setClassesOpenedInTwoWeeks(res?.data?.data?.filter(ele => ele.isCompleted !== 1))
      } catch (error) {
        console.error('老師開課資訊', error)
      }
    }
    const fetchTeacherCommentsData = async () => {
      try {
        const res = await getTeacherCommentData({ id: teacherId })
        setTeacherCommentData(res.data.data)
      } catch (error) {
        console.error('老師得到的評論', error)
      }
      setIsLoading(false)
    }
    fetchTeacherPersonalData()
    fetchTeacherClassesDataData()
    fetchTeacherCommentsData()
  }, [])


  const noData = () => {
    if (typeof classesOpenedInTwoWeeks === 'string') {
      return true
    } else if (classesOpenedInTwoWeeks.length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {!isLoading &&
        <div className="w-full h-full flex flex-col gap-3 md:flex-row">
          {/* 基礎資訊 */}
          <div className=' flex flex-col gap-3 md:w-4/12'>
            <div className='w-full flex justify-center'>
              <NoPhoto size='big' photo={imgLink} />
            </div>
            <div className='w-full flex flex-col gap-2'>
              <div className='text-center md:text-start text-2xl font-bold py-5'>{teacherPersonalData.name}</div>
              <div className='text-center md:text-start text-xl py-2'>{teacherPersonalData.country}</div>
              <div className='flex justify-center md:justify-start gap-10 py-2'>
                <Image src={iconHeart} alt='like' width={20} height={20} />
                <h3>{teacherPersonalData.ScoreAvg || <span className='text-[#ddd] text-sm'>{'尚未有學生評分'}</span>}</h3>
              </div>
              <div className='text-xl font-medium'>專業</div>
              <div className='py-5 md:pl-5'>
                <div className='grid grid-cols-2 gap-2'>
                  {teacherPersonalData.categoryId?.map(ele => <ClassesTypeTag key={ele} text={classType2[ele]} />)}
                </div>
              </div>
              <AboutMe content={teacherPersonalData.introduction} />
              <div className='w-full md:hidden'>
                <TeachingStyle content={teacherPersonalData.style} />
              </div>
            </div>
            <div className='w-full md:hidden'>
              <ButtonGroup teacherId={teacherId} />
            </div>
          </div>

          {/* 主要資訊 */}
          <div className='md:w-8/12 h-full flex flex-col items-start gap-5'>
            <div className='w-full min-h-[180px] flex flex-col gap-3'>
              <div className='text-xl flex items-center gap-2'>
                <Image src={iconFlag} width={25} height={25} alt='flagIcon' />
                一週內最新行程
              </div>
              <div className='max-h-[210px] overflow-y-scroll flex flex-col gap-3 md:pl-5'>
                {
                  !noData() && classesOpenedInTwoWeeks.map(ele =>
                    <div className='min-h-[90px] w-full border border-solid border-[#DDD] flex justify-between p-3' key={ele.id}>
                      <div className='flex flex-col gap-2'>
                        <h3>課程：{ele.name}</h3>
                        <h3>日期：{ele.dateTimeRange}</h3>
                        <Link href={`/class/${ele.id}`} className='text-[#66BFFF] hover:opacity-70'>課程連結</Link>
                      </div>
                    </div>
                  )
                }
                {
                  noData() &&
                  <div className='h-[100px] w-full flex justify-center items-center text-gray-300 text-2xl'>
                    Oops...目前沒有安排行程
                  </div>
                }
              </div>
            </div>
            <div className='w-full min-h-[180px] hidden md:block'>
              <TeachingStyle content={teacherPersonalData.style} />
            </div>
            <div className='w-full min-h-[180px] flex flex-col gap-3'>
              <div className='text-xl flex flex-center gap-2'>
                <Image src={iconSpeak} width={25} height={25} alt='iconSpeak' />
                近期評論
              </div>
              <div className='max-h-[210px] overflow-y-scroll flex flex-col gap-3 md:pl-5'>
                {
                  typeof teacherCommentData !== 'string' && teacherCommentData.map(ele =>
                    <div key={ele.id} className='h-[90px] w-full border border-solid border-[#DDD] flex flex-col gap-2 p-3'>
                      <h1>學生{ele.studentId}</h1>
                      <h1>評分：{ele.score}</h1>
                      <h1>評論：{ele.text}</h1>
                    </div>
                  )
                }
                {
                  typeof teacherCommentData === 'string' &&
                  <div className='h-[100px] w-full flex justify-center items-center text-gray-300 text-2xl'>
                    Oops...目前還沒收到學生的評論
                  </div>
                }
              </div>
            </div>
            <div className='w-full hidden md:block'>
              <ButtonGroup teacherId={teacherId} />
            </div>
          </div>
        </div>
      }
      {isLoading &&
        <>
          <div className='w-full flex flex-col items-center gap-10 md:hidden'>
            <Skeleton.Avatar
              size={100}
              shape="square"
              active
              style={{ width: '150px', height: '150px' }}
            />
            <Skeleton active paragraph={{ rows: 2 }} style={{ width: '80%' }} />
            <Skeleton active paragraph={{ rows: 2 }} style={{ width: '80%' }} />
            <Skeleton active paragraph={{ rows: 2 }} style={{ width: '80%' }} />
          </div>
          <div className='hidden md:flex w-full gap-5'>
            <div className='flex flex-col justify-between h-[500px] w-4/12'>
              <Skeleton.Avatar
                size={100}
                shape="square"
                active
                style={{ width: '200px', height: '200px' }}
              />
              <Skeleton active paragraph={{ rows: 5 }} />
            </div>
            <div className='flex flex-col gap-20 h-[500px] w-8/12'>
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        </>
      }
    </>
  )
}

const AboutMe = ({ content }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-xl'>關於我</div>
      <div className='md:pl-5'>{content}</div>
    </div>
  )
}

const TeachingStyle = ({ content }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-xl flex items-center gap-2'>
        <Image src={iconChair} width={25} height={25} alt='iconChair' />
        教學風格
      </div>
      <div className='md:pl-5'>{content}</div>
    </div>
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

const ButtonGroup = ({ teacherId }) => {
  const router = useRouter()
  return (
    <div className='w-full flex flex-col justify-between md:flex-row gap-3'>
      <div className='w-full md:max-w-[300px]'>
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => router.push(`/teacher/${teacherId}/teacherEdit`)}
          icon={<Image src={iconPersonalInfo} width={20} height={20} alt='edit' />}
        >
          編輯個人資訊
        </Button>
      </div>
      <div className='w-full md:max-w-[300px]'>
        <Button
          block
          style={{ color: '#66BFFF', width: '100%' }}
          onClick={() => router.push(`/teacher/${teacherId}/classManage`)}
        >
          編輯我的課程
        </Button>
      </div>
    </div>
  )
}
