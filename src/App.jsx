import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Recruitment from './pages/Recruitment'
import RecruitmentDetail from './pages/RecruitmentDetail'
import Enroll from './pages/Enroll'
import MyPage from './pages/MyPage'
import Admin from './pages/Admin'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="recruitment/:id" element={<RecruitmentDetail />} />
          <Route path="enroll/:recruitmentId" element={<RequireAuth><Enroll /></RequireAuth>} />
          <Route path="mypage" element={<RequireAuth><MyPage /></RequireAuth>} />
          <Route path="admin" element={<RequireAuth role="instructor"><Admin /></RequireAuth>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </>
  )
}
