'use client'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { mainContext } from '@/context/mainContext'
import { Drawer, notification, Button, Modal, Input } from 'antd'

//
import iconLogo from '@/assets/icon-logo.svg'
import iconSignOut from '@/assets/icon-sign-out.svg'
import iconBurger from '@/assets/icon-burger.svg'
import iconClose from '@/assets/icon-close.svg'

//
import { postNews } from '@/apis/apis'

//
const Header = () => {
  const path = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendingId, setSendingId] = useState('')
  const [sending, setSending] = useState(false)

  const showModal = () => setIsModalOpen(!isModalOpen)
  const memberInfo = JSON.parse(typeof window !== 'undefined' && window?.localStorage?.getItem('USER'))

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handlePostNews = async () => {
    try {
      setSending(true)
      const res = await postNews({ id: memberInfo.id })
      notification.success({
        message: '發送成功!',
        duration: 1
      })
      setSendingId('')
      showModal()
      onClose()
    } catch (error) {
      notification.error({
        message: '發送失敗，請稍後重新嘗試!',
        duration: 1
      })
    }
    setSending(false)
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
          className='hidden items-center gap-3 lg:flex'
        >
          {
            memberInfo?.isAdmin &&
            <Button
              style={{ background: '#666', color: 'white' }}
              onClick={handlePostNews}
              loading={sending && true}
            >
              發送電子報
            </Button>
          }
          <div
            className='hover:text-[#fff] cursor-pointer'
            onClick={() => {
              router.push('/signin')
              typeof window !== 'undefined' && window?.localStorage?.clear()
              notification.success({
                message: '登出',
                duration: 1
              })
            }}
          >
            登出
          </div>
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
            {memberInfo?.isAdmin === false && <MenuItem />}
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
            {memberInfo?.isAdmin &&
              <li
                className='w-full py-5 text-center cursor-pointer'
                onClick={handlePostNews}
              >
                <span>發送電子報</span>
              </li>
            }
          </ul>
        </div>
      </Drawer>
    </div>
  )
}

export default Header

//
function MenuItem({ memberInfo, onClose, router }) {
  const handleClick = (role, id) => {
    onClose()
    const path = id ? `/${role}/${id}/${role}Personal` : `/${role}/apply`
    router.push(path)
  }

  return (
    <>
      <li
        className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
        onClick={() => {
          onClose()
          router.push('/home')
        }}
      >
        <span>首頁</span>
      </li>
      <li
        className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
        onClick={() => handleClick('student', memberInfo?.studentId)}
      >
        {memberInfo?.studentId ? '我是學生' : '成為學生'}
      </li>
      <li
        className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
        onClick={() => handleClick('teacher', memberInfo?.teacherId)}
      >
        {memberInfo?.teacherId ? '我是老師' : '成為老師'}
      </li>
    </>
  )
}
