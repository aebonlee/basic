import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchRecruitment, fetchCourse } from '../lib/api'
import { STATUS_META } from '../data/sampleCourses'
import { categoryLabel, categoryColor } from '../data/center'

export default function RecruitmentDetail() {
  const { id } = useParams()
  const [rec, setRec] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetchRecruitment(id).then(async (r) => {
      if (!alive) return
      setRec(r)
      if (r?.course_id) setCourse(await fetchCourse(r.course_id))
      setLoading(false)
    })
    return () => { alive = false }
  }, [id])

  if (loading) return <div className="spinner-wrap">불러오는 중…</div>
  if (!rec) return (
    <div className="container section center">
      <h2>모집공고를 찾을 수 없습니다</h2>
      <Link to="/recruitment" className="btn btn--ghost">모집공고로</Link>
    </div>
  )

  const meta = STATUS_META[rec.status] || STATUS_META.closed
  const ratio = rec.capacity ? Math.min(100, Math.round((rec.applied / rec.capacity) * 100)) : 0
  const canApply = rec.status === 'open'

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span className={`pill pill--${meta.pill}`}>{meta.label}</span>
            <span className="pill pill--surface">{rec.region}</span>
            {course && <span className={`pill pill--${categoryColor(course.category)}`}>{categoryLabel(course.category)}</span>}
          </div>
          <h1>{rec.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-main">
            <h2>모집 개요</h2>
            <p style={{ color: 'var(--kdn-fg-muted)', lineHeight: 1.8 }}>
              {course ? course.summary : '본 과정의 모집 안내입니다.'}
            </p>

            {course?.outline?.length > 0 && (
              <>
                <h2>커리큘럼</h2>
                <ul>{course.outline.map((o, i) => <li key={i}>{o}</li>)}</ul>
              </>
            )}

            <h2>모집 정보</h2>
            <ul>
              <li>교육기간: {rec.start_date} ~ {rec.end_date}</li>
              <li>접수마감: {rec.apply_deadline}</li>
              <li>수업일정: {rec.schedule_text}</li>
              <li>장소: {rec.place}</li>
              <li>정원: {rec.capacity}명{rec.status !== 'upcoming' ? ` (현재 ${rec.applied}명 신청, ${ratio}%)` : ''}</li>
            </ul>

            {course && (
              <p style={{ marginTop: 24 }}>
                연계 과정: <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </p>
            )}
          </div>

          <aside className="detail-aside">
            <div className="aside-card">
              <dl>
                <div><dt>상태</dt><dd>{meta.label}</dd></div>
                <div><dt>지역</dt><dd>{rec.region}</dd></div>
                <div><dt>접수마감</dt><dd>{rec.apply_deadline}</dd></div>
                <div><dt>정원</dt><dd>{rec.capacity}명</dd></div>
                {course && <div><dt>수강료</dt><dd>{course.fee ? `${course.fee.toLocaleString()}원` : '무료'}</dd></div>}
              </dl>
              {canApply ? (
                <Link to={`/enroll/${rec.id}`} className="btn btn--primary btn--block">수강 신청하기</Link>
              ) : rec.status === 'upcoming' ? (
                <button className="btn btn--ghost btn--block" disabled>모집 예정</button>
              ) : (
                <button className="btn btn--ghost btn--block" disabled>모집 마감</button>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
