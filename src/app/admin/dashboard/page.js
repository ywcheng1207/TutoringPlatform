'use client'

//
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

//
import { getAdminDashBoardData } from '@/apis/apis'

//
function DashBoard() {
  const [dashBoardData, setDashBoardData] = useState([])

  const columns = [
    {
      title: '編號',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (text) => <div>{text}</div>
    },
    {
      title: '是否為學生',
      dataIndex: 'studentId',
      key: 'studentId',
      align: 'center',
      render: (studentId) => <div>{studentId ? <CheckOutlined /> : <CloseOutlined />}</div>
    },
    {
      title: '是否為老師',
      dataIndex: 'teacherId',
      key: 'teacherId',
      align: 'center',
      render: (teacherId) => <div>{teacherId ? <CheckOutlined /> : <CloseOutlined />}</div>
    }
  ]

  useEffect(() => {
    const fetchAdminDashBoardData = async () => {
      try {
        const res = await getAdminDashBoardData()
        setDashBoardData(res?.data?.data)
      } catch (error) {
      }
    }
    fetchAdminDashBoardData()
  }, [])

  return (
    <div className='h-full w-full min-h-[500px]'>
      <Table columns={columns} dataSource={dashBoardData} />
    </div>
  )
}

export default DashBoard
