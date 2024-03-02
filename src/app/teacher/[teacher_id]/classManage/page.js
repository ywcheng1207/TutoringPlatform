'use client'

//
import Image from 'next/image'
import { Button, Select, Modal, Form, Input } from 'antd'
import { useState, useEffect } from 'react'

//
import iconEdit from '@/assets/icon-edit.svg'

const dummyClassesData = [
  {
    id: 1,
    isBooked: 0,
    isCompleted: 0,
    length: 60,
    dateTimeRange: '2024-03-02 19:00-20:00',
    name: '試試看保證不虧',
    link: 'https://tw.yahoo.com/?p=us',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:50:52.000Z',
    updatedAt: '2024-03-01T11:50:52.000Z'
  },
  {
    id: 2,
    isBooked: 0,
    isCompleted: 0,
    length: 30,
    dateTimeRange: '2024-03-02 20:00-20:30',
    name: '試了你就知道會虧',
    link: 'https://www.youtube.com/',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:51:09.000Z',
    updatedAt: '2024-03-01T11:51:09.000Z'
  },
  {
    id: 3,
    isBooked: 0,
    isCompleted: 0,
    length: 30,
    dateTimeRange: '2024-03-02 20:00-20:30',
    name: '沒錢還想上課',
    link: 'https://www.facebook.com/',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:51:09.000Z',
    updatedAt: '2024-03-01T11:51:09.000Z'
  },
  {
    id: 4,
    isBooked: 0,
    isCompleted: 0,
    length: 60,
    dateTimeRange: '2024-03-03 19:00-20:00',
    name: '試試看保證不虧',
    link: 'https://tw.yahoo.com/?p=us',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:50:52.000Z',
    updatedAt: '2024-03-01T11:50:52.000Z'
  },
  {
    id: 5,
    isBooked: 0,
    isCompleted: 0,
    length: 30,
    dateTimeRange: '2024-03-03 20:00-20:30',
    name: '試了你就知道會虧',
    link: 'https://www.youtube.com/',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:51:09.000Z',
    updatedAt: '2024-03-01T11:51:09.000Z'
  },
  {
    id: 6,
    isBooked: 0,
    isCompleted: 0,
    length: 30,
    dateTimeRange: '2024-03-05 20:00-20:30',
    name: '試了你就知道會虧',
    link: 'https://www.youtube.com/',
    studentId: null,
    teacherId: 21,
    categoryId: 1,
    createdAt: '2024-03-01T11:51:09.000Z',
    updatedAt: '2024-03-01T11:51:09.000Z'
  }
]

//
export default function ClassManage({ params }) {
  const teacherId = params.teacher_id
  const [classData, setClassData] = useState([])
  const [fixClassData, setFixClassData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(getNextTwoWeeksDates()[0])
  const currentClassData = extractDateTimeRangesCurrentData(fixClassData)
  const timeSelection = formatTimeSelection(currentTime)
  const finalSelection = findUniqueTimeSelection(currentClassData, timeSelection)

  const handleSelectTime = (e) => {
    setCurrentTime(e)
  }

  const handleEditClass = (e, type) => {
    if (type === 'edit') {
      // console.log('編個輯', e)
      setClassData(pre => pre.map(ele => {
        if (ele.id === e.id) {
          return {
            ...ele,
            name: e.name,
            dateTimeRange: e.dateTimeRange,
            link: e.link,
            categoryId: e.categoryId
          }
        }
        return ele
      }))
    }
    if (type === 'create') {
      setClassData([...classData, { ...e, id: generateRandomString() }])
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setFixClassData(dummyClassesData)
    setClassData(dummyClassesData.filter(ele => ele.dateTimeRange.split(' ')[0] === currentTime))
    setIsLoading(false)
  }, [currentTime])

  const content = () => {
    if (isLoading) {
      return (
        <div>載入中...</div>
      )
    }
    if (classData.length > 0 && !isLoading) {
      return (
        <div className='flex flex-col gap-3' >
          {classData.map(ele =>
            <ClassCard
              key={ele.id}
              info={ele}
              onEdit={handleEditClass}
              finalSelection={finalSelection}
              currentClassData={currentClassData}
            />)
          }
        </div >
      )
    }
    return <div>沒有資料</div>
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className='w-full bg-[#CCC] text-center py-2 rounded-sm'>課程列表</div>
      <h6>請選擇要編輯的日期</h6>
      <Select onChange={handleSelectTime} placeholder='日期' defaultValue={currentTime}>
        {getNextTwoWeeksDates().map(ele => <Select.Option value={ele} key={ele}>
          <div className='flex gap-2'>
            <div>
              {ele}
            </div>
            {
              extractDatesFromClassData(fixClassData).includes(ele) &&
              <div className='text-green-500'>&#10003;</div>
            }
          </div>
        </Select.Option>)}
      </Select>
      <EditBtn type='create' onEdit={handleEditClass} finalSelection={finalSelection} currentClassData={currentClassData} />
      {content()}
    </div>
  )
}

const ClassCard = ({ info, onEdit, finalSelection, currentClassData }) => {
  return (
    <div
      className='w-full min-h-[150px] border-[1px] border-solid border-[#CCC] rounded-[3px] p-3 flex flex-col gap-2'
    >
      <div className='flex'>
        <h1>課程名稱：</h1>
        <h1>{info.name}</h1>
      </div>
      <div className='flex'>
        <h1>課程分類：</h1>
        <h1>{info.categoryId}</h1>
      </div>
      <div className='flex'>
        <h1>上課時間：</h1>
        <h1>{info.dateTimeRange}</h1>
      </div>
      <div className='flex'>
        <h1>上課時長：</h1>
        <h1>{info.length}</h1>
      </div>
      <div className='flex'>
        <a href={info.link} target='_blank' className='text-[#66BFFF] hover:opacity-70'>課程連結</a>
      </div>
      <div className='flex justify-end'>
        <EditBtn type='edit' info={info} onEdit={onEdit} finalSelection={finalSelection} currentClassData={currentClassData} />
      </div>
    </div>
  )
}

const EditBtn = ({ type, info, onEdit, finalSelection, currentClassData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(!isModalOpen)
    form.resetFields()
  }

  const handleModalSubmit = (e) => {
    showModal()
    onEdit?.(type === 'edit' ? { ...e, id: info.id } : e, type)
  }

  return (
    <div>
      <div onClick={showModal} className='cursor-pointer'>
        {type === 'edit' && <Image src={iconEdit} alt='edit' />}
        {type === 'create' && <Button block style={{ color: '#fff', background: '#66BFFF' }}>新增課程</Button>}
      </div>
      <Modal
        title={'編輯課程'}
        open={isModalOpen}
        onCancel={showModal}
        footer={[]}
      >
        <Form
          form={form}
          layout='vertical'
          colon={false}
          requiredMark={false}
          onFinish={handleModalSubmit}
          initialValues={{
            name: info?.name || null,
            categoryId: info?.categoryId || null,
            dateTimeRange: info?.dateTimeRange || null,
            link: info?.link || null
          }}
        >
          <Form.Item
            name="name"
            label='課程名稱'
            rules={[
              {
                required: true,
                message: '請輸入課程名稱'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label='課程分類'
            rules={[
              {
                required: true,
                message: '請輸入課程分類'
              }
            ]}
          >
            <Select>
              <Select.Option value='1'>1</Select.Option>
              <Select.Option value='2'>2</Select.Option>
              <Select.Option value='3'>3</Select.Option>
              <Select.Option value='4'>4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateTimeRange"
            label='上課時間'
            rules={[
              {
                required: true,
                message: '請選擇上課時間'
              },
              { validator: createValidator(currentClassData) }
            ]}
          >
            <Select placeholder='請選擇上課時間'>
              {
                finalSelection?.map(ele =>
                  <Select.Option value={ele} key={ele}>
                    {ele}
                  </Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="link"
            label='課程連結'
            rules={[
              {
                required: true,
                message: '請輸入課程連結'
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
    </div >
  )
}

function getNextTwoWeeksDates() {
  const result = []
  const currentDate = new Date() // 獲取當前日期

  for (let i = 0; i < 14; i++) { // 從現在起的14天
    const futureDate = new Date(currentDate)
    futureDate.setDate(currentDate.getDate() + i) // 為當前日期加上i天
    const formattedDate = futureDate.toISOString().split('T')[0].replace(/-/g, '-') // 格式化日期
    result.push(formattedDate)
  }

  return result
}

function extractDatesFromClassData(classData) {
  // 使用 Set 確保日期不重複
  const dateSet = new Set()

  // 遍歷每個課程資料
  classData.forEach(item => {
    // 從 dateTimeRange 欄位擷取日期部分 (前10個字符)
    const date = item.dateTimeRange.substring(0, 10)
    // 將日期加入到 Set 中
    dateSet.add(date)
  })

  // 將 Set 轉換為陣列並返回
  return Array.from(dateSet)
}

function generateRandomString() {
  // 定義可能的字符集合
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length

  // 產生指定長度的亂數字符串
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

function extractDateTimeRangesCurrentData(data) {
  return data.map(item => item.dateTimeRange)
}

function findUniqueTimeSelection(arrayA, arrayB) {
  const filteredArrayB = arrayB.filter(item => !arrayA.includes(item))
  return filteredArrayB
}
/// =================================================
function parseDateTimeRange(dateTimeRange) {
  const [datePart, timePart] = dateTimeRange.split(' ')
  const [startTime, endTime] = timePart.split('-')
  const startDate = new Date(`${datePart} ${startTime}`)
  const endDate = new Date(`${datePart} ${endTime}`)
  return [startDate, endDate]
}

function isOverlapping(interval1, interval2) {
  const [start1, end1] = parseDateTimeRange(interval1)
  const [start2, end2] = parseDateTimeRange(interval2)

  // 使用 <= 比較 end1 和 start2 來修正邊界條件的處理
  if (end1 <= start2 || start1 >= end2) {
    return false
  }
  return interval1 // 回傳符合條件的時間區間資料
}

// 假設這是您的10筆時間區間
// const intervals1 = [
//   '2024/02/26 18:00-18:30',
//   '2024/02/26 19:00-19:30',
//   '2024/02/26 21:00-21:30'
//   // 添加其他8筆時間區間
// ]

// 您要比對的時間區間
// const interval2 = '2024/02/26 18:00-19:00'

// 逐一比對
// const overlappingResults = intervals1.map(interval1 => isOverlapping(interval1, interval2))

// console.log('測試區', overlappingResults)

const defaultTimeSelection30 = [
  '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00',
  '20:00-20:30', '20:30-21:00'
]

const defaultTimeSelection60 = [
  '18:00-19:00', '19:00-20:00', '20:00-21:00'
]

const formatTimeSelection = (date) => {
  const data1 = defaultTimeSelection30.map(ele => `${date} ${ele}`)
  const data2 = defaultTimeSelection60.map(ele => `${date} ${ele}`)
  return [...data1, ...data2]
}

const createValidator = (intervals1) => {
  return (_, value) => {
    const overlappingResults = intervals1
      .map(interval1 => isOverlapping(interval1, value))
      .filter(result => result !== false)
    if (overlappingResults.length > 0) {
      return Promise.reject(new Error(`時段重複(如欲設定該時段請先刪除重複的時程)：${overlappingResults.join('　|　')}`))
    }
    return Promise.resolve()
  }
}
