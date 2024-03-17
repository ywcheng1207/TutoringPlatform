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
      className='border-[1px] border-solid border-[#66BFFF] rounded-[3px] p-3 flex flex-col gap-3 cursor-pointer hover:bg-[#f0eded] min-w-[250px] lg:min-h-[300px]'
      onClick={() => router.push(`teacher/${item?.id}/booking`)}
    >
      <div className='flex flex-row items-center gap-1'>
        <div className='flex-1'>
          <NoPhoto size='medium' photo={item?.avatar} />
        </div>
        <div className='flex-1 flex flex-col gap-3 h-[120px]'>
          <div className='font-bold text-xl'>{item?.name}</div>
          <div>{item?.country}</div>
        </div>
      </div>
      <div className='flex flex-wrap gap-1'>
        {item?.categories.map(ele => <div key={ele} className='bg-[#66BFFF] text-[#FFF] px-2 py-1 lg:py-0 rounded-lg opacity-70'>{classType[ele]}</div>)}
      </div>
      <div>
        <h1 className='font-bold text-lg'>介紹</h1>
        {item?.introduction}
      </div>
    </div>
  )
}

export default TeacherCard
