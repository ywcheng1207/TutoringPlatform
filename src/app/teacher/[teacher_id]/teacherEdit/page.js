'use client'

//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input, Select, Form, Button, Radio, Upload, Checkbox, notification } from 'antd'
import { useRouter } from 'next/navigation'

//
import NoPhoto from '@/components/NoPhoto'
import { putTeacherData, getTeacherPageData } from '@/apis/apis'

//
import iconCamera from '@/assets/icon-camera.svg'
const BASEURL = 'https://tutor-online.zeabur.app'

//
export default function EditTeacher({ params }) {
  const teacherId = params.teacher_id
  const router = useRouter()
  const [teacherPersonalData, setTeacherPersonalData] = useState([])
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [imageURL, setImageURL] = useState(null)
  const [checkedValues, setCheckedValues] = useState([])
  const handleCheckValues = (checkedValues) => {
    setCheckedValues(checkedValues)
  }

  const options = ['生活英文', '旅遊英文', '商業英文', '兒童英文']

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1]
      if (latestFile.originFileObj) {
        const fileURL = URL.createObjectURL(latestFile.originFileObj)
        setImageURL(fileURL) // 保存圖片URL以便顯示
      }
    } else {
      setImageURL(null) // 清除圖片URL
    }
  }

  const handleSubmitTeacherInfo = async (e) => {
    const imgFile = e.upload[0].originFileObj
    const formData = new FormData()
    formData.append('name', e.teacherName)
    formData.append('country', e.teacherCountry)
    formData.append('introduction', e.about)
    formData.append('style', e.teachStyle)
    formData.append('avatar', imgFile)
    formData.append('categoryArray', JSON.stringify(e.teachType.map(option => options.indexOf(option) + 1)))

    try {
      const res = await putTeacherData({
        id: teacherId,
        data: formData
      })
      notification.success({
        message: '編輯老師資料成功!',
        duration: 1
      })
      router.push('/home')
    } catch (error) {
      notification.error({
        message: '編輯老師資料失敗!',
        duration: 1
      })
    }
  }

  useEffect(() => {
    const fetchTeacherPersonalData = async () => {
      try {
        const res = await getTeacherPageData({ id: teacherId })
        setTeacherPersonalData(res.data.data)
        setImageURL(res.data.data?.avatar)
        form.setFieldsValue({ upload: res.data.data.avatar })
        if (res.data.data.name) form.setFieldsValue({ teacherName: res.data.data.name })
        if (res.data.data.country) form.setFieldsValue({ teacherCountry: res.data.data.country })
        if (res.data.data.introduction) form.setFieldsValue({ about: res.data.data.introduction })
        if (res.data.data.style) form.setFieldsValue({ teachStyle: res.data.data.style })
        if (res.data.data.categoryId) {
          form.setFieldsValue({ teachType: res.data.data.categoryId.map(index => options[index]) })
          setCheckedValues(res.data.data.categoryId.map(index => options[index]))
        }
      } catch (error) {
        console.error('老師個人資料', error)
      }
    }
    fetchTeacherPersonalData()
  }, [])

  return (
    <div className='w-full'>
      <Form
        className="flex flex-col items-center gap-2"
        layout='vertical'
        colon={false}
        requiredMark={false}
        onFinish={handleSubmitTeacherInfo}
        form={form}
      >
        <Form.Item
          name="upload"
          getValueFromEvent={({ fileList: newFileList }) => newFileList}
          rules={[
            {
              required: true,
              message: '請上傳照片'
            }
          ]}
        >
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            showUploadList={false}
          >
            {imageURL
              ? <NoPhoto size='big' photo={imageURL} />
              : <div className='relative'>
                <NoPhoto size='big' photo={imageURL} />
                <Image src={iconCamera} alt='camera' className='absolute bottom-2 right-2' />
              </div>
            }
          </Upload>
        </Form.Item>
        <Form.Item
          name='teacherName'
          style={{ width: '100%' }}
          label='姓名'
          rules={[
            {
              required: true,
              message: '請填入姓名'
            }
          ]}
        >
          <Input placeholder='請填入姓名' />
        </Form.Item>
        <Form.Item
          name='teacherCountry'
          style={{ width: '100%' }}
          label='國籍'
          rules={[
            {
              required: true,
              message: '請選擇國籍'
            }
          ]}
        >
          <Select showSearch placeholder='請選擇國籍'>
            <Select.Option value='美國'>美國</Select.Option>
            <Select.Option value='澳洲'>澳洲</Select.Option>
            <Select.Option value='加拿大'>加拿大</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='about'
          style={{ width: '100%' }}
          label='自我介紹'
          rules={[
            {
              required: true,
              message: '請填入自我介紹'
            }
          ]}
        >
          <Input.TextArea
            style={{ width: '100%', height: 150, resize: 'none' }}
            showCount
            maxLength={100}
            placeholder='請填入自我介紹'
          />
        </Form.Item>
        <Form.Item
          name='teachStyle'
          style={{ width: '100%' }}
          label='教學風格'
          rules={[
            {
              required: true,
              message: '請填入教學風格'
            }
          ]}
        >
          <Input.TextArea
            style={{ width: '100%', height: 150, resize: 'none' }}
            showCount
            maxLength={100}
            placeholder='請填入教學風格'
          />
        </Form.Item>
        <div className='w-full'>
          <div className=''>課程種類</div>
          <Form.Item
            name="teachType"
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: '請選擇至少一項課程種類'
              }
            ]}
          >
            <Checkbox.Group options={options} value={checkedValues} onChange={handleCheckValues} />
          </Form.Item>
        </div>
        <div className='flex flex-col justify-between md:flex-row-reverse w-full gap-3'>
          <div className='min-w-[150px]'>
            <Button
              block
              style={{ color: '#fff', background: '#66BFFF' }}
              htmlType="submit"
            >
              提交
            </Button>
          </div>
          <div className='min-w-[150px]'>
            <Button
              block
              style={{ color: '#66BFFF' }}
              onClick={() => router.push(`/teacher/${teacherId}/teacherPersonal`)}
            >
              返回
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

function isCompleteUrl(url) {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  return pattern.test(url)
}
