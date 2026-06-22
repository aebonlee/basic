import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCourse, fetchRecruitments } from '../lib/api'
import { categoryLabel, categoryColor } from '../data/center'
import { RecruitmentCard } from '../components/Cards'

export default function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    Promise.all([fetchCourse(id), fetchRecruitments()]).then(([c, rs]) => {
      if (!alive) return
      setCourse(c)
      setRecs(rs.filter((r) => String(r.course_id) === String(id)))
      setLoading(false)
    })
    return () => { alive = false }
  }, [id])

  if (loading) return <div className="spinner-wrap">불러오는 중…</div>
  if (!course) return (
    <div className="container section center">
      <h2>과정을 찾을 수 없습니다</h2>
      <Link to="/courses" className="btn btn--ghost">교육과정으로</Link>
    </div>
  )

  const openRec = recs.find((r) => r.status === 'open')

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className={`pill pill--${categoryColor(course.category)}`}>{categoryLabel(course.category)}</span>
          <h1 style={{ marginTop: 14 }}>{course.title}</h1>
          <p>{course.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-main">
            <h2>과정 개요</h2>
            <p style={{ color: 'var(--kdn-fg-muted)', lineHeight: 1.8 }}>{course.summary}</p>

            {course.outline?.length > 0 && (
              <>
                <h2>커리큘럼</h2>
                <ul>{course.outline.map((o, i) => <li key={i}>{o}</li>)}</ul>
              </>
            )}

            <h2>모집 일정</h2>
            {recs.length ? (
              <div className="grid grid-2">
                {recs.map((r) => <RecruitmentCard key={r.id} rec={r} />)}
              </div>
            ) : (
              <p className="muted">현재 예정된 모집이 없습니다. 모집 시작 시 공고됩니다.</p>
            )}
          </div>

          <aside className="detail-aside">
            <div className="aside-card">
              <dl>
                <div><dt>분류</dt><dd>{categoryLabel(course.category)}</dd></div>
                <div><dt>지역</dt><dd>{course.region}</dd></div>
                <div><dt>교육시간</dt><dd>{course.hours}시간</dd></div>
                <div><dt>기간</dt><dd>{course.weeks}주</dd></div>
                <div><dt>수준</dt><dd>{course.level}</dd></div>
                <div><dt>대상</dt><dd>{course.target}</dd></div>
                <div><dt>수강료</dt><dd>{course.fee ? `${course.fee.toLocaleString()}원` : '무료'}</dd></div>
              </dl>
              {openRec ? (
                <Link to={`/recruitment/${openRec.id}`} className="btn btn--primary btn--block">모집중 — 신청하기</Link>
              ) : (
                <Link to="/recruitment" className="btn btn--ghost btn--block">모집공고 보기</Link>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
