'use client'

//
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input, Select, Form, Button, Radio, Upload, notification } from 'antd'

//
import NoPhoto from '@/components/NoPhoto'
import { postToBeAStudents } from '@/apis/apis'

//
import iconCamera from '@/assets/icon-camera.svg'

//
export default function StudentApply() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [imageURL, setImageURL] = useState(null)

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1]
      if (latestFile.originFileObj) {
        const fileURL = URL.createObjectURL(latestFile.originFileObj)
        setImageURL(fileURL)
      }
    } else {
      setImageURL(null)
    }
  }

  const handleApplyStudent = async (e) => {
    const imgFile = e.upload[0].originFileObj
    const formData = new FormData()
    formData.append('name', e.studentName)
    formData.append('introduction', e.about)
    formData.append('avatar', imgFile)

    try {
      const res = await postToBeAStudents({
        data: formData
      })
      notification.success({
        message: '申請成功，請重新登入!',
        duration: 1
      })
      typeof window !== 'undefined' && window?.localStorage?.setItem('USER', JSON.stringify(res.data.data.user))
      router.push('/home')
    } catch (error) {
      notification.error({
        message: '申請成為學生失敗!',
        duration: 1
      })
    }
  }

  return (
    <div className='w-full'>
      <Form
        className="flex flex-col items-center gap-2"
        layout='vertical'
        colon={false}
        requiredMark={false}
        onFinish={handleApplyStudent}
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
              ? <div className='p-3 bg-[#ccc]'>
                <Image src={imageURL} alt='upload' width={200} height={200} />
              </div>
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
        </div>
      </Form>
    </div>
  )
}
