'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "antd"

export default function () {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col">
      歡迎光臨
      <Button
        style={{ color: '#fff' }}
        onClick={() => {
          router.push('/home')
        }}
      >
        登入
      </Button>
    </div>
  )
}