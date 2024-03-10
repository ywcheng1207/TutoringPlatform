'use client'
//
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Form, notification } from 'antd'

//
import iconMail from '@/assets/icon-mail.svg'
import iconLock from '@/assets/icon-lock.svg'
import iconEyeOpen from '@/assets/icon-eye-open.svg'
import iconEyeClose from '@/assets/icon-eye-close.svg'
import iconGoogle from '@/assets/icon-google.svg'
import { postSignIn, postGoogle } from '@/apis/apis'
import { useGoogleLogin } from '@react-oauth/google'

//
function SignIn() {
  const router = useRouter()
  const [isSignining, setIsSignining] = useState(false)

  const handleSignIn = async (e) => {
    setIsSignining(true)
    try {
      const res = await postSignIn({ email: e.email, password: e.password })
      typeof window !== 'undefined' && window?.localStorage?.setItem('TOKEN', res.data.token)
      notification.success({
        message: '登入成功!',
        duration: 1
      })
      typeof window !== 'undefined' && window?.localStorage?.setItem('USER', JSON.stringify(res.data.user))
      if (res.data.user.isAdmin) return router.push('/admin/dashboard')
      router.push('/home')
      // console.log('登入資料', res)
    } catch (error) {
      notification.success({
        message: '登入失敗，請重新嘗試!',
        duration: 1
      })
    }
    setIsSignining(false)
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log('確定一下', tokenResponse.access_token)
      try {
        const res = await postGoogle({ token: tokenResponse.access_token })
        console.log('Token 已成功傳送到後端', res)
      } catch (error) {
        console.error('傳送 Token 至後端時發生錯誤', error)
      }
    },
    onError: () => console.log('Google 登入失敗')
  })

  useEffect(() => {
    // 客戶端檢查 token，並導向home
    const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null
    if (token) {
      router.replace('/home') // 使用 replace 避免導航歷史中留下記錄
    }
  }, [router])

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center gap-5 max-w-lg">
      <h1 style={{ fontSize: 35, color: '#66BFFF', marginBottom: 30 }}>登入</h1>
      <Form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        onFinish={handleSignIn}
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
        <h6
          className='flex items-center  text-[#66BFFF] text-[18px] font-[700] cursor-pointer'
          onClick={handleGoogleLogin}
        >
          <Image src={iconGoogle} alt='google' width={25} />
          mail登入
        </h6>
        <Link
          href='/signup'
          className='text-[#66BFFF] text-[15px] font-[700] cursor-pointer'
        >
          註冊
        </Link>
        <Button
          block
          loading={isSignining && true}
          style={{ color: '#fff', background: '#66BFFF' }}
          htmlType="submit"
        >
          登入
        </Button>
      </Form>
    </div>
  )
}

export default SignIn
