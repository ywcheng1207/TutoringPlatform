import axios from 'axios'

// 不需要添加Authorization
const apiWithoutToken = axios.create({
  baseURL: 'https://tutor-online.zeabur.app',
  // baseURL: 'https://boss-shad-deadly.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 需要添加Authorization
const apiWithToken = axios.create({
  baseURL: 'https://tutor-online.zeabur.app',
  // baseURL: 'https://boss-shad-deadly.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiWithToken.interceptors.request.use(config => {
  const TOKEN = localStorage?.getItem('TOKEN')
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// =======================================================================

// 登入
export const postSignIn = async ({ email, password }) => {
  try {
    const res = await apiWithoutToken.post('/signin', { email, password })
    return res
  } catch (error) {
    console.error('SignIn Failed:', error)
  }
}

// 註冊
export const postSignUp = async ({ email, password, passwordCheck }) => {
  try {
    const res = await apiWithoutToken.post('/signup', { email, password, passwordCheck })
    return res
  } catch (error) {
    console.error('SignUp Failed:', error)
  }
}

// 首頁 - 學生排行資料
export const getStudentRankData = async () => {
  try {
    const res = await apiWithToken.get('/students')
    return res
  } catch (error) {
    console.error('GetStudentRankData Failed:', error)
  }
}

// 首頁 - 老師資訊
export const getTeacherListData = async ({ page }) => {
  try {
    const res = await apiWithToken.get(`/teachers?page=${page}`)
    return res
  } catch (error) {
    console.error('GetTeacherListData Failed:', error)
  }
}

// 老師頁, 老師個人頁 - 基本資訊：name, country, introduction, style, avatar
export const getTeacherPageData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/teachers/${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherPageData Failed:', error)
  }
}

// 老師頁, 老師個人頁 - 學生評論：score, text, studentId, teacherId
export const getTeacherCommentData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/comments/:${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherCommentData Failed:', error)
  }
}

// 老師頁 - 開課資訊
export const getTeacherClassesData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/:${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherClassesData Failed:', error)
  }
}

// 老師頁 - 預約課程 ** body應該要塞這次是預約哪個課程? **
export const patchTeacherClasses = async ({ id }) => {
  try {
    const res = await apiWithToken.patch(`/classes/:${id}`)
    return res
  } catch (error) {
    console.error('PatchTeacherClasses Failed:', error)
  }
}

// 老師個人頁 - 一位老師被預訂的一週所有課程，顯示由最近開始排序
export const getTeacherClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/teacherbooked/:${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherClassesBookedData Failed:', error)
  }
}

// 老師個資編輯頁 - 申請成為老師
export const postTeacherApply = async ({ name, country, introduction, style, avatar, categoryArray }) => {
  try {
    const res = await apiWithToken.post('/teachers', { name, country, introduction, style, avatar, categoryArray })
    return res
  } catch (error) {
    console.error('ApplyToBeATeacher Failed:', error)
  }
}

// 老師個資編輯頁 - 修改一筆老師資料
export const putTeacherApply = async ({ name, country, introduction, style, avatar, categoryArray }) => {
  try {
    const res = await apiWithToken.put('/teachers', { name, country, introduction, style, avatar, categoryArray })
    return res
  } catch (error) {
    console.error('PutTeacherApply Failed:', error)
  }
}

// 學生個人頁 - 取得學生個資
export const getStudentPersonalData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/students/:${id}`)
    return res
  } catch (error) {
    console.error('GetStudentPersonalData Failed:', error)
  }
}

// 學生個人頁 - 學生預訂的所有課程，顯示最近一週的課程，課程由最近開始排序
export const getStudentClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/studentbooked/:${id}`)
    return res
  } catch (error) {
    console.error('GetStudentClassesBookedData Failed:', error)
  }
}

// 學生個人頁 - 取消預定一門課
export const patchStudentClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.patch(`/classes/studentbooked/:${id}`)
    return res
  } catch (error) {
    console.error('PatchStudentClassesBookedData Failed:', error)
  }
}

// 學生個人頁 - 學生上完的所有課程 ，依照最近上完課程新到舊排序
export const getAllStudentCompletedClassesData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/:${id}/completed`)
    return res
  } catch (error) {
    console.error('GetAllStudentCompletedClassesData Failed:', error)
  }
}

// 學生個人頁 - 增加一則評論
export const postComments = async ({ id, text, score }) => {
  try {
    const res = await apiWithToken.get(`/comments/:${id}`, { text, score })
    return res
  } catch (error) {
    console.error('PostComments Failed:', error)
  }
}

// 學生頁 - 新增一筆學生資料
export const postToBeAStudents = async ({ name, introduction, avatar }) => {
  try {
    const res = await apiWithToken.get('/students', { name, introduction, avatar })
    return res
  } catch (error) {
    console.error('PostToBeAStudents Failed:', error)
  }
}

// 學生頁 - 編輯筆學生資料
export const putToBeAStudents = async ({ name, introduction, avatar }) => {
  try {
    const res = await apiWithToken.get('/students', { name, introduction, avatar })
    return res
  } catch (error) {
    console.error('PutToBeAStudents Failed:', error)
  }
}

// 課程管理 - 取得一位老師開設的兩週課程，課程由最近開始排序
export const getClassManagementData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/:${id}`)
    return res
  } catch (error) {
    console.error('GetClassManagementData Failed:', error)
  }
}

// 課程管理 - 一次新增一堂課程
export const postClasses = async ({ name, dateTimeRange, link, category }) => {
  try {
    const res = await apiWithToken.post('/classes', { name, dateTimeRange, link, category })
    return res
  } catch (error) {
    console.error('PostClasses Failed:', error)
  }
}

// 課程管理 - 一次修改一堂課
export const putClasses = async ({ id, name, dateTimeRange, link, category }) => {
  try {
    const res = await apiWithToken.post(`/classes/:${id}`, { name, dateTimeRange, link, category })
    return res
  } catch (error) {
    console.error('PutClasses Failed:', error)
  }
}

// 課程管理 - 一次刪除一堂課
export const deleteClasses = async ({ id }) => {
  try {
    const res = await apiWithToken.delete(`/classes/:${id}`)
    return res
  } catch (error) {
    console.error('DeleteClasses Failed:', error)
  }
}
