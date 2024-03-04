'use client'
//
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Form } from 'antd'

//
import iconMail from '@/assets/icon-mail.svg'
import iconLock from '@/assets/icon-lock.svg'
import iconEyeOpen from '@/assets/icon-eye-open.svg'
import iconEyeClose from '@/assets/icon-eye-close.svg'
import iconGoogle from '@/assets/icon-google.svg'

//
const BASEURL = 'https://tutor-online.zeabur.app'

//
function SignIn() {
  const router = useRouter()
  const [isSignining, setIsSignining] = useState(false)

  const handleSignIn = async (e) => {
    setIsSignining(true)
    try {
      const res = await fetch(`${BASEURL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: e.email, password: e.password })
      })
      // 200-299
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      localStorage.setItem('TOKEN', data.token)
      router.push('/home')
    } catch (error) {
      console.error('登入失敗:', error)
    } finally {
      setIsSignining(false)
    }
  }

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
        <h6 className='flex items-center  text-[#66BFFF] text-[18px] font-[700] cursor-pointer'>
          <Image src={iconGoogle} alt='google' width={25} />
          mail註冊
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
