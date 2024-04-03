'use client'

//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input, Select, Form, Button, Radio, Upload, notification } from 'antd'

//
import NoPhoto from '@/components/NoPhoto'
import { getStudentPersonalData, postToBeAStudents, putToBeAStudents } from '@/apis/apis'

//
import iconCamera from '@/assets/icon-camera.svg'

//
export default function EditTeacher({ params }) {
  const studentId = params.student_id
  const router = useRouter()
  const [form] = Form.useForm()
  const [studentPersonalData, setStudentPersonalData] = useState([])
  const [fileList, setFileList] = useState([])
  const [imageURL, setImageURL] = useState(null)

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
    formData.append('name', e.studentName)
    formData.append('introduction', e.about)
    formData.append('avatar', imgFile)

    try {
      const res = await putToBeAStudents({
        id: studentId,
        data: formData
      })
      notification.success({
        message: '修改資料成功!',
        duration: 1
      })
      router.push(`/student/${studentId}/studentPersonal`)
    } catch (error) {
    }
  }
  // const BASEURL = 'http://10.0.0.136:3000'
  const BASEURL = 'https://tutor-online.zeabur.app'

  useEffect(() => {
    const fetchStudentPersonalData = async () => {
      try {
        const res = await getStudentPersonalData({ id: studentId })
        setStudentPersonalData(res.data.data)
        form.setFieldsValue({ upload: res.data.data?.avatar })
        setImageURL(res.data.data?.avatar)
        if (res.data.data.name) form.setFieldsValue({ studentName: res.data.data.name })
        if (res.data.data.introduction) form.setFieldsValue({ about: res.data.data.introduction })
      } catch (error) {
        console.error('學生個人資料', error)
      }
    }

    fetchStudentPersonalData()
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
              ? < NoPhoto size='big' photo={imageURL} />
              : <div className='relative'>
                <NoPhoto size='big' />
                <Image src={iconCamera} alt='camera' className='absolute bottom-2 right-2' />
              </div>
            }
          </Upload>
        </Form.Item>
        <Form.Item
          name='studentName'
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
              onClick={() => router.push(`/student/${studentId}/studentPersonal`)}
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
