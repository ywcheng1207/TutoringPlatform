'use client'
//
import Image from 'next/image'
import { Tooltip } from 'antd'

//
import iconPhoto from '@/assets/icon-photo.svg'
const BASEURL = 'https://tutor-online.zeabur.app'

//
const NoPhoto = ({ size, photo, username }) => {
  const thePhoto = photo ? `${BASEURL}${photo}` : null

  return (
    <>
      {
        size === 'big' &&
        <div className={'w-[230px] h-[230px] bg-[#CCC] bg-opacity-20 flex justify-center items-center p-3'}>
            <Image src={thePhoto || iconPhoto} alt="photo" width={180} height={180} className='max-h-full max-w-full' />
        </div>
      }
      {
        size === 'small' &&
        <div className={'w-[110px] h-[110px] bg-[#CCC] bg-opacity-20 flex justify-center items-center p-3'}>
            <Image src={thePhoto || iconPhoto} alt="photo" width={80} height={80} className='max-h-full max-w-full' />
        </div>
      }
      {
        size === 'medium' &&
        <div className={'w-[150px] h-[150px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={iconPhoto} alt="photo" width={80} className='max-h-full max-w-full' />
        </div>
      }
      {
        size === 'avatar' &&
        <Tooltip title={username} trigger="hover" color='#66BFFF' key='#FFF'>
          <div className={'w-[60px] h-[60px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
            <Image src={thePhoto || iconPhoto} alt="photo" width={40} height={40} className={photo && 'rounded-full max-h-full max-w-full'} />
          </div>
        </Tooltip>
      }
      {
        size === 'avatar2' &&
        <div className={'w-[70px] h-[70px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
            <Image src={thePhoto || iconPhoto} alt="photo" width={40} height={40} className='max-h-full max-w-full' />
        </div>
      }
    </>
  )
}

export default NoPhoto
