'use client'

//
import { useState, useEffect, useContext } from 'react'
import { mainContext } from '@/context/mainContext'
import Image from 'next/image'
import { Input, Button, notification } from 'antd'

//
import iconExpress from '@/assets/icon-express.svg'
import iconAxios from '@/assets/icon-axios.svg'
// import iconGithub from '@/assets/icon-github.svg'
import iconMysql from '@/assets/icon-mysql.svg'
import iconNextjs from '@/assets/icon-nextjs.svg'
import iconNodejs from '@/assets/icon-nodejs.svg'
import iconSocketio from '@/assets/icon-socketio.svg'
import iconAntd from '@/assets/icon-antd.svg'
import iconFigma from '@/assets/icon-figma.svg'
import iconTailwind from '@/assets/icon-tailwind.svg'

//
import { postSubscribe } from '@/apis/apis'

//
const Footer = () => {
  const [email, setEmail] = useState('')
  const [allowSend, setAllowSend] = useState(false)
  const [sending, setSending] = useState(false)
  const { memberInfo } = useContext(mainContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (emailRegex.test(e.target.value)) {
      setAllowSend(true)
    } else {
      setAllowSend(false)
    }
  }

  const handleEmail = async () => {
    if (allowSend) {
      setSending(true)
      try {
        const res = await postSubscribe({ id: memberInfo.id, email })
        notification.success({
          message: '訂閱成功!',
          duration: 1
        })
      } catch (error) {
        notification.error({
          message: '訂閱失敗，請稍後重新嘗試!',
          duration: 1
        })
      }
      setSending(false)
    }
  }

  return (
    <div className="bg-[#D9D9D9] h-[250px] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center gap-3 md:flex-row">
        <div className='flex flex-col gap-3 w-6/12 md:w-auto'>
          <div className='flex items-center gap-10 min-w-[300px]'>
            <div className='w-3/12 font-medium'>後端</div>
            <div className='w-9/12 flex gap-2'>
              <Image src={iconNodejs} width={20} height={20} alt='iconNodejs' />
              <Image src={iconExpress} width={20} height={20} alt='iconNodejs' />
              <Image src={iconMysql} width={20} height={20} alt='iconMysql' />
              <Image src={iconSocketio} width={20} height={20} alt='iconSocketio' />
            </div>
          </div>
          <div className='flex items-center gap-10 min-w-[300px]'>
            <div className='w-3/12 font-medium'>前端</div>
            <div className='w-9/12 flex gap-2'>
              <Image src={iconNextjs} width={20} height={20} alt='iconNextjs' />
              <Image src={iconTailwind} width={20} height={20} alt='iconTailwind' />
              <Image src={iconAntd} width={20} height={20} alt='iconAntd' />
              <Image src={iconAxios} width={20} height={20} alt='iconAxios' />
              <Image src={iconFigma} width={20} height={20} alt='iconFigma' />
              <Image src={iconSocketio} width={20} height={20} alt='iconSocketio' />
            </div>
          </div>
        </div>
        {
          memberInfo?.isAdmin === false &&
          <div className='flex flex-col gap-3 w-6/12 md:w-auto'>
            <div className='flex flex-col gap-3'>
              <div className='text-xl font-bold'>訂閱電子報</div>
              <div className='flex gap-2'>
                <Input
                  placeholder='您的電子郵件'
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
                <Button
                  loading={sending && true}
                  style={{ background: '#666', color: 'white', opacity: !allowSend && 0.2 }}
                  disabled={!allowSend && true}
                  onClick={() => handleEmail()}
                >
                  送出
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="h-[60px] bg-[#666] text-[#fff] flex justify-center items-center">
        © 2024 All rights reserved
      </div>
    </div>
  )
}

export default Footer
