'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

const RootPage = () => {
  const router = useRouter()

  console.log('測試')
  useEffect(() => {
    router.push('/signin') // 使用replace而不是push，以避免將根頁面加入歷史紀錄
  }, [router])

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        正在跳轉...
      </div>
    </main>
  )
}

export default RootPage
