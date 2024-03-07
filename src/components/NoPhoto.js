'use client'
//
import Image from 'next/image'
import { Tooltip } from 'antd'

//
import iconPhoto from '@/assets/icon-photo.svg'

//
const NoPhoto = ({ size, photo, username }) => {
  return (
    <>
      {
        size === 'big' &&
        <div className={'w-[230px] h-[230px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={iconPhoto} alt="photo" width={100} />
        </div>
      }
      {
        size === 'small' &&
        <div className={'w-[110px] h-[110px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
            <Image src={photo || iconPhoto} alt="photo" width={80} height={80} />
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
        <Tooltip title={username} trigger="hover" color='#66BFFF' key='#FFF'>
          <div className={'w-[60px] h-[60px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
            <Image src={photo || iconPhoto} alt="photo" width={40} height={40} className={photo && 'rounded-full'} />
          </div>
        </Tooltip>
      }
      {
        size === 'avatar2' &&
        <div className={'w-[70px] h-[70px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
          <Image src={photo || iconPhoto} alt="photo" width={40} height={40} />
        </div>
      }
    </>
  )
}

export default NoPhoto
