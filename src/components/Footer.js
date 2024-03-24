//
import Image from 'next/image'

//
import iconExpress from '@/assets/icon-express.svg'
import iconAxios from '@/assets/icon-axios.svg'
// import iconGithub from '@/assets/icon-github.svg'
import iconMysql from '@/assets/icon-mysql.svg'
import iconNextjs from '@/assets/icon-nextjs.svg'
import iconNodejs from '@/assets/icon-nodejs.svg'
import iconSocketio from '@/assets/icon-socketio.svg'
import iconAntd from '@/assets/icon-antd.svg'
import iconFigma from '@/assets/icon-figma.svg'
import iconTailwind from '@/assets/icon-tailwind.svg'

//
const Footer = () => {
  return (
    <div className="bg-[#D9D9D9] h-[250px] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        <div className='flex items-center gap-10 w-[300px]'>
          <div className='w-3/12 font-medium'>後端</div>
          <div className='w-9/12 flex gap-2'>
            <Image src={iconNodejs} width={20} height={20} alt='iconNodejs' />
            <Image src={iconExpress} width={20} height={20} alt='iconNodejs' />
            <Image src={iconMysql} width={20} height={20} alt='iconMysql' />
            <Image src={iconSocketio} width={20} height={20} alt='iconSocketio' />
          </div>
        </div>
        <div className='flex items-center gap-10 min-w-[300px]'>
          <div className='w-3/12 font-medium'>前端</div>
          <div className='w-9/12 flex gap-2'>
            <Image src={iconNextjs} width={20} height={20} alt='iconNextjs' />
            <Image src={iconTailwind} width={20} height={20} alt='iconTailwind' />
            <Image src={iconAntd} width={20} height={20} alt='iconAntd' />
            <Image src={iconAxios} width={20} height={20} alt='iconAxios' />
            <Image src={iconFigma} width={20} height={20} alt='iconFigma' />
            <Image src={iconSocketio} width={20} height={20} alt='iconSocketio' />
          </div>
        </div>
      </div>
      <div className="h-[60px] bg-[#666] text-[#fff] flex justify-center items-center">
        © 2024 All rights reserved
      </div>
    </div>
  )
}

export default Footer
