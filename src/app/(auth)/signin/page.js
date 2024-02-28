import Link from "next/link"

export default function () {

  return (
    <div className="h-full flex flex-col">
      歡迎光臨
      <Link href='/home'
        className="bg-[#66BFFF] text-[#fff] py-2 max-h-[35px] flex justify-center items-center rounded-[5px]">
        登入按鈕
      </Link>
    </div>
  )
}