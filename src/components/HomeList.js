'use client'
//
import { useState } from 'react'
import { Input, Button, List, Pagination } from 'antd'
// import style from './HomeList.module.css'

//
import TeacherCard from './TeacherCard'

//
const HomeList = ({ data }) => {
  const [classFilter, setClassFilter] = useState('全部')
  const [countryFilter, setCountryFilter] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const classType = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']
  const teacherCountry = ['全部', '美國', '非洲', '台灣', '印度']
  // 計算當前頁面的數據
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // 分頁變更時的處理函數
  const handlePage = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-3'>
          <div>課程：</div>
          {classType.map((item) => (
            <div
              key={item}
              style={{
                color: classFilter === item && '#66BFFF',
                cursor: 'pointer'
              }}
              onClick={() => {
                setClassFilter(item)
                console.log(item)
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className='flex gap-3'>
          <div>教師國籍：</div>
          {teacherCountry.map((item) => (
            <div
              key={item}
              style={{
                color: countryFilter === item && '#66BFFF',
                cursor: 'pointer'
              }}
              onClick={() => {
                setCountryFilter(item)
                console.log(item)
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <Input suffix={<Button style={{ background: '#66BFFF', color: '#fff' }}>搜尋</Button>} />
        <div className='flex flex-col items-center'>
          <List
            className='min-h-[470px]'
            grid={{ column: 3 }}
            dataSource={currentData}
            renderItem={(item, index) => (
              <div style={{ padding: '8px' }}>
                <TeacherCard id={item.id} />
              </div>
            )}
          />
          <Pagination
            className='customPagination'
            current={currentPage}
            onChange={handlePage}
            total={data.length}
            pageSize={pageSize}
            showQuickJumper
          />
        </div>
      </div>
    </>
  )
}

export default HomeList
