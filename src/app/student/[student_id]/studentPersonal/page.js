'use client'
//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input, Popconfirm, notification, Skeleton, Rate } from 'antd'

//
import {
  getStudentPersonalData,
  getStudentClassesBookedData,
  getAllStudentCompletedClassesData,
  patchStudentClassesBookedData,
  postComments
} from '@/apis/apis'

//
import NoPhoto from '@/components/NoPhoto'

//
import iconPersonalInfo from '@/assets/icon-personal-info.svg'
import iconFlag from '@/assets/icon-flag.svg'
import iconCalendar from '@/assets/icon-calendar.svg'
import iconStar from '@/assets/icon-star.svg'

//
export default function StudentPersonal({ params }) {
  const studentId = params.student_id
  const router = useRouter()
  const [studentPersonalData, setStudentPersonalData] = useState([])
  const [studentClassesBookedData, setStudentClassesBookedData] = useState([])
  const [imgLink, setImgLInk] = useState('')
  const [classesComplete, setClassesComplete] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchStudentClassesBookedData = async () => {
    try {
      const res = await getStudentClassesBookedData({ id: studentId })
      setStudentClassesBookedData(res.data.data)
    } catch (error) {
      console.error('學生預訂的課程', error)
    }
  }
  useEffect(() => {
    const fetchStudentPersonalData = async () => {
      try {
        const res = await getStudentPersonalData({ id: studentId })
        setStudentPersonalData(res.data.data)
        if (!res.data.data?.avatar) return
        setImgLInk(res.data.data?.avatar)
      } catch (error) {
        console.error('學生個人資料', error)
      }
    }
    const fetchStudentClassesCompleteData = async () => {
      try {
        const res = await getAllStudentCompletedClassesData({ id: studentId })
        setClassesComplete(res.data.data)
      } catch (error) {
        console.error('學生完成的課程', error)
      }
      setIsLoading(false)
    }
    fetchStudentPersonalData()
    fetchStudentClassesBookedData()
    fetchStudentClassesCompleteData()
  }, [])

  return (
    <>
      {!isLoading &&
        <div className="w-full h-full flex flex-col gap-3 md:flex-row" >
          <div className=' flex flex-col items-start gap-3 md:w-4/12'>
            <div className='w-full flex justify-center'>
              <NoPhoto size='big' photo={imgLink} />
            </div>
            <div className='w-full flex flex-col gap-2 min-h-[180px] py-5'>
              <div className='text-center md:text-start text-2xl font-bold py-5'>{studentPersonalData.name}</div>
              <AboutMe introduction={studentPersonalData.introduction} />
            </div>
            <div className='w-full flex justify-center md:justify-start'>
              <div className='w-full lg:max-w-[150px]'>
                <Button
                  block
                  style={{ color: '#fff', background: '#66BFFF', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => router.push(`/student/${studentId}/studentEdit`)}
                  icon={<Image src={iconPersonalInfo} width={20} height={20} alt='edit' />}
                >
                  編輯個人資訊
                </Button>
              </div>
            </div>
          </div>
          <div className='w-full md:w-8/12 h-full flex flex-col items-start gap-5 '>
            <div className='w-full flex flex-col gap-3 min-h-[180px]'>
              <div className='w-full flex items-center gap-2'>
                <Image src={iconFlag} width={25} height={25} alt='flagIcon' />
                進行中的課程
              </div>
              <ClassesYouBooked classes={studentClassesBookedData} fetchStudentClassesBookedData={fetchStudentClassesBookedData} />
            </div>
            <div className='w-full flex flex-col gap-3 min-h-[180px]'>
              <div className='flex items-center gap-2'>
                <Image src={iconCalendar} width={25} height={25} alt='iconCalendar' />
                學習歷程
              </div>
              {
                typeof classesComplete !== 'string'
                  ? <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
                    {
                      classesComplete.map(ele =>
                        <LearningHistoryCard
                          data={ele}
                          key={ele.dateTimeRange}
                        />)
                    }
                  </div>
                  : <div className='h-[100px] w-full flex justify-center items-center text-gray-300 text-2xl'>
                    Oops...沒有已經完成的課程
                  </div>
              }
            </div>
            <div className='w-full flex flex-col gap-3 min-h-[180px]'>
              <div className=' flex items-center gap-2'>
                <Image src={iconStar} width={25} height={25} alt='iconStar' />
                我的學習時數名次
              </div>
              <div className='flex flex-col gap-3 md:pl-5'>
                <div className='min-h-[70px] w-full flex flex-col justify-center pl-3 gap-2 text-[#ccc]'>
                  <div>學習時數: {studentPersonalData.totalLearningTime || '尚未開始學習'}</div>
                  <div>名次: {studentPersonalData.rank || '尚未開始學習'}</div>
                </div>
              </div>
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

const AboutMe = ({ introduction }) => {
  return (
    <>
      <div className='text-xl'>關於我</div>
      <div className='md:pl-5'>{introduction}</div>
    </>
  )
}

const ClassesYouBooked = ({ classes, fetchStudentClassesBookedData }) => {
  const [canceling, setCanceling] = useState(false)

  const handleDeleteBookedClasses = async (id) => {
    setCanceling(true)
    try {
      const res = await patchStudentClassesBookedData({ id })
      fetchStudentClassesBookedData()
      notification.success({
        message: '課程取消成功!',
        duration: 1
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: '課程取消失敗，請稍後再試一次!',
        duration: 1
      })
    }
    setCanceling(false)
  }

  const classesContent = () => {
    if (classes.length > 0 && typeof classes !== 'string') {
      return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
          {
            classes.map(ele =>
              <div className='min-h-[70px] w-full border border-solid border-[#DDD] flex justify-between p-3' key={ele.id}>
                <div className='flex flex-col gap-2'>
                  <h3>課程：{ele.name}</h3>
                  <h3>老師：{ele.Teacher.name}</h3>
                  <h3>日期：{ele.dateTimeRange}</h3>
                  <Link href={`/class/${ele.id}`} className='text-[#66BFFF] hover:opacity-70'>課程連結</Link>
                </div>
                <Popconfirm
                  title="取消這項課程"
                  description="確定要取消預約的這項課程嗎?"
                  onConfirm={() => handleDeleteBookedClasses(ele.id)}
                  okText="確認"
                  cancelText="取消"
                >
                  <Button loading={canceling} style={{ color: '#fff', background: '#66BFFF' }}>取消課程</Button>
                </Popconfirm>
              </div>
            )
          }
        </div>
      )
    }
    return (
      <div className='h-[100px] w-full flex justify-center items-center text-gray-300 text-2xl'>
        Oops...沒有進行中的課程
      </div>
    )
  }

  return (
    <div>
      {classesContent()}
    </div>
  )
}

const LearningHistoryCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => setIsModalOpen(!isModalOpen)
  const router = useRouter()

  const handleModalSubmit = async (e) => {
    try {
      const res = await postComments({ id: data.teacherId, classId: data.id, text: e.text, score: e.score })
      notification.success({
        message: `感謝您對${data.Teacher.name}老師的評價!`,
        duration: 1
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: '評價送出失敗，請稍後再試一次!',
        duration: 1
      })
    }

    showModal()
  }
  return (
    <div className='flex items-center gap-3 '>
      <div className=''>
        <NoPhoto size='avatar2' photo={data?.Teacher.avatar} />
      </div>
      <div className='min-h-[70px] w-full border border-solid border-[#DDD] flex justify-between  p-3 gap-2'>
        <div className='flex flex-col gap-1'>
          <div>課程：{data?.name}</div>
          <div>老師：{data?.Teacher.name}</div>
          <div>日期：{data?.dateTimeRange}</div>
        </div>
        <div className='flex flex-col gap-3'>
          <Button
            style={{ color: '#fff', background: '#66BFFF' }}
            onClick={showModal}
          >
            {data?.isCommented ? '重新評分' : '評分'}
          </Button>
          <div
            className='text-center text-[#66BFFF] cursor-pointer'
            onClick={() => router.push(`/history/${data.id}`)}
          >歷史紀錄
          </div>
        </div>
      </div>
      <Modal
        title={<div className='py-4 text-2xl'>評分這位老師： {data?.Teacher.name}</div>}
        open={isModalOpen}
        onCancel={showModal}
        footer={[]}
      >
        <Form
          layout='vertical'
          colon={false}
          requiredMark={false}
          onFinish={handleModalSubmit}
          className='flex flex-col items-end gap-3'
        >
          <Form.Item
            name="score"
            label='評分'
            rules={[
              {
                required: true,
                message: '請輸入評分'
              }
            ]}
            className='w-full'
          >
            <Rate allowHalf={true} />
          </Form.Item>
          <Form.Item
            name="text"
            label='評論'
            rules={[
              {
                required: true,
                message: '請輸入評論'
              }
            ]}
            className='w-full'
          >
            <Input.TextArea style={{ resize: 'none' }} showCount maxLength={100} />
          </Form.Item>
          <Button
            style={{ color: '#fff', background: '#66BFFF', width: '70px' }}
            htmlType="submit"
          >
            提交
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

function isCompleteUrl(url) {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  return pattern.test(url)
}
