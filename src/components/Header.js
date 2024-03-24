'use client'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { mainContext } from '@/context/mainContext'
import { Drawer, notification } from 'antd'

//
import iconLogo from '@/assets/icon-logo.svg'
import iconSignOut from '@/assets/icon-sign-out.svg'
import iconBurger from '@/assets/icon-burger.svg'
import iconClose from '@/assets/icon-close.svg'

//
const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // const [memberInfo, setMemberInfo] = useState(null)
  const memberInfo = JSON.parse(typeof window !== 'undefined' && window?.localStorage?.getItem('USER'))
  // console.log('抓一下資料', memberInfo)

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const toBeAteacherBtn = () => {
    if (memberInfo && !memberInfo?.isAdmin) {
      return (
        <>
          {memberInfo?.studentId
            ? <div>
              <Link href={`/student/${memberInfo?.studentId}/studentPersonal`}>
                我是學生
              </Link>
            </div>
            : <div>
              <Link href='/student/apply'>
                成為學生
              </Link>
            </div>
          }
          {memberInfo?.teacherId
            ? <div>
              <Link href={`/teacher/${memberInfo?.teacherId}/teacherPersonal`}>
                我是老師
              </Link>
            </div>
            : <div>
              <Link href='/teacher/apply'>
                成為老師
              </Link>
            </div>
          }
        </>
      )
    }
  }

  return (
    <div className="bg-neutral-200 h-[80px] px-3 py-[10px] flex item-center justify-between">
      <div className='flex item-center gap-3'>
        <Image src={iconLogo} alt='logo' height={50} className='cursor-pointer'
          onClick={() => {
            if (!typeof window !== 'undefined' && !window?.localStorage?.getItem('TOKEN')) return
            router.push('/home')
          }}
        />
        <div className='items-center gap-3 hidden lg:flex'>
          {toBeAteacherBtn()}
        </div>
      </div>
      {
        typeof window !== 'undefined' && window?.localStorage?.getItem('TOKEN') &&
        <div
          className=' items-center gap-1 cursor-pointer hover:text-[#fff] hidden lg:flex'
          onClick={() => {
            router.push('/signin')
            typeof window !== 'undefined' && window?.localStorage?.clear()
            notification.success({
              message: '登出',
              duration: 1
            })
          }}
        >
          <div>登出</div>
        </div>
      }
      {
        typeof window !== 'undefined' && window?.localStorage?.getItem('TOKEN') &&
        <div className='flex lg:hidden cursor-pointer' onClick={showDrawer}>
          <Image src={iconBurger} alt='burger' />
        </div>
      }
      <Drawer
        placement='left'
        onClose={onClose}
        open={open}
        width='100vw'
        style={{ background: '#DDD' }}
        closable={false}
      >
        <div>
          <div className='flex justify-end items-center h-[70px]'>
            <Image src={iconClose} alt='close' className='cursor-pointer' onClick={onClose} />
          </div>
          <ul
            className='w-full h-full text-[#fff] text-[40px] flex flex-col justify-center items-center gap-[30px]'
          >
            <li
              className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
              onClick={() => {
                onClose()
                router.push('/home')
              }}
            >
              <span>首頁</span>
            </li>
            {memberInfo?.studentId
              ? <li
                className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
                onClick={() => {
                  onClose()
                  router.push(`/student/${memberInfo?.studentId}/studentPersonal`)
                }}
              >
                我是學生
              </li>
              : <li
                className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
                onClick={() => {
                  onClose()
                  router.push('/student/apply')
                }}
              >
                成為學生
              </li>
            }
            {memberInfo?.teacherId
              ? <li
                className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
                onClick={() => {
                  onClose()
                  router.push(`/teacher/${memberInfo?.teacherId}/teacherPersonal`)
                }}
              >
                我是老師
              </li>
              : <li
                className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
                onClick={() => {
                  onClose()
                  router.push('/teacher/apply')
                }}
              >
                成為老師
              </li>
            }
            <li
              className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
              onClick={() => {
                onClose()
                router.push('/signin')
                typeof window !== 'undefined' && window?.localStorage?.clear()
                notification.success({
                  message: '登出',
                  duration: 1
                })
              }}
            >
              <span>登出</span>
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  )
}

export default Header
