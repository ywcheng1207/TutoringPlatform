'use client'
//
import { useState } from 'react'
import { Input, Button, List, Pagination, Grid } from 'antd'
// import style from './HomeList.module.css'

//
import TeacherCard from './TeacherCard'
const { useBreakpoint } = Grid

//
const HomeList = ({ teacherListData, currentPage, onPage, pageSize, dataCount }) => {
  const screens = useBreakpoint()

  return (
    <>
      <div className='flex flex-col gap-3'>
        <Input suffix={<Button style={{ background: '#66BFFF', color: '#fff' }}>搜尋</Button>} />
        <div className='flex flex-col items-center'>
          <List
            className='min-h-[600px]'
            grid={{ column: screens.xs ? 1 : 2 }}
            dataSource={teacherListData}
            renderItem={(item, index) => (
              <div style={{ padding: '10px' }}>
                <TeacherCard id={item.id} item={item} />
              </div>
            )}
          />
          <Pagination
            className='customPagination'
            current={currentPage}
            onChange={onPage}
            total={dataCount}
            pageSize={pageSize}
            showQuickJumper
          />
        </div>
      </div>
    </>
  )
}

export default HomeList
