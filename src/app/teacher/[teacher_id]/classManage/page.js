export default function ({ params }) {
  const teacher_id = params.teacher_id

  return (
    <div>編輯  {teacher_id}  老師的課程</div>
  )
}