'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Form, notification } from 'antd'

//
import { postSignUp } from '@/apis/apis'

//
import iconMail from '@/assets/icon-mail.svg'
import iconLock from '@/assets/icon-lock.svg'
import iconLockConfirm from '@/assets/icon-lock-confirm.svg'
import iconEyeOpen from '@/assets/icon-eye-open.svg'
import iconEyeClose from '@/assets/icon-eye-close.svg'
import iconGoogle from '@/assets/icon-google.svg'

//
function SignUp() {
  const router = useRouter()

  const handleSignUp = async (e) => {
    // console.table(e)
    try {
      const res = await postSignUp({
        email: e.email,
        password: e.password,
        passwordCheck: e.confirm
      })
      router.push('/home')
      notification.success({
        message: '註冊成功!',
        duration: 1
      })
      // console.log('註冊資訊回傳', res)
    } catch (error) {
      notification.error({
        message: '註冊失敗! 註冊都能失敗，搞笑?',
        duration: 1
      })
      // console.log('錯誤', error)
    }
  }

  useEffect(() => {
    // 客戶端檢查 token，並導向home
    const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null
    if (token) {
      router.replace('/home') // 使用 replace 避免導航歷史中留下記錄
    }
  }, [router])

  return (
    <div className="h-full w-full mx-auto flex flex-col items-center gap-5 max-w-lg">
      <h1 style={{ fontSize: 35, color: '#66BFFF', marginBottom: 30 }}>註冊</h1>
      <Form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        onFinish={handleSignUp}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: '請輸入信箱'
            }
          ]}
          style={{ width: '100%' }}
        >
          <Input
            prefix={<Image src={iconMail} alt='mail' />}
            placeholder='請輸入信箱'
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: '請輸入密碼'
            }
          ]}
          style={{ width: '100%' }}
        >
          <Input.Password
            prefix={<Image src={iconLock} alt='password' />}
            placeholder='請輸入密碼'
            style={{ width: '100%' }}
            iconRender={(visible) => {
              return visible
                ? <Image src={iconEyeOpen} alt='open' style={{ cursor: 'pointer' }} />
                : <Image src={iconEyeClose} alt='open' style={{ cursor: 'pointer' }} />
            }}
          />
        </Form.Item>
        <Form.Item
          name='confirm'
          rules={[
            {
              required: true,
              message: '請確認密碼'
            }
          ]}
          style={{ width: '100%' }}
        >
          <Input.Password
            prefix={<Image src={iconLockConfirm} alt='password' />}
            placeholder='請確認密碼'
            style={{ width: '100%' }}
            iconRender={(visible) => {
              return visible
                ? <Image src={iconEyeOpen} alt='open' style={{ cursor: 'pointer' }} />
                : <Image src={iconEyeClose} alt='open' style={{ cursor: 'pointer' }} />
            }}
          />
        </Form.Item>
        <h6 className='flex items-center  text-[#66BFFF] text-[18px] font-[700] cursor-pointer'>
          <Image src={iconGoogle} alt='google' width={25} />
          mail註冊
        </h6>
        <Link
          href='/signin'
          className='text-[#66BFFF] text-[15px] font-[700] cursor-pointer'
        >
          回到登入
        </Link>
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF' }}
          htmlType="submit"
        >
          註冊
        </Button>
      </Form>
    </div>
  )
}

export default SignUp
