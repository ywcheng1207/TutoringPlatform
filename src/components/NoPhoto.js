'use client'
//
import Image from 'next/image'
import { Tooltip } from 'antd'

//
import iconPhoto from '@/assets/icon-photo.svg'

//
const NoPhoto = ({ size }) => {
  return (
    <>
      {
        size === 'big' &&
        <div className={'w-[200px] h-[200px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={iconPhoto} alt="photo" width={100} />
        </div>
      }
      {
        size === 'small' &&
        <div className={'w-[110px] h-[110px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={iconPhoto} alt="photo" />
        </div>
      }
      {
        size === 'medium' &&
        <div className={'w-[150px] h-[150px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={iconPhoto} alt="photo" width={80} />
        </div>
      }
      {
        size === 'avatar' &&
        <Tooltip title='Mr.非洲人' trigger="hover" color='#66BFFF' key='#FFF'>
          <div className={'w-[70px] h-[70px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
            <Image src={iconPhoto} alt="photo" width={40} height={40} />
          </div>
        </Tooltip>
      }
      {
        size === 'avatar2' &&
        <div className={'w-[70px] h-[70px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
          <Image src={iconPhoto} alt="photo" width={40} height={40} />
        </div>
      }
    </>
  )
}

export default NoPhoto
