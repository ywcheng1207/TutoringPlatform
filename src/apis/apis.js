import axios from 'axios'

// const BASEURL = 'https://tutor-online.zeabur.app'
const BASEURL = 'https://alive-lizard-eagerly.ngrok-free.app'
// const BASEURL = 'http://10.0.0.136:3000'
// const BASEURL = 'https://tutor-online2024wb.uk'

// 不需要添加Authorization
const apiWithoutToken = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420'
  }
})

// 需要添加Authorization
const apiWithToken = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420'
  }
})

apiWithToken.interceptors.request.use(config => {
  const TOKEN = typeof window !== 'undefined' && window?.localStorage?.getItem('TOKEN')
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

apiWithToken.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data && error.response.data.message ===
      'Error: JWT doesn\'t exist or is wrong') {
      window.location.assign('/signin')
    }
    return Promise.reject(error)
  }
)

const apiWithTokenByFormData = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': '69420'
  }
})

apiWithTokenByFormData.interceptors.request.use(config => {
  const TOKEN = typeof window !== 'undefined' && window?.localStorage?.getItem('TOKEN')
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
    throw error
  }
}

// 註冊
export const postSignUp = async ({ email, password, passwordCheck }) => {
  try {
    const res = await apiWithoutToken.post('/signup', { email, password, passwordCheck })
    return res
  } catch (error) {
    console.error('SignUp Failed:', error)
    throw error
  }
}

// Google註冊
export const postGoogle = async ({ token }) => {
  try {
    const res = await apiWithoutToken.post('/auth2/google', { token })
    return res
  } catch (error) {
    console.error('Google Login Failed:', error)
    throw error
  }
}

// 首頁 - 學生排行資料
export const getStudentRankData = async () => {
  try {
    const res = await apiWithToken.get('/students')
    return res
  } catch (error) {
    console.error('GetStudentRankData Failed:', error)
    throw error
  }
}

// 首頁 - 老師資訊
export const getTeacherListData = async ({ page, limit = 6 }) => {
  try {
    const res = await apiWithToken.get(`/teachers?page=${page}&limit=${limit}`)
    return res
  } catch (error) {
    console.error('GetTeacherListData Failed:', error)
    throw error
  }
}

// 老師頁, 老師個人頁 - 基本資訊：name, country, introduction, style, avatar
export const getTeacherPageData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/teachers/${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherPageData Failed:', error)
    throw error
  }
}

// 老師頁, 老師個人頁 - 學生評論：score, text, studentId, teacherId
export const getTeacherCommentData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/comments/${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherCommentData Failed:', error)
    throw error
  }
}

// 老師頁 - 開課資訊
export const getTeacherClassesData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherClassesData Failed:', error)
    throw error
  }
}

// 老師頁 - 預約課程 ** body應該要塞這次是預約哪個課程? **
export const patchTeacherClasses = async ({ id, dateTimeRange }) => {
  try {
    const res = await apiWithToken.patch(`/classes/${id}`, { dateTimeRange })
    return res
  } catch (error) {
    console.error('PatchTeacherClasses Failed:', error)
    throw error
  }
}

// 老師個人頁 - 一位老師被預訂的一週所有課程，顯示由最近開始排序
export const getTeacherClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/teacherbooked/:${id}`)
    return res
  } catch (error) {
    console.error('GetTeacherClassesBookedData Failed:', error)
    throw error
  }
}

// 老師個資編輯頁 - 申請成為老師
export const postTeacherApply = async ({ data }) => {
  try {
    const res = await apiWithTokenByFormData.post('/teachers', data)
    return res
  } catch (error) {
    console.error('ApplyToBeATeacher Failed:', error)
    throw error
  }
}

// 老師個資編輯頁 - 修改一筆老師資料
export const putTeacherData = async ({ id, data }) => {
  try {
    const res = await apiWithTokenByFormData.put(`/teachers/${id}`, data)
    return res
  } catch (error) {
    console.error('putTeacherData Failed:', error)
    throw error
  }
}

// 學生個人頁 - 取得學生個資
export const getStudentPersonalData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/students/${id}`)
    return res
  } catch (error) {
    console.error('GetStudentPersonalData Failed:', error)
    throw error
  }
}

// 學生個人頁 - 學生預訂的所有課程，顯示最近一週的課程，課程由最近開始排序
export const getStudentClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/studentbooked/${id}`)
    return res
  } catch (error) {
    console.error('GetStudentClassesBookedData Failed:', error)
    throw error
  }
}

// 學生個人頁 - 取消預定一門課
export const patchStudentClassesBookedData = async ({ id }) => {
  try {
    const res = await apiWithToken.patch(`/classes/studentbooked/${id}`)
    return res
  } catch (error) {
    console.error('PatchStudentClassesBookedData Failed:', error)
    throw error
  }
}

// 學生個人頁 - 學生上完的所有課程 ，依照最近上完課程新到舊排序
export const getAllStudentCompletedClassesData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/${id}/completed`)
    return res
  } catch (error) {
    console.error('GetAllStudentCompletedClassesData Failed:', error)
    throw error
  }
}

// 學生個人頁 - 增加一則評論
export const postComments = async ({ id, classId, text, score }) => {
  try {
    const res = await apiWithToken.put(`/comments/${id}`, { classId, text, score })
    return res
  } catch (error) {
    console.error('PostComments Failed:', error)
    throw error
  }
}

// 學生頁 - 新增一筆學生資料
export const postToBeAStudents = async ({ data }) => {
  try {
    const res = await apiWithTokenByFormData.post('/students', data)
    return res
  } catch (error) {
    console.error('PostToBeAStudents Failed:', error)
    throw error
  }
}

// 學生頁 - 編輯筆學生資料
export const putToBeAStudents = async ({ id, data }) => {
  try {
    const res = await apiWithTokenByFormData.put(`/students/${id}`, data)
    return res
  } catch (error) {
    console.error('PutToBeAStudents Failed:', error)
    throw error
  }
}

// 課程管理 - 取得一位老師開設的兩週課程，課程由最近開始排序
export const getClassManagementData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/:${id}`)
    return res
  } catch (error) {
    console.error('GetClassManagementData Failed:', error)
    throw error
  }
}

// 課程管理 - 一次新增一堂課程
export const postClasses = async ({ name, dateTimeRange, category }) => {
  try {
    const res = await apiWithToken.post('/classes', { name, dateTimeRange, category })
    return res
  } catch (error) {
    console.error('PostClasses Failed:', error)
    throw error
  }
}

// 課程管理 - 一次修改一堂課
export const putClasses = async ({ id, name, dateTimeRange, category }) => {
  try {
    const res = await apiWithToken.put(`/classes/${id}`, { name, dateTimeRange, category })
    return res
  } catch (error) {
    console.error('PutClasses Failed:', error)
    throw error
  }
}

// 課程管理 - 一次刪除一堂課
export const deleteClasses = async ({ id }) => {
  try {
    const res = await apiWithToken.delete(`/classes/${id}`)
    return res
  } catch (error) {
    console.error('DeleteClasses Failed:', error)
    throw error
  }
}

// 取得課程歷史對話紀錄
export const getClassHistoryData = async ({ id }) => {
  try {
    const res = await apiWithToken.get(`/classes/history/${id}`)
    return res
  } catch (error) {
    console.error('GetClassHistoryData Failed:', error)
    throw error
  }
}

// 取得課程歷史對話紀錄
export const getAdminDashBoardData = async () => {
  try {
    const res = await apiWithToken.get('/admin/users')
    return res
  } catch (error) {
    console.error('GetAdminDashBoardData Failed:', error)
    throw error
  }
}

// 取得課程歷史對話紀錄
export const patchCompleteClasses = async ({ id }) => {
  try {
    const res = await apiWithToken.patch(`/classes/${id}/completed`)
    return res
  } catch (error) {
    console.error('PatchCompleteClasses Failed:', error)
    throw error
  }
}

// 訂閱電子報
export const postSubscribe = async ({ id, email }) => {
  try {
    const res = await apiWithToken.post(`/submail/${id}`, { subMail: email })
    return res
  } catch (error) {
    console.error('PostSubscribe Failed:', error)
    throw error
  }
}

// 發送電子報
export const postNews = async ({ id }) => {
  try {
    const res = await apiWithToken.post(`/submail/${id}/send`)
    return res
  } catch (error) {
    console.error('PostNews Failed:', error)
    throw error
  }
}
