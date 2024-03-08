'use client'
//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input } from 'antd'

//
import { getStudentPersonalData, getStudentClassesBookedData } from '@/apis/apis'

//
import NoPhoto from '@/components/NoPhoto'

//
export default function StudentPersonal({ params }) {
  const studentId = params.student_id
  const router = useRouter()
  const [studentPersonalData, setStudentPersonalData] = useState([])
  const [studentClassesBookedData, setStudentClassesBookedData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    const fetchStudentPersonalData = async () => {
      try {
        const res = await getStudentPersonalData({ id: studentId })
        console.log('學生個人資料', res.data.data)
        setStudentPersonalData(res.data.data)
      } catch (error) {
        console.error('學生個人資料', error)
      }
    }
    const fetchStudentClassesBookedData = async () => {
      try {
        const res = await getStudentClassesBookedData({ id: studentId })
        console.log('學生預訂的課程', res)
        // setStudentClassesBookedData(res.data.data)
      } catch (error) {
        console.error('學生預訂的課程', error)
      }
    }

    fetchStudentPersonalData()
    // fetchStudentClassesBookedData()
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-3 md:flex-row">
      <div className=' flex flex-col items-start gap-3 md:w-4/12'>
        <div className='w-full flex justify-center md:justify-start'>
          <NoPhoto size='big' photo={studentPersonalData.avatar} />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='text-center md:text-start text-2xl py-5'>{studentPersonalData.name}</div>
          <span className='text-orange-400'>(還沒命名怎麼有名字?)</span>
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
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
            <div className='h-[70px] w-full border border-solid border-[#DDD] flex justify-between items-center'>
              <h3>課程1</h3>
              <Button style={{ color: '#fff', background: '#66BFFF' }}>取消課程</Button>
            </div>
            <div className='h-[70px] w-full border border-solid border-[#DDD] flex justify-between items-center'>
              <h3>課程2</h3>
              <Button style={{ color: '#fff', background: '#66BFFF' }}>取消課程</Button>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div>學習歷程</div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:pl-5'>
            <LearningHistoryCard teacher='老師01' />
            <LearningHistoryCard teacher='老師02' />
            <LearningHistoryCard teacher='老師03' />
            <LearningHistoryCard teacher='老師04' />
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

const LearningHistoryCard = ({ teacher }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => setIsModalOpen(!isModalOpen)

  const handleModalSubmit = (e) => {
    console.log(teacher)
    console.log(e)
    showModal()
  }

  return (
    <div className='flex items-center gap-3 '>
      <div className=''>
        <NoPhoto size='avatar2' />
      </div>
      <div className='h-[70px] w-full border border-solid border-[#DDD] flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div>課程1</div>
          <div>{teacher}</div>
        </div>
        <Button
          style={{ color: '#fff', background: '#66BFFF' }}
          onClick={showModal}
        >
          評分
        </Button>
      </div>
      <Modal
        title={`評分這位老師:${teacher}`}
        open={isModalOpen}
        onCancel={showModal}
        footer={[]}
      >
        <Form
          layout='vertical'
          colon={false}
          requiredMark={false}
          onFinish={handleModalSubmit}
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
          >
            <Input />
          </Form.Item>
          <Button
            style={{ color: '#fff', background: '#66BFFF' }}
            htmlType="submit"
          >
            提交
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
