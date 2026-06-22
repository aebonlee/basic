import { useState } from 'react'
import { createCourse, createRecruitment } from '../lib/api'
import { CATEGORIES } from '../data/center'
import { useAuth } from '../context/AuthContext'

const emptyCourse = { category: 'instructor', title: '', summary: '', region: '', hours: 8, weeks: 1, level: '', target: '', fee: 0 }
const emptyRec = { course_id: '', title: '', region: '', status: 'upcoming', start_date: '', end_date: '', apply_deadline: '', capacity: 30, place: '', schedule_text: '' }

export default function Admin() {
  const { profile } = useAuth()
  const [tab, setTab] = useState('course')
  const [course, setCourse] = useState(emptyCourse)
  const [rec, setRec] = useState(emptyRec)
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const cField = (k) => (e) => setCourse((c) => ({ ...c, [k]: e.target.value }))
  const rField = (k) => (e) => setRec((r) => ({ ...r, [k]: e.target.value }))

  const submitCourse = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null)
    try {
      const payload = { ...course, hours: Number(course.hours), weeks: Number(course.weeks), fee: Number(course.fee), created_by: profile?.id }
      await createCourse(payload)
      setMsg({ type: 'success', text: '과정이 개설되었습니다.' }); setCourse(emptyCourse)
    } catch (err) {
      setMsg({ type: 'danger', text: '저장 실패: ' + (err?.message || 'error') + ' (basic_courses 테이블/권한 확인 필요)' })
    } finally { setBusy(false) }
  }

  const submitRec = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null)
    try {
      const payload = { ...rec, capacity: Number(rec.capacity), applied: 0, created_by: profile?.id }
      await createRecruitment(payload)
      setMsg({ type: 'success', text: '모집공고가 등록되었습니다.' }); setRec(emptyRec)
    } catch (err) {
      setMsg({ type: 'danger', text: '저장 실패: ' + (err?.message || 'error') + ' (basic_recruitments 테이블/권한 확인 필요)' })
    } finally { setBusy(false) }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">ADMIN</p>
          <h1>강의 개설</h1>
          <p>교육과정과 모집공고를 등록합니다. 강사·관리자만 이용할 수 있습니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tabs">
            <button className={`tab ${tab === 'course' ? 'is-active' : ''}`} onClick={() => setTab('course')}>과정 개설</button>
            <button className={`tab ${tab === 'rec' ? 'is-active' : ''}`} onClick={() => setTab('rec')}>모집공고 등록</button>
          </div>

          {msg && <div className={`alert alert--${msg.type}`} style={{ maxWidth: 640, margin: '0 auto 18px' }}>{msg.text}</div>}

          {tab === 'course' ? (
            <form className="form-card" onSubmit={submitCourse}>
              <div className="field">
                <label>분류 *</label>
                <select className="select" value={course.category} onChange={cField('category')}>
                  {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <div className="field"><label>과정명 *</label><input className="input" value={course.title} onChange={cField('title')} required /></div>
              <div className="field"><label>한 줄 소개 *</label><textarea className="textarea" value={course.summary} onChange={cField('summary')} required /></div>
              <div className="grid grid-2">
                <div className="field"><label>지역</label><input className="input" value={course.region} onChange={cField('region')} placeholder="서울 / 전국(온라인)" /></div>
                <div className="field"><label>대상</label><input className="input" value={course.target} onChange={cField('target')} /></div>
              </div>
              <div className="grid grid-3">
                <div className="field"><label>교육시간</label><input className="input" type="number" value={course.hours} onChange={cField('hours')} /></div>
                <div className="field"><label>주차</label><input className="input" type="number" value={course.weeks} onChange={cField('weeks')} /></div>
                <div className="field"><label>수강료(원)</label><input className="input" type="number" value={course.fee} onChange={cField('fee')} /></div>
              </div>
              <div className="field"><label>수준</label><input className="input" value={course.level} onChange={cField('level')} placeholder="입문 / 중급 / 심화" /></div>
              <button className="btn btn--primary btn--block" disabled={busy}>{busy ? '저장 중…' : '과정 개설'}</button>
            </form>
          ) : (
            <form className="form-card" onSubmit={submitRec}>
              <div className="field"><label>연계 과정 ID</label><input className="input" value={rec.course_id} onChange={rField('course_id')} placeholder="crs-... (선택)" /><div className="hint">기존 과정과 연결하려면 과정 ID를 입력하세요.</div></div>
              <div className="field"><label>공고명 *</label><input className="input" value={rec.title} onChange={rField('title')} required /></div>
              <div className="grid grid-2">
                <div className="field"><label>지역</label><input className="input" value={rec.region} onChange={rField('region')} /></div>
                <div className="field">
                  <label>상태</label>
                  <select className="select" value={rec.status} onChange={rField('status')}>
                    <option value="upcoming">모집예정</option>
                    <option value="open">모집중</option>
                    <option value="closed">모집마감</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-3">
                <div className="field"><label>교육 시작일</label><input className="input" type="date" value={rec.start_date} onChange={rField('start_date')} /></div>
                <div className="field"><label>교육 종료일</label><input className="input" type="date" value={rec.end_date} onChange={rField('end_date')} /></div>
                <div className="field"><label>접수 마감일</label><input className="input" type="date" value={rec.apply_deadline} onChange={rField('apply_deadline')} /></div>
              </div>
              <div className="grid grid-2">
                <div className="field"><label>정원</label><input className="input" type="number" value={rec.capacity} onChange={rField('capacity')} /></div>
                <div className="field"><label>장소</label><input className="input" value={rec.place} onChange={rField('place')} /></div>
              </div>
              <div className="field"><label>수업 일정</label><input className="input" value={rec.schedule_text} onChange={rField('schedule_text')} placeholder="매주 화·목 19:00–22:00" /></div>
              <button className="btn btn--primary btn--block" disabled={busy}>{busy ? '저장 중…' : '모집공고 등록'}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
