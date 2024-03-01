'use client'

//
import { useState } from 'react'
import Image from 'next/image'
import { Input, Select, Form, Button, Radio, Upload } from 'antd'
import { useRouter } from 'next/navigation'

//
import NoPhoto from '@/components/NoPhoto'

//
import iconCamera from '@/assets/icon-camera.svg'

//
export default function EditTeacher({ params }) {
  const studentId = params.student_id

  const router = useRouter()
  const [fileList, setFileList] = useState([])
  const [imageURL, setImageURL] = useState(null)

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (newFileList.length > 0) {
      const latestFile = newFileList[newFileList.length - 1]
      if (latestFile.originFileObj) {
        const fileURL = URL.createObjectURL(latestFile.originFileObj)
        setImageURL(fileURL) // 保存圖片URL以便顯示
        console.log(fileURL) // 輸出查看URL是否正確
      }
    } else {
      setImageURL(null) // 清除圖片URL
    }
  }

  const handleSubmitTeacherInfo = (e) => {
    console.log(e.upload)
  }

  return (
    <div>
      <Form
        className="flex flex-col items-center gap-2"
        layout='vertical'
        colon={false}
        requiredMark={false}
        onFinish={handleSubmitTeacherInfo}
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
              onClick={() => router.push('/home')}
            >
              返回
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
