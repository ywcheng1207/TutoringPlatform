'use client'

//
import Image from 'next/image'
import { Button, Select, Modal, Form, Input, notification, Popconfirm } from 'antd'
import { useState, useEffect, useRef } from 'react'

//
import {
  getTeacherClassesData,
  postClasses,
  putClasses,
  deleteClasses
} from '@/apis/apis'

//
import iconEdit from '@/assets/icon-edit.svg'
import iconArrow from '@/assets/icon-arrow.svg'
import iconRunningMan from '@/assets/icon-running-man.svg'
import iconDelete from '@/assets/icon-delete.svg'

//
export default function ClassManage({ params }) {
  const teacherId = params.teacher_id
  const [classData, setClassData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(getNextTwoWeeksDates()[0])
  // 桌機版tab位置捕捉
  const scrollContainer = useRef(null)
  // 編輯日期的時間選項裡面要標註有課程的項目
  const dateSelection = extractDatesFromClassData(classData)
  // modal內的時間選項
  const currentClassData = extractDateTimeRangesCurrentData(classData)
  const timeSelection = formatTimeSelection(currentTime)
  const finalSelection = findUniqueTimeSelection(currentClassData, timeSelection)

  const handleSelectTime = (e) => {
    setCurrentTime(e)
  }

  const handleDeleteClass = async (id) => {
    try {
      const res = await deleteClasses({ id })
      notification.success({
        message: '刪除課程成功!',
        duration: 1
      })
      setClassData(pre => pre.filter(ele => ele.id !== id))
    } catch (error) {
      notification.error({
        message: '刪除課程失敗!',
        duration: 1
      })
    }
  }

  const handleEditClass = async (e, type) => {
    if (type === 'edit') {
      // console.log('編個輯', e)
      try {
        const res = await putClasses({ id: teacherId, ...e })
        notification.success({
          message: '編輯課程成功!',
          duration: 1
        })
        setClassData(pre => pre.map(ele => {
          if (ele.id === e.id) {
            return {
              ...ele,
              name: e.name,
              dateTimeRange: e.dateTimeRange,
              link: e.link,
              categoryId: e.category
            }
          }
          return ele
        }))
      } catch (error) {
        notification.error({
          message: '編輯課程失敗!',
          duration: 1
        })
      }
    }
    if (type === 'create') {
      try {
        const res = await postClasses({ ...e })
        notification.success({
          message: '新增課程成功!',
          duration: 1
        })
        setClassData([...classData, { ...e, id: generateRandomString() }])
        fetchTeacherClassesDataData()
      } catch (error) {
        notification.error({
          message: '新增課程失敗!',
          duration: 1
        })
      }
    }
  }

  const scrollLeft = () => {
    if (scrollContainer.current) {
      // 向左滾動
      scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainer.current) {
      // 向右滾動
      scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const fetchTeacherClassesDataData = async () => {
    try {
      const res = await getTeacherClassesData({ id: teacherId })
      // console.log('老師開課資訊', res.data.data)
      if (typeof res.data.data !== 'string') {
        setClassData(res.data.data)
      }
    } catch (error) {
      console.error('老師開課資訊', error)
    }
  }

  useEffect(() => {
    fetchTeacherClassesDataData()
    setIsLoading(true)
    setIsLoading(false)
  }, [])

  const content = () => {
    const data = classData.filter(ele => ele.dateTimeRange.split(' ')[0] === currentTime)
    if (isLoading) {
      return (
        <div className='text-7xl text-gray-400 h-full flex justify-center items-center opacity-30'>
          載入中...
        </div>
      )
    }
    if (data.length > 0 && !isLoading) {
      return (
        <div className='flex flex-col gap-3 md:flex-row md:flex-wrap' >
          {data.map(ele =>
            <ClassCard
              key={ele.id}
              info={ele}
              onEdit={handleEditClass}
              onDeleteClass={handleDeleteClass}
              finalSelection={finalSelection}
              currentClassData={currentClassData}
            />)
          }
        </div >
      )
    }
    return (
      <div className='text-7xl text-gray-400 h-full flex justify-center items-center opacity-30'>
        沒有資料...
      </div>
    )
  }

  return (
    <div className='w-full'>
      {/* title */}
      <div className='w-full bg-[#CCC] text-[#fff] text-center py-2 rounded-sm mb-3'>課程列表</div>

      {/* desktop */}
      <div className='hidden md:block'>
        <div className='flex items-center'>
          <div onClick={scrollLeft} className='h-[70px] min-w-[50px] flex justify-center items-center cursor-pointer hover:bg-slate-100'>
            <Image src={iconArrow} alt='arrow' className='rotate-180' />
          </div>
          <div ref={scrollContainer} className='flex overflow-hidden'>
            {getNextTwoWeeksDates().map(ele =>
              <DeskTabCard
                key={ele}
                date={ele}
                currentTime={currentTime}
                onSelectTime={handleSelectTime}
                dateSelection={dateSelection}
              />
            )}
          </div>
          <div onClick={scrollRight} className='h-[70px] min-w-[50px] flex justify-center items-center cursor-pointer hover:bg-slate-100'>
            <Image src={iconArrow} alt='arrow' />
          </div>
        </div>
        <div className='bg-[#CCC] h-full w-full min-h-[500px] rounded-md p-3 flex flex-col justify-between'>
          <div className='h-[400px]' >
            {content()}
          </div>
          <div className='flex justify-end'>
            <EditBtn type='create' onEdit={handleEditClass} finalSelection={finalSelection} currentClassData={currentClassData} />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="w-full h-[500px] flex flex-col gap-3 md:hidden">
        <h6>請選擇要編輯的日期</h6>
        <Select onChange={handleSelectTime} placeholder='日期' value={currentTime}>
          {getNextTwoWeeksDates().map(ele =>
            <Select.Option value={ele} key={ele}>
              <div className='flex gap-2'>
                <div>
                  {ele}
                </div>
                {
                  dateSelection.includes(ele) &&
                  <div className='text-green-500'>&#10003;</div>
                }
              </div>
            </Select.Option>)
          }
        </Select>
        <EditBtn type='create' onEdit={handleEditClass} finalSelection={finalSelection} currentClassData={currentClassData} />
        {content()}
      </div>
    </div>

  )
}

// --------------- children components ---------------
const ClassCard = ({ info, onEdit, onDeleteClass, finalSelection, currentClassData }) => {
  return (
    <div
      className='w-full min-h-[150px] border-[1px] border-solid border-[#CCC] rounded-[3px] p-3 flex flex-col justify-between  gap-2 md:bg-[#FFF] md:max-w-[230px] md:rounded-lg md:text-[15px]'
    >
      <div className='flex flex-col gap-2'>
        <div className='flex md:flex-col'>
          <h1>課程名稱：</h1>
          <h1 className='max-w-[95%] min-h-[20px] overflow-hidden text-wrap text-ellipsis'>{info.name}</h1>
        </div>
        <div className='flex'>
          <h1>課程分類：</h1>
          <h1>{info.categoryId}</h1>
        </div>
        <div className='flex md:flex-col'>
          <h1>上課時間：</h1>
          <h1>{info.dateTimeRange}</h1>
        </div>
        <div className='flex'>
          <h1>上課時長：</h1>
          <h1>{info.length}</h1>
        </div>
        <div className='flex md:flex-col'>
          <a href={info.link} target='_blank' className='text-[#66BFFF] hover:opacity-70'>課程連結</a>
        </div>
      </div>
      <div className='flex justify-between '>
        <Popconfirm
          title="刪除這堂課"
          description="確定要刪除這堂課嗎?"
          onConfirm={() => onDeleteClass(info.id)}
          okText="確認"
          cancelText="取消"
          placement="bottom"
        >
          <Image src={iconDelete} alt='delete' className='cursor-pointer' />
        </Popconfirm>
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
    if (type === 'create') form.resetFields()
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
            category: info?.categoryId || null,
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
            name="category"
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

const DeskTabCard = ({ date, currentTime, onSelectTime, dateSelection }) => {
  return (
    <>
      {date === currentTime
        ? <div
          className='min-w-[160px] h-[80px] bg-[#CCC] text-[#FFF] flex justify-center items-center rounded-tl-md rounded-tr-md relative'
        >
          {date}{dateSelection.includes(date) && <Image src={iconRunningMan} alt='running' className='absolute top-0 right-0' />}
        </div>
        : <div
          className='min-w-[160px] h-[80px] bg-[#fff] flex justify-center items-center cursor-pointer hover:opacity-40 relative'
          onClick={() => onSelectTime(date)}
        >
          {date}{dateSelection.includes(date) && <Image src={iconRunningMan} alt='running' className='absolute top-0 right-0' />}
        </div>
      }
    </>
  )
}

// --------------- functions ---------------

//
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
//
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
//
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
//
function extractDateTimeRangesCurrentData(data) {
  return data.map(item => item.dateTimeRange)
}
//
function findUniqueTimeSelection(arrayA, arrayB) {
  const filteredArrayB = arrayB.filter(item => !arrayA.includes(item))
  return filteredArrayB
}
//
function parseDateTimeRange(dateTimeRange) {
  const [datePart, timePart] = dateTimeRange.split(' ')
  const [startTime, endTime] = timePart.split('-')
  const startDate = new Date(`${datePart} ${startTime}`)
  const endDate = new Date(`${datePart} ${endTime}`)
  return [startDate, endDate]
}
//
function isOverlapping(interval1, interval2) {
  const [start1, end1] = parseDateTimeRange(interval1)
  const [start2, end2] = parseDateTimeRange(interval2)

  // 使用 <= 比較 end1 和 start2 來修正邊界條件的處理
  if (end1 <= start2 || start1 >= end2) {
    return false
  }
  return interval1 // 回傳符合條件的時間區間資料
}
//
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
    if (overlappingResults.includes(value)) return Promise.resolve()
    if (overlappingResults.length > 0) {
      return Promise.reject(new Error(`如欲設定該時段，請先刪除重複的時程：${overlappingResults.join('　|　')}`))
    }
    return Promise.resolve()
  }
}
