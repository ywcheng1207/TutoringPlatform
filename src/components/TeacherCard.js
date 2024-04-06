'use client'
//
import Image from 'next/image'
import iconPhoto from '@/assets/icon-photo.svg'
import { Card } from 'antd'
import { useRouter } from 'next/navigation'

//
import NoPhoto from './NoPhoto'

//
const TeacherCard = ({ id, item }) => {
  const router = useRouter()
  const classType = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']

  return (
    <Card
      className='rounded-[3px] p-3 flex flex-col gap-3 cursor-pointer hover:bg-[#ddd] hover:text-[#fff] min-w-[250px] overflow-hidden lg:h-[320px]'
      onClick={() => router.push(`teacher/${item?.id}/booking`)}
    >
      <div className='flex flex-row items-center gap-1'>
        <div className='flex-1'>
          <NoPhoto size='medium' photo={item?.avatar} />
        </div>
        <div className='flex-1 flex flex-col gap-3 min-h-[120px]'>
          <div className='font-bold text-xl max-w-[150px] truncate'>{item?.name}</div>
          <div>{item?.country}</div>
        </div>
      </div>
      <div className='flex flex-wrap gap-1 py-2'>
        {item?.categories.map(ele => <div key={ele} className='bg-[#66BFFF] text-[#FFF] px-2 py-1 lg:py-0 rounded-lg opacity-70'>{classType[ele]}</div>)}
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-bold text-lg'>介紹</h1>
        {truncateString(item?.introduction)}
      </div>
    </Card>
  )
}

export default TeacherCard

function truncateString(str) {
  if (str?.length > 80) {
    return str.substring(0, 50) + '...'
  }
  return str
}
