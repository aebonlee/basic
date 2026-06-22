import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchMyEnrollments } from '../lib/api'

const STATUS_LABEL = {
  pending: { label: '심사중', pill: 'warn' },
  approved: { label: '승인', pill: 'success' },
  rejected: { label: '반려', pill: 'muted' },
  done: { label: '수료', pill: 'accent' },
}

export default function MyPage() {
  const { user, profile } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    fetchMyEnrollments(user.id)
      .then(setRows)
      .catch((e) => setError(e?.message || '불러오기 실패'))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">MY PAGE</p>
          <h1>{profile?.name || '회원'}님의 마이페이지</h1>
          <p>{profile?.email} · {profile?.role === 'admin' ? '관리자' : profile?.role === 'instructor' ? '강사' : '수강생'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title-rule">내 수강신청 현황</h2>

          {loading ? (
            <div className="spinner-wrap">불러오는 중…</div>
          ) : error ? (
            <div className="alert alert--danger">신청 내역을 불러오지 못했습니다. ({error})</div>
          ) : rows.length === 0 ? (
            <div className="card center" style={{ padding: 48 }}>
              <p className="muted" style={{ marginBottom: 18 }}>아직 신청한 과정이 없습니다.</p>
              <Link to="/recruitment" className="btn btn--primary">모집공고 보러가기</Link>
            </div>
          ) : (
            <div className="card">
              {rows.map((r) => {
                const st = STATUS_LABEL[r.status] || STATUS_LABEL.pending
                return (
                  <div className="enroll-row" key={r.id}>
                    <div>
                      <div className="enroll-row__title">{r.recruitment_title || r.course_title || '과정'}</div>
                      <div className="enroll-row__sub">
                        {r.region ? `${r.region} · ` : ''}신청일 {new Date(r.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <span className={`pill pill--${st.pill}`}>{st.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
