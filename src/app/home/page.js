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
const Home = () => {
  const router = useRouter()
  const [studentRankData, setStudentRankData] = useState([])
  const [teacherListData, setTeacherListData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
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

  //
  const [currentPage, setCurrentPage] = useState(1)
  const [dataCount, setDataCount] = useState(1)
  const pageSize = 6
  const finalData = teacherListData.length > 0
    ? teacherListData.filter(item => {
      // 國家篩選條件，檢查是否符合選定的國家
      const isCountryMatch = teacherCountry.indexOf(countryFilter) >= 0 && item.country === countryFilter
      // 關鍵字篩選條件，不區分大小寫地檢查名字中是否包含搜尋關鍵字
      const isNameMatch = item.name?.toLowerCase().includes(searchValue.toLowerCase())
      const isClassTypeMatch = item.categories?.includes(classFilter)
      // 如果沒有設置國家篩選（countryFilter為空），則只根據關鍵字篩選
      // 如果設置了國家篩選，則項目需要同時符合國家和關鍵字的篩選條件
      return (countryFilter !== '全部' ? isCountryMatch : true) &&
        (searchValue ? isNameMatch : true) &&
        (classFilter !== 0 ? isClassTypeMatch : true)
    })
    : []

  const currentPageData = finalData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePage = page => {
    setCurrentPage(page)
  }

  const handleClassFilter = (item) => {
    setClassFilter(item)
    setCurrentPage(1)
  }

  const handleCountryFilter = (item) => {
    setCountryFilter(item)
    setCurrentPage(1)
  }

  let searchingKeyWord = ''
  const handleSearchTyping = (e) => {
    searchingKeyWord = e.target.value
  }

  const handleSearch = () => {
    setSearchValue(searchingKeyWord)
  }

  const fetchTeacherListDataData = async () => {
    try {
      const res = await getTeacherListData({
        page: currentPage,
        limit: 999999
      })
      setTeacherListData(res.data.data.teacherLimit)
      setDataCount(res.data.data.count)
    } catch (error) {
      console.error('老師清單資料錯誤', error)
    }
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
        setStudentRankData(res.data.data)
      } catch (error) {
        // console.error('學生排行資料錯誤', error)
      }
      setIsLoading(false)
    }
    fetchTeacherListDataData()
    fetchStudentRankDataData()
  }, [])

  return (
    <div className='bg-yellow w-full'>
      <HomeList
        teacherListData={teacherListData}
        currentPage={currentPage}
        onPage={handlePage}
        pageSize={pageSize}
        dataCount={dataCount}
        currentData={finalData}
        currentPageData={currentPageData}
        classType={classType}
        classFilter={classFilter}
        handleClassFilter={handleClassFilter}
        teacherCountry={teacherCountry}
        countryFilter={countryFilter}
        handleCountryFilter={handleCountryFilter}
        handleSearchTyping={handleSearchTyping}
        handleSearch={handleSearch}
        studentRankData={studentRankData}
        isLoading={isLoading}
      />
    </div>
  )
}
export default Home
