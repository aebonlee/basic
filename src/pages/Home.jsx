import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CENTER, PILLARS, STATS } from '../data/center'
import { fetchCourses, fetchRecruitments } from '../lib/api'
import { CourseCard, RecruitmentCard } from '../components/Cards'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [recs, setRecs] = useState([])

  useEffect(() => {
    fetchCourses().then((d) => setCourses(d.slice(0, 3)))
    fetchRecruitments().then((d) =>
      setRecs(d.filter((r) => r.status === 'open').concat(d.filter((r) => r.status === 'upcoming')).slice(0, 3))
    )
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__tags">
            <span className="pill pill--hero">AI강사 양성</span>
            <span className="pill pill--hero">AI 활용 교육</span>
            <span className="pill pill--hero">관공서 기초교육</span>
          </div>
          <h1>{CENTER.tagline}</h1>
          <p>{CENTER.intro}</p>
          <div className="hero__cta">
            <Link to="/recruitment" className="btn btn--white">모집중인 과정 보기</Link>
            <Link to="/about" className="btn btn--ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>센터 소개</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat__num">{s.num}<span>{s.unit}</span></div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">사업영역</p>
            <h2>세 갈래로 펼치는 AI 교육</h2>
            <p>양성 · 활용 · 공공, 지역 현장의 필요에 맞춰 교육을 기획하고 운영합니다.</p>
          </div>
          <div className="grid grid-3">
            {PILLARS.map((p) => (
              <div className="card pillar" key={p.key}>
                <div className="pillar__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 모집중 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">RECRUITMENT</p>
            <h2>지금 모집중인 과정</h2>
            <p>마감 전 신청하세요. 지역·일정·정원을 확인할 수 있습니다.</p>
          </div>
          {recs.length > 0 ? (
            <div className="grid grid-3">
              {recs.map((r) => <RecruitmentCard key={r.id} rec={r} />)}
            </div>
          ) : (
            <p className="center muted">현재 모집중인 과정이 없습니다.</p>
          )}
          <div className="center" style={{ marginTop: 36 }}>
            <Link to="/recruitment" className="btn btn--dark">모집공고 전체보기</Link>
          </div>
        </div>
      </section>

      {/* 주요 과정 */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">COURSES</p>
            <h2>대표 교육과정</h2>
            <p>입문부터 강사 양성까지, 단계별로 설계된 커리큘럼.</p>
          </div>
          <div className="grid grid-3">
            {courses.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
          <div className="center" style={{ marginTop: 36 }}>
            <Link to="/courses" className="btn btn--dark">교육과정 전체보기</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero">
        <div className="container hero__inner" style={{ maxWidth: '100%', textAlign: 'center', paddingTop: 72, paddingBottom: 72 }}>
          <h1 style={{ fontSize: 36 }}>강사가 되고 싶거나,<br />기관 교육이 필요하신가요?</h1>
          <p style={{ margin: '0 auto 28px', maxWidth: 560 }}>AI강사 양성과정 신청부터 관공서 단체교육 문의까지, 지금 시작하세요.</p>
          <div className="hero__cta" style={{ justifyContent: 'center' }}>
            <Link to="/recruitment" className="btn btn--white">과정 신청하기</Link>
            <a href={`mailto:${CENTER.email}`} className="btn btn--ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>단체교육 문의</a>
          </div>
        </div>
      </section>
    </>
  )
}
