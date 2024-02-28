//
export const generateMetadata = ({ params }) => {
  return {
    title: `歡迎${params.student_id}編輯您的資訊`,
    description: "學生資料編輯"
  }
}

//
export default function ({ params }) {
  const student_id = params.student_id

  return (
    <div>編輯學生個人頁{student_id}</div>
  )
}