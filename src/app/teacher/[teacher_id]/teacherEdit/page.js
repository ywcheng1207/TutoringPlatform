'use client'

//
import { Input, Form } from "antd"

//
import NoPhoto from "@/components/NoPhoto"

//
export default function EditTeacher({ params }) {
  const teacherId = params.teacher_id

  const handleSignIn = (e) => {
    console.table(e)
  }

  return (
    <div>
      使用者{teacherId}正在編輯個人的老師資訊
      <Form
        onFinish={handleSignIn}
        className="flex flex-col items-center gap-2"
      >
        <NoPhoto size='big' />
        <div className="relative">
          <Form.Item
            name='teacherName'
            rules={[
              {
                required: true,
                message: '請輸入您的名字'
              }
            ]}
            style={{ width: '100%' }}
          >
            <Input
              placeholder='請輸入您的名字'
              style={{ width: '100%', paddingLeft: 125, height: 30 }}
            />
          </Form.Item>
          <div className="absolute left-[1px] top-[2px] h-[28px] w-[120px] bg-[#CCC] text-[#FFF] flex justify-center items-center text-[18px] rounded-l-[5px]">
            名字
          </div>
        </div>
        <div className="relative">
          <Form.Item
            name='teacherCountry'
            rules={[
              {
                required: true,
                message: '請輸入您的國籍'
              }
            ]}
            style={{ width: '100%' }}
          >
            <Input
              placeholder='請輸入您的國籍'
              style={{ width: '100%', paddingLeft: 125, height: 30 }}
            />
          </Form.Item>
          <div className="absolute left-[1px] top-[2px] h-[28px] w-[120px] bg-[#CCC] text-[#FFF] flex justify-center items-center text-[18px] rounded-l-[5px]">
            國籍
          </div>
        </div>
      </Form>
    </div>
  )
}
