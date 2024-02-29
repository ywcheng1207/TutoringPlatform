'use client'
//
import Image from 'next/image'
import iconPhoto from '@/assets/icon-photo.svg'
import { useRouter } from 'next/navigation'

//
import NoPhoto from './NoPhoto'

//
const TeacherCard = ({ id }) => {
  const router = useRouter()

  return (
    <div
      className='border-[1px] border-solid border-[#66BFFF] rounded-[3px] p-3 flex flex-col gap-3 cursor-pointer hover:bg-[#f0eded]'
      onClick={() => router.push(`teacher/${id}/booking`)}
    >
      <div className='flex'>
        <div className='flex-1'>
          <NoPhoto size='small' />
        </div>
        <div className='flex-1 justify-start'>
          <div>某位老師</div>
          <div>非洲</div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      </div>
    </div>
  )
}

export default TeacherCard