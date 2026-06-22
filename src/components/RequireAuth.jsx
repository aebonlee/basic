import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// role: 'instructor' 지정 시 강사/관리자만 허용
export default function RequireAuth({ children, role }) {
  const { user, loading, isInstructor } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="spinner-wrap">불러오는 중…</div>
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (role === 'instructor' && !isInstructor) {
    return (
      <div className="container section center">
        <h2>접근 권한이 없습니다</h2>
        <p className="muted">강의 개설은 강사 또는 관리자 권한이 필요합니다.</p>
      </div>
    )
  }
  return children
}
