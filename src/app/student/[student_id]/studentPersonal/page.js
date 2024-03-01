'use client'
//
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input } from 'antd'

//
import NoPhoto from '@/components/NoPhoto'

//
export default function StudentPersonal({ params }) {
  const studentId = params.student_id
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div>
        <NoPhoto size='medium' />
      </div>
      <div className='w-full flex flex-col gap-2'>
        <div className='text-center'>學生{studentId}</div>
        <div className='text-center'>非洲</div>
        <div>關於我</div>
        <div className='max-w-[500px] md:pl-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </div>
      </div>
      <div className='w-full max-w-[300px]'>
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF', width: '100%' }}
          onClick={() => router.push(`/student/${studentId}/studentEdit`)}
        >
          編輯個人資訊
        </Button>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <div>進行中的課程</div>
        <div className='flex flex-col gap-3 md:pl-5'>
          <div className='h-[70px] w-full border border-solid border-[#DDD]'>課程1</div>
          <div className='h-[70px] w-full border border-solid border-[#DDD]'>課程2</div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <div>學習歷程</div>
        <div className='flex flex-col gap-3 md:pl-5'>
          <LearningHistoryCard isModalOpen={isModalOpen} showModal={showModal} teacher='老師01' />
          <LearningHistoryCard isModalOpen={isModalOpen} showModal={showModal} teacher='老師02' />
          <LearningHistoryCard isModalOpen={isModalOpen} showModal={showModal} teacher='老師03' />
          <LearningHistoryCard isModalOpen={isModalOpen} showModal={showModal} teacher='老師04' />
        </div>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <div>我的學習時數名次</div>
        <div className='flex flex-col gap-3 md:pl-5'>
          <div className='h-[70px] w-full border border-solid border-[#DDD]'>

          </div>
        </div>
      </div>
    </div>
  )
}

const LearningHistoryCard = ({ teacher, isModalOpen, showModal }) => {
  const handleModalSubmit = (e) => {
    console.log(teacher)
    console.log(e)
  }

  return (
    <div className='flex items-center gap-3'>
      <NoPhoto size='avatar2' />
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
