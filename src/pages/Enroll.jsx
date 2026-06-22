import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchRecruitment, fetchCourse, applyEnrollment } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Enroll() {
  const { recruitmentId } = useParams()
  const { user, profile } = useAuth()
  const nav = useNavigate()

  const [rec, setRec] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', motivation: '' })

  useEffect(() => {
    fetchRecruitment(recruitmentId).then(async (r) => {
      setRec(r)
      if (r?.course_id) setCourse(await fetchCourse(r.course_id))
      setLoading(false)
    })
  }, [recruitmentId])

  useEffect(() => {
    if (profile) setForm((f) => ({ ...f, name: f.name || profile.name || '', email: f.email || profile.email || '' }))
  }, [profile])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.phone) { setError('이름·이메일·연락처는 필수입니다.'); return }
    setSubmitting(true)
    try {
      await applyEnrollment({ recruitment: rec, course, user, form })
      setDone(true)
    } catch (err) {
      setError('신청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. (' + (err?.message || 'error') + ')')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="spinner-wrap">불러오는 중…</div>
  if (!rec) return (
    <div className="container section center">
      <h2>모집공고를 찾을 수 없습니다</h2>
      <Link to="/recruitment" className="btn btn--ghost">모집공고로</Link>
    </div>
  )

  if (done) return (
    <div className="container section">
      <div className="form-card center">
        <div style={{ fontSize: 44, marginBottom: 8 }}>✅</div>
        <h1>신청이 접수되었습니다</h1>
        <p className="muted">「{rec.title}」 신청이 정상 접수되었습니다. 심사 후 안내드리겠습니다.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <Link to="/mypage" className="btn btn--primary">내 신청 현황</Link>
          <Link to="/recruitment" className="btn btn--ghost">다른 과정 보기</Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">ENROLLMENT</p>
          <h1>수강 신청</h1>
          <p>{rec.title}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="form-card" onSubmit={submit}>
            {error && <div className="alert alert--danger">{error}</div>}

            <div className="alert alert--info" style={{ marginBottom: 24 }}>
              <strong>{rec.title}</strong><br />
              교육기간 {rec.start_date} ~ {rec.end_date} · 접수마감 {rec.apply_deadline} · {rec.region}
            </div>

            <div className="field">
              <label>이름 *</label>
              <input className="input" value={form.name} onChange={update('name')} placeholder="홍길동" />
            </div>
            <div className="field">
              <label>이메일 *</label>
              <input className="input" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label>연락처 *</label>
              <input className="input" value={form.phone} onChange={update('phone')} placeholder="010-0000-0000" />
            </div>
            <div className="field">
              <label>지원 동기 / 메모</label>
              <textarea className="textarea" value={form.motivation} onChange={update('motivation')} placeholder="간단한 지원 동기나 문의사항을 남겨 주세요." />
              <div className="hint">선택 입력입니다.</div>
            </div>

            <button className="btn btn--primary btn--block" disabled={submitting}>
              {submitting ? '접수 중…' : '신청 제출'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
