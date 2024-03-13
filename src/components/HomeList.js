'use client'
//
import { useState } from 'react'
import Image from 'next/image'
import { Input, Button, List, Pagination, Grid, Select, Skeleton } from 'antd'
// import style from './HomeList.module.css'

//
import TeacherCard from '@/components/TeacherCard'
import NoPhoto from '@/components/NoPhoto'

//
import iconBell from '@/assets/icon-bell.svg'
const { useBreakpoint } = Grid
const teacherCountryType = [
  { key: 0, type: '全部' },
  { key: 1, type: '美國' },
  { key: 2, type: '澳洲' },
  { key: 3, type: '加拿大' }
]

//
const HomeList = ({
  currentData,
  currentPage,
  onPage,
  pageSize,
  dataCount,
  classType,
  classFilter,
  handleClassFilter,
  teacherCountry,
  countryFilter,
  handleCountryFilter,
  handleSearchTyping,
  handleSearch,
  studentRankData,
  isLoading
}) => {
  const screens = useBreakpoint()

  return (
    <>
      {
        !isLoading &&
        <>
          <div className='hidden gap-5 w-full lg:flex'>
            <div style={{ flex: 0.9 }}>
              <div className='flex flex-col gap-5'>
                <div className='flex gap-3'>
                  <div>課程：</div>
                  {classType.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        color: classFilter === item.key && '#66BFFF',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleClassFilter(item.key)}
                    >
                      {item.type}
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
                      onClick={() => handleCountryFilter(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <Input
                  placeholder='搜尋老師的名字' style={{ width: '100%' }}
                  onChange={handleSearchTyping}
                  onPressEnter={handleSearch}
                  suffix={
                    <Button
                      onClick={handleSearch}
                      style={{ color: '#fff', background: '#66BFFF' }}>
                      搜尋
                    </Button>
                  }
                />
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col items-center'>
                    <List
                      className='min-h-[600px]'
                      grid={{ column: screens.xl ? 3 : 2 }}
                      dataSource={currentData}
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
              </div>
            </div>
            <div style={{ flex: 0.1 }}>
              <StudyRanking studentRankData={studentRankData} />
            </div>
          </div >
          < div className='min-h-[700px] flex flex-col gap-5 lg:hidden' >
            <Select placeholder='課程' value={classFilter} style={{ width: '100%' }} onChange={(e) => handleClassFilter(e)}>
              {
                classType.map(ele =>
                  <Select.Option
                    value={ele.key}
                    key={ele.key}>{ele.type}
                  </Select.Option>
                )
              }
            </Select>
            <Select placeholder='教師國籍' value={countryFilter} style={{ width: '100%' }} onChange={(e) => handleCountryFilter(e)}>
              {
                teacherCountryType.map(ele =>
                  <Select.Option
                    value={ele.type}
                    key={ele.key}>{ele.type}
                  </Select.Option>
                )
              }
            </Select>
            <Input
              placeholder='搜尋老師的名字' style={{ width: '100%' }}
              onChange={handleSearchTyping}
              onPressEnter={handleSearch}
              suffix={
                <Button
                  onClick={handleSearch}
                  style={{ color: '#fff', background: '#66BFFF' }}>
                  搜尋
                </Button>
              }
            />
            <StudyRanking studentRankData={studentRankData} />
            <div className='flex flex-col gap-3'>
              {currentData.map(teacher => <TeacherCard item={teacher} key={teacher.id} />)}
            </div>
          </div >
        </>
      }
      {isLoading &&
        <>
          <div className='w-full flex flex-col items-center gap-3 p-3 lg:hidden'>
            <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} />
            <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} />
            <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} />
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className='hidden lg:flex w-full gap-5'>
            <div className='flex flex-col w-9/12'>
              <Skeleton active paragraph={{ rows: 0 }} title={{ width: '50%' }} />
              <Skeleton active paragraph={{ rows: 0 }} title={{ width: '50%' }} />
              <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} />
              <div className='grid grid-cols-3 gap-4'>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>

            </div>
            <div className='flex flex-col gap-5 h-[500px] w-3/12'>
              <Skeleton active paragraph={{ rows: 0 }} title={{ width: '70%' }} className='pl-3' />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
              <StudentRankCardSkeleton />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default HomeList

const StudyRanking = ({ studentRankData }) => {
  return (
    <div className='min-h-[100px] border-[1px] border-solid border-[#CCC] rounded-[3px] p-3'>
      <div className='bg-[#DDD] text-[#fff] py-1 rounded-sm flex justify-center gap-2 items-center mb-3'>
        <Image src={iconBell} alt='bell' />
        <div>學習時數排行</div>
      </div>
      <div className='flex flex-wrap gap-3 lg:justify-center lg:block lg:w-[240px]'>
        {studentRankData?.map(item => (
          <div key={item.id} className='flex items-center py-2 lg:w-full '>
            <div className='flex items-center gap-3'>
              <NoPhoto size='avatar' photo={item.avatar} username={item.name} />
              <h2 className='hidden lg:block flex-1 max-w-[130px] overflow-hidden text-nowrap text-ellipsis '>
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CardSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-3 p-3'>
      <div className='flex gap-3'>
        <Skeleton.Avatar
          size={100}
          shape="square"
          active
          style={{ width: '130px', height: '130px' }}
        />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <Skeleton active paragraph={{ rows: 2 }} style={{ width: '80%' }} />
    </div>
  )
}

const StudentRankCardSkeleton = () => {
  return (
    <div className='flex items-center gap-3 pl-5'>
      <Skeleton.Avatar
        size={50} // 直接指定 size 属性来设置大小
        shape="circle"
        active
      />
      <Skeleton active paragraph={{ rows: 0 }} title={{ width: '50%' }} />
    </div>
  )
}
