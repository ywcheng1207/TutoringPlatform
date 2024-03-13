'use client'
//
import Image from 'next/image'
import iconPhoto from '@/assets/icon-photo.svg'
import { useRouter } from 'next/navigation'

//
import NoPhoto from './NoPhoto'

//
const TeacherCard = ({ id, item }) => {
  const router = useRouter()
  const classType = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']
  // console.log('抓一下圖片', item?.avatar)

  return (
    <div
      className='border-[1px] border-solid border-[#66BFFF] rounded-[3px] p-3 flex flex-col gap-3 cursor-pointer hover:bg-[#f0eded] min-w-[200px] md:min-h-[220px]'
      onClick={() => router.push(`teacher/${item?.id}/booking`)}
    >
      <div className='flex flex-row items-center'>
        <div className='flex-1'>
          <NoPhoto size='small' photo={item?.avatar} />
        </div>
        <div className='flex-1 justify-start'>
          <div>{item?.name}</div>
          <div>{item?.country}</div>
          <div className='flex gap-3'>
            {item?.categories.map(ele => <div key={ele} className='text-[#66BFFF]'>{classType[ele]}</div>)}
          </div>
        </div>
      </div>
      <div>
        {item?.introduction}
      </div>
    </div>
  )
}

export default TeacherCard
