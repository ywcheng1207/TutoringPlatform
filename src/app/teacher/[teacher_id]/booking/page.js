//
import Image from 'next/image'
import { Select, Input, Button } from 'antd'

//
import iconHeart from '@/assets/icon-heart.svg'

//
import NoPhoto from '@/components/NoPhoto'

//
export default function TeacherPersonal({ params }) {
  const teacherId = params.teacher_id

  return (
    <div className='flex flex-col gap-3 md:flex-row'>
      <div className='basis-3/5'>
        <div className='flex flex-col items-center gap-3 md:flex-row md:mb-10'>
          <NoPhoto size='big' />
          <div className='flex flex-col gap-3 md:gap-10'>
            <div className='flex justify-center md:justify-start'>
              老師 {teacherId}
            </div>
            <div className='flex'>
              <h3 className='mr-3'>非洲</h3>
              <Image src={iconHeart} alt='like' />
              <h3>4.8</h3>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <h1>簡介</h1>
          <h6 className='mb-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </h6>
          <h1>教學風格</h1>
          <h6 className='mb-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </h6>
          <h1>經歷</h1>
          <h6 className='mb-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </h6>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-5'>
        <Select placeholder='選擇日期' style={{ width: '100%' }} showSearch={true} />
        <Select placeholder='開放時段' style={{ width: '100%' }} showSearch={true} />
        <Select placeholder='課程種類' style={{ width: '100%' }} showSearch={true} />
        <Button
          block
          style={{ color: '#fff', background: '#66BFFF' }}
        >
          預約
        </Button>
      </div>
    </div>
  )
}
