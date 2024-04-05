'use client'
//
import Image from 'next/image'
import { Tooltip } from 'antd'

//
import iconPhoto from '@/assets/icon-photo.svg'
// const BASEURL = 'https://tutor-online.zeabur.app'
const BASEURL = 'https://alive-lizard-eagerly.ngrok-free.app'
// const BASEURL = 'https://tutor-online2024wb.uk'

//
const NoPhoto = ({ size, photo, username }) => {
  let thePhoto
  if (photo) {
    if (photo[0] !== '/') {
      thePhoto = photo
    } else {
      thePhoto = photo ? `${BASEURL}${photo}` : null
    }
  }

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
        <div className={'w-[140px] h-[140px] bg-[#CCC] bg-opacity-20 flex justify-center items-center'}>
          <Image src={thePhoto || iconPhoto} alt="photo" width={100} height={100} className='max-h-full max-w-full' />
        </div>
      }
      {
        size === 'avatar' &&
        <Tooltip title={username} trigger="hover" color='#66BFFF' key='#FFF'>
          <div className={'w-[60px] h-[60px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
            <Image src={thePhoto || iconPhoto} alt="photo" width={40} height={40} className={photo && 'rounded-full'} />
          </div>
        </Tooltip>
      }
      {
        size === 'avatar2' &&
        <div className={'w-[80px] h-[80px] bg-[#CCC] bg-opacity-20 flex justify-center items-center rounded-full'}>
          <Image src={thePhoto || iconPhoto} alt="photo" width={180} height={180} className='max-h-full max-w-full max-w-[40px]' />
        </div>
      }
    </>
  )
}

export default NoPhoto
