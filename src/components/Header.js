'use client'
import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { mainContext } from '@/context/mainContext'
import { Drawer } from 'antd'

//
import iconLogo from '@/assets/icon-logo.svg'
import iconSignOut from '@/assets/icon-sign-out.svg'
import iconBurger from '@/assets/icon-burger.svg'
import iconClose from '@/assets/icon-close.svg'


//
const Header = () => {
  const path = usePathname()
  const router = useRouter()
  // const test = useContext(mainContext)
  // console.log(test)
  console.log('目前', path)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className="bg-neutral-200 h-[70px] px-3 flex item-center justify-between">
      <div className='flex item-center gap-3'>
        <Image src={iconLogo} alt='logo' height={50} />
        <div className='items-center gap-3 hidden md:flex'>
          {
            path === '/home' &&
            <>
              <Link
                href='student/1/studentPersonal'
                className='cursor-pointer hover:text-[#fff]'
              >
                某某某
              </Link>
              <Link
                href='teacher/1/teacherEdit'
                className='cursor-pointer hover:text-[#fff]'
              >
                成為老師
              </Link>
            </>
          }
        </div>
      </div>
      {
        path === '/home' &&
        <div
          className=' items-center gap-1 cursor-pointer hover:text-[#fff] hidden md:flex'
          onClick={() => router.push('/signin')}
        >
          {/* <Image src={iconSignOut} alt='sign-out' width={18} height={15} /> */}
          <div>登出</div>
        </div>
      }
      {
        path === '/home' &&
        <div className='flex md:hidden cursor-pointer' onClick={showDrawer}>
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
                router.push('/home')
                onClose()
              }}
            >
              <span>首頁</span>
            </li>
            <li
              className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
              onClick={() => {
                router.push('student/1/studentPersonal')
                onClose()
              }}
            >
              <span>個人資訊</span>
            </li>
            <li
              className='w-full py-5 text-center hover:bg-[#ccc] cursor-pointer'
              onClick={() => {
                router.push('/signin')
                onClose()
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
