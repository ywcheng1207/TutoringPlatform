export default function StudentPersonal({ params }) {
  const studentId = params.student_id

  return (
    <div>學生個人頁{studentId}</div>
  )
}
