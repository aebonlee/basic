import { useEffect, useState } from 'react'
import { fetchCourses } from '../lib/api'
import { CourseCard } from '../components/Cards'
import { CATEGORIES } from '../data/center'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses().then((d) => { setCourses(d); setLoading(false) })
  }, [])

  const list = filter === 'all' ? courses : courses.filter((c) => c.category === filter)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">COURSES</p>
          <h1>교육과정</h1>
          <p>AI강사 양성과정, AI 활용 교육, 관공서 기초교육까지 — 목적에 맞는 과정을 찾아보세요.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tabs">
            <button className={`tab ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>전체</button>
            {CATEGORIES.map((c) => (
              <button key={c.key} className={`tab ${filter === c.key ? 'is-active' : ''}`} onClick={() => setFilter(c.key)}>
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner-wrap">불러오는 중…</div>
          ) : list.length ? (
            <div className="grid grid-3">
              {list.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          ) : (
            <p className="center muted">해당 분류의 과정이 없습니다.</p>
          )}
        </div>
      </section>
    </>
  )
}
