import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CENTER } from '../data/center'

const NAV = [
  { to: '/about', label: '센터소개' },
  { to: '/courses', label: '교육과정' },
  { to: '/recruitment', label: '모집공고' },
]

export default function Header() {
  const { user, profile, isInstructor, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  const handleSignOut = async () => { await signOut(); nav('/') }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">AI</span>
          <span className="brand__text">
            <strong>{CENTER.name}</strong>
            <em>{CENTER.org}</em>
          </span>
        </Link>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="site-nav__link" onClick={() => setOpen(false)}>
              {n.label}
            </NavLink>
          ))}
          {isInstructor && (
            <NavLink to="/admin" className="site-nav__link" onClick={() => setOpen(false)}>강의개설</NavLink>
          )}

          <div className="site-nav__auth">
            {user ? (
              <>
                <NavLink to="/mypage" className="site-nav__link" onClick={() => setOpen(false)}>
                  마이페이지
                </NavLink>
                <span className="site-nav__user">{profile?.name || '회원'}님</span>
                <button className="btn btn--ghost btn--sm" onClick={handleSignOut}>로그아웃</button>
              </>
            ) : (
              <Link to="/login" className="btn btn--primary btn--sm" onClick={() => setOpen(false)}>
                로그인 / 신청
              </Link>
            )}
          </div>
        </nav>

        <button
          className="site-header__toggle"
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
