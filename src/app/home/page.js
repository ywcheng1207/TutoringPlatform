'use client'

//
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Select, Input, Button, notification } from 'antd'

//
import TeacherCard from '@/components/TeacherCard'
import iconBell from '@/assets/icon-bell.svg'
import NoPhoto from '@/components/NoPhoto'
import HomeList from '@/components/HomeList'
import { getStudentRankData, getTeacherListData } from '@/apis/apis'

//
const BASEURL = 'https://tutor-online.zeabur.app'

//
// export const metadata = {
//   title: 'home',
//   description: 'Generated by YWJ'
// }

const data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 }
]
// const rankinData = [
//   { id: 1 },
//   { id: 2 },
//   { id: 3 },
//   { id: 4 },
//   { id: 5 },
//   { id: 6 }
// ]
//
const Home = () => {
  const router = useRouter()
  const [studentRankData, setStudentRankData] = useState([])
  const [teacherListData, setTeacherListData] = useState([])
  const [filterTeacherListData, setFilterTeacherListData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [theTeacherData, setTheTeacherData] = useState('試試看')
  //
  const [classFilter, setClassFilter] = useState(0)
  const [countryFilter, setCountryFilter] = useState('全部')
  // const classType = ['全部', '生活英文', '商業英文', '旅遊英文', '兒童英文']
  const teacherCountry = ['全部', '美國', '澳洲', '加拿大']

  const classType = [
    { key: 0, type: '全部' },
    { key: 1, type: '生活英文' },
    { key: 2, type: '商業英文' },
    { key: 3, type: '旅遊英文' },
    { key: 4, type: '兒童英文' }
  ]

  const teacherCountryType = [
    { key: 0, type: '全部' },
    { key: 1, type: '美國' },
    { key: 2, type: '澳洲' },
    { key: 3, type: '加拿大' }
  ]
  //
  const [currentPage, setCurrentPage] = useState(1)
  const [dataCount, setDataCount] = useState(1)
  const pageSize = 6
  const currentData = teacherListData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const finalData = currentData.filter(item => {
    // 國家篩選條件，檢查是否符合選定的國家
    const isCountryMatch = teacherCountry.indexOf(countryFilter) >= 0 && item.country === countryFilter
    // 關鍵字篩選條件，不區分大小寫地檢查名字中是否包含搜尋關鍵字
    const isNameMatch = item.name.toLowerCase().includes(searchValue.toLowerCase())
    const isClassTypeMatch = item.categories?.includes(classFilter)
    console.log('這是match', isClassTypeMatch)
    // 如果沒有設置國家篩選（countryFilter為空），則只根據關鍵字篩選
    // 如果設置了國家篩選，則項目需要同時符合國家和關鍵字的篩選條件
    // return countryFilter !== '全部' ? isCountryMatch && isNameMatch : isNameMatch
    return (countryFilter !== '全部' ? isCountryMatch : true) &&
      (searchValue ? isNameMatch : true) &&
      (classFilter !== 0 ? isClassTypeMatch : true)
  })

  const handleNavigate = ({ id }) => {
    console.log(id)
  }
  const handlePage = page => {
    setCurrentPage(page)
  }

  const handleClassFilter = (item) => {
    setClassFilter(item)
  }

  const handleCountryFilter = (item) => {
    setCountryFilter(item)
  }

  let searchingKeyWord = ''
  const handleSearchTyping = (e) => {
    searchingKeyWord = e.target.value
  }

  const handleSearch = () => {
    setSearchValue(searchingKeyWord)
  }

  useEffect(() => {
    if (!typeof window !== 'undefined' && !window?.localStorage?.getItem('TOKEN')) {
      notification.error({
        message: '請先登入!',
        duration: 1
      })
      return router.push('/signin')
    }

    const fetchStudentRankDataData = async () => {
      try {
        const res = await getStudentRankData()
        // console.log('學生排行資料', res.data.data)
        setStudentRankData(res.data.data)
      } catch (error) {
        // console.error('學生排行資料錯誤', error)
      }
    }
    const fetchTeacherListDataData = async () => {
      try {
        const res = await getTeacherListData({
          page: currentPage,
          limit: 999999
        })
        // console.log('老師清單資料', res)
        setTeacherListData(res.data.data.teacherLimit)
        setDataCount(res.data.data.count)
      } catch (error) {
        // console.error('老師清單資料錯誤', error)
      }
    }
    fetchTeacherListDataData()
    fetchStudentRankDataData()
  }, [])

  return (
    <div className='bg-yellow w-full'>
      <div className='flex flex-col gap-5 md:hidden'>
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
        <Select placeholder='教師國籍' value={countryFilter} style={{ width: '100%' }} onChange={(e) => handleClassFilter(e)}>
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
          suffix={<Button style={{ color: '#fff', background: '#66BFFF' }}>搜尋</Button>}
        />
        <StudyRanking studentRankData={studentRankData} />
        <MobileCardList finalData={finalData} />
      </div>
      <div className='hidden md:flex gap-5 w-full'>
        <div className='flex flex-col gap-5' style={{ flex: 0.9 }}>
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
          <HomeList
            teacherListData={teacherListData}
            currentPage={currentPage}
            onPage={handlePage}
            pageSize={pageSize}
            dataCount={dataCount}
            currentData={finalData}

          />
        </div>
        <div style={{ flex: 0.1 }}>
          <StudyRanking studentRankData={studentRankData} />
        </div>
      </div>
    </div>
  )
}
export default Home

const StudyRanking = ({ studentRankData }) => {
  return (
    <div className='min-h-[100px] border-[1px] border-solid border-[#CCC] rounded-[3px] p-3'>
      <div className='bg-[#DDD] text-[#fff] py-1 rounded-sm flex justify-center gap-2 items-center mb-3'>
        <Image src={iconBell} alt='bell' />
        <div>學習時數排行</div>
      </div>
      <div className='flex flex-wrap gap-3 md:justify-center md:block md:w-[240px]'>
        {studentRankData?.map(item => (
          <div key={item.id} className='flex items-center py-2 md:w-full'>
            <div className='flex items-center gap-3'>
              <NoPhoto size='avatar' photo={item.avatar} username={item.name} />
              <h2 className='hidden md:block flex-1 max-w-[130px] overflow-hidden text-nowrap text-ellipsis'>
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MobileCardList = ({ finalData }) => {
  return (
    <div className='flex flex-col gap-3'>
      {finalData.map(teacher => <TeacherCard item={teacher} key={teacher.id} />)}
    </div>
  )
}
