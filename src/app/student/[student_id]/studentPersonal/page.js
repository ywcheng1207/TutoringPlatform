'use client'
//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input, Popconfirm, notification } from 'antd'

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
export default function StudentPersonal({ params }) {
  const studentId = params.student_id
  const router = useRouter()
  const [studentPersonalData, setStudentPersonalData] = useState([])
  const [studentClassesBookedData, setStudentClassesBookedData] = useState([])
  const [imgLink, setImgLInk] = useState('')
  const [classesComplete, setClassesComplete] = useState([])

  const fetchStudentClassesBookedData = async () => {
    try {
      const res = await getStudentClassesBookedData({ id: studentId })
      // console.log('學生預訂的課程', res.data.data)
      setStudentClassesBookedData(res.data.data)
    } catch (error) {
      console.error('學生預訂的課程', error)
    }
  }
  useEffect(() => {
    const fetchStudentPersonalData = async () => {
      try {
        const res = await getStudentPersonalData({ id: studentId })
        // console.log('學生個人資料', res.data.data)
        setStudentPersonalData(res.data.data)
        // 照片處理資料
        if (!isCompleteUrl(res.data.data?.avatar)) {
          setImgLInk(`${BASEURL}${res.data.data?.avatar}`)
        } else {
          setImgLInk(res.data.data?.avatar)
        }
      } catch (error) {
        console.error('學生個人資料', error)
      }
    }
    const fetchStudentClassesCompleteData = async () => {
      try {
        const res = await getAllStudentCompletedClassesData({ id: studentId })
        console.log('學生完成的課程', res)
        setClassesComplete(res.data.data)
      } catch (error) {
        console.error('學生完成的課程', error)
      }
    }
    fetchStudentPersonalData()
    fetchStudentClassesBookedData()
    fetchStudentClassesCompleteData()
  }, [])
  // const BASEURL = 'http://10.0.0.136:3000'
  const BASEURL = 'https://tutor-online.zeabur.app'
  // console.log('照片連結', `${BASEURL}${studentPersonalData?.avatar}`)

  return (
    <div className="w-full h-full flex flex-col gap-3 md:flex-row">
      <div className=' flex flex-col items-start gap-3 md:w-4/12'>
        <div className='w-full flex justify-center md:justify-start'>
          <NoPhoto size='big' photo={imgLink} />
          {/* <NoPhoto size='big' photo={studentPersonalData?.avatar} /> */}
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='text-center md:text-start text-2xl py-5'>{studentPersonalData.name}</div>
          <AboutMe introduction={studentPersonalData.introduction} />
        </div>
        <div className='w-full flex justify-center md:justify-start'>
          <div className='w-full max-w-[300px] md:max-w-[150px]'>
            <Button
              block
              style={{ color: '#fff', background: '#66BFFF', width: '100%' }}
              onClick={() => router.push(`/student/${studentId}/studentEdit`)}
            >
              編輯個人資訊
            </Button>
          </div>
        </div>
      </div>
      <div className='w-full md:w-8/12 h-full flex flex-col items-start gap-5 '>
        <div className='w-full flex flex-col gap-3'>
          <div className='w-full'>進行中的課程</div>
          <ClassesYouBooked classes={studentClassesBookedData} fetchStudentClassesBookedData={fetchStudentClassesBookedData} />
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div>學習歷程</div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
            {classesComplete.map(ele =>
              <LearningHistoryCard
                data={ele}
                teacher='老師01'
                key={ele.dateTimeRange}
              />)}
          </div>
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div>我的學習時數名次</div>
          <div className='flex flex-col gap-3 md:pl-5'>
            <div className='h-[70px] w-full border border-solid border-[#DDD] flex flex-col justify-center'>
              <div>學習時數: {studentPersonalData.totalLearningTime || '尚未開始學習'}</div>
              <div>名次: {studentPersonalData.rank || '尚未開始學習'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AboutMe = ({ introduction }) => {
  return (
    <>
      <div>關於我</div>
      <div className='md:pl-5'>{introduction}</div>
    </>
  )
}

const ClassesYouBooked = ({ classes, fetchStudentClassesBookedData }) => {
  const [canceling, setCanceling] = useState(false)

  const handleDeleteBookedClasses = async (id) => {
    console.log('取消這堂課', id)
    setCanceling(true)
    try {
      const res = await patchStudentClassesBookedData({ id })
      fetchStudentClassesBookedData()
      console.log(res)
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
    if (classes) {
      // console.log('取得預約中的課程', classes)
      return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
          {
            classes.map(ele =>
              <div className='min-h-[70px] w-full border border-solid border-[#DDD] flex justify-between p-3' key={ele.id}>
                <div className='flex flex-col gap-2'>
                  <h3>課程：{ele.name}</h3>
                  <h3>老師：{ele.Teacher.name}</h3>
                  <h3>日期：{ele.dateTimeRange}</h3>
                  <a href={ele.link} target='_blank' className='text-[#66BFFF]'>上課連結</a>
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
      <div className='h-[50px] w-full flex justify-center items-center text-gray-300 text-2xl'>
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

  const handleModalSubmit = async (e) => {
    try {
      const res = await postComments({ id: data.Teacher.id, text: e.text, score: e.score })
      console.log(res)
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
        <NoPhoto size='avatar2' photo={data.Teacher.avatar} />
      </div>
      <div className='min-h-[70px] w-full border border-solid border-[#DDD] flex justify-between  p-3'>
        <div className='flex flex-col gap-1'>
          <div>課程：{data.name}</div>
          <div>老師：{data.Teacher.name}</div>
          <div>日期：{data.dateTimeRange}</div>
        </div>
        <Button
          style={{ color: '#fff', background: '#66BFFF' }}
          onClick={showModal}
        >
          評分
        </Button>
      </div>
      <Modal
        title={<div className='py-4 text-2xl'>評分這位老師： {data.Teacher.name}</div>}
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
            <Input />
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
