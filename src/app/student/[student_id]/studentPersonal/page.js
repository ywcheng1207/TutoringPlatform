export default function ({ params }) {
  const student_id = params.student_id

  return (
    <div>學生個人頁{student_id}</div>
  )
}