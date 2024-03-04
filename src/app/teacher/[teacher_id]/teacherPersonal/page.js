'use client'
//
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Modal, Form, Input } from 'antd'

//
import NoPhoto from '@/components/NoPhoto'

//
import iconHeart from '@/assets/icon-heart.svg'

//
export default function StudentPersonal({ params }) {
  const teacherId = params.teacher_id
  const router = useRouter()

  return (
    <div className="w-full h-full flex flex-col gap-3 md:flex-row">
      {/* 基礎資訊 */}
      <div className=' flex flex-col items-start gap-3 md:w-4/12'>
        <div className='w-full flex justify-center md:justify-start'>
          <NoPhoto size='big' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='text-center md:text-start text-2xl py-5'>老師{teacherId}</div>
          <div className='text-center md:text-start py-2'>非洲</div>
          <div className='flex justify-center md:justify-start gap-10 py-2'>
            <Image src={iconHeart} alt='like' />
            <h3>4.8</h3>
          </div>
          <div>課程種類</div>
          <div className='py-2 md:pl-5'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex items-center justify-center'>
                <p className='text-green-600'>&#10003;</p>
                <p className=''>生活英文</p>
              </div>
              <div className='flex items-center justify-center'>
                <p className='text-green-600'>&#10003;</p>
                <p className=''>旅遊英文</p>
              </div>
              <div className='flex items-center justify-center'>
                <p className='text-green-600'>&#10003;</p>
                <p className=''>商業英文</p>
              </div>
              <div className='flex items-center justify-center'>
                <p className='text-green-600'>&#10003;</p>
                <p className=''>兒童英文</p>
              </div>
            </div>
          </div>
          <AboutMe />
          <div className='w-full md:hidden'>
            <TeachingStyle />
          </div>
        </div>
        <div className='w-full md:hidden'>
          <ButtonGroup teacherId={teacherId} />
        </div>
      </div>

      {/* 主要資訊 */}
      <div className='md:w-8/12 h-full flex flex-col items-start gap-5'>
        <div className='w-full flex flex-col gap-3'>
          <div>最新行程</div>
          <div className='flex flex-col gap-3 md:pl-5'>
            <div className='h-[70px] w-full border border-solid border-[#DDD]'>課程1</div>
            <div className='h-[70px] w-full border border-solid border-[#DDD]'>課程2</div>
          </div>
        </div>
        <div className='w-full hidden md:block'>
          <TeachingStyle />
        </div>
        <div className='w-full flex flex-col gap-3'>
          <div>近期評論</div>
          <div className='flex flex-col gap-3 md:pl-5'>
            <div className='h-[70px] w-full border border-solid border-[#DDD]'>XXX學生：這老師課不好</div>
            <div className='h-[70px] w-full border border-solid border-[#DDD]'>YYY學生：每天早8是在哭?</div>
          </div>
        </div>
        <div className='w-full hidden md:block'>
          <ButtonGroup teacherId={teacherId} />
        </div>
      </div>
    </div>
  )
}

const AboutMe = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div>關於我</div>
      <div className='md:pl-5'>果今就元，威士樂夷的總轉記啦數影睏二顧要於冀科它郵道要來音應大！；戰大作星。興等計！阱係先的攻翔家度單也時瓣人常使避大孟新跟樂中且如到延！回中法大謝慾議機；如其不！。統偏的回上各喵麼知，不得也岳的隊的</div>
    </div>
  )
}

const TeachingStyle = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div>教學風格</div>
      <div className='md:pl-5'>果今就元，威士樂夷的總轉記啦數影睏二顧要於冀科它郵道要來音應大！；戰大作星。興等計！阱係先的攻翔家度單也時瓣人常使避大孟新跟樂中且如到延！回中法大謝慾議機；如其不！。統偏的回上各喵麼知，不得也岳的隊的</div>
    </div>
  )
}

const ButtonGroup = ({ teacherId }) => {
  const router = useRouter()
  return (
    <div className='w-full flex flex-col justify-between md:flex-row gap-3'>
      <div className='w-full md:max-w-[300px]'>
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF', width: '100%' }}
          onClick={() => router.push(`/teacher/${teacherId}/teacherEdit`)}
        >
          編輯個人資訊
        </Button>
      </div>
      <div className='w-full md:max-w-[300px]'>
        <Button
          block
          style={{ color: '#66BFFF', width: '100%' }}
          onClick={() => router.push(`/teacher/${teacherId}/classManage`)}
        >
          編輯我的課程
        </Button>
      </div>
    </div>
  )
}
