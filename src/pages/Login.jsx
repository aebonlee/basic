import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, signInWith } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from || '/mypage'

  useEffect(() => { if (user) nav(from, { replace: true }) }, [user, from, nav])

  return (
    <div className="container">
      <div className="auth-wrap">
        <div className="auth-card">
          <h1>로그인</h1>
          <p>AI교육센터에 로그인하고 과정을 신청하세요.</p>

          <button className="oauth-btn oauth-btn--google" onClick={() => signInWith('google')}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.4 30.4 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.98 6.19C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.15-3.13-.43-4.6H24v9.02h12.4c-.54 2.9-2.16 5.36-4.6 7.02l7.06 5.48C43.6 37.4 46.1 31.5 46.1 24.5z"/><path fill="#FBBC05" d="M10.48 28.49a14.5 14.5 0 0 1 0-9l-7.98-6.19a24 24 0 0 0 0 21.38l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.4 0 11.78-2.12 15.7-5.76l-7.06-5.48c-2 1.35-4.6 2.14-8.64 2.14-6.3 0-11.6-4.2-13.52-9.98l-7.98 6.19C6.4 42.6 14.6 48 24 48z"/></svg>
            Google 계정으로 로그인
          </button>

          <button className="oauth-btn oauth-btn--kakao" onClick={() => signInWith('kakao')}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#191600" d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6-.2.7-.7 2.6-.8 3-.1.5.2.5.4.4.2-.1 2.6-1.8 3.6-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.5 10-7.8S17.5 3 12 3z"/></svg>
            카카오로 로그인
          </button>

          <p style={{ fontSize: 12.5, marginTop: 20, marginBottom: 0 }}>
            로그인 시 <Link to="/about">이용약관 및 개인정보 처리방침</Link>에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
