import { Inter, Comforter, Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import { ConfigProvider, message } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import zhTW from 'antd/lib/locale/zh_TW'
import { Provider } from './provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// const engFontType = Comforter({ weight: ['400'], subsets: ['latin'] })
const cnFontType = Noto_Sans_TC({ weight: ['400', '700', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'Tutoring Platform',
  description: 'Generated by YWJ'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={cnFontType.className}>
        <ConfigProvider
          locale={zhTW}
          theme={{
            token: {
              colorPrimary: '#66BFFF',
              // colorBgContainer: '#66BFFF',
              borderRadius: 5
              // colorbgho: 'black'
            }
          }}
        >
          <AntdRegistry>
            <Provider>
              <div className='flex flex-col justify-between min-h-screen gap-5'>
                <Header />
                <div className='flex-1 w-full px-3 md:mx-auto md:max-w-[1280px] md:px-10'>
                  {children}
                </div>
                <Footer />
              </div>
            </Provider>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}

export default RootLayout
