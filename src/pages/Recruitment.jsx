import { useEffect, useState } from 'react'
import { fetchRecruitments } from '../lib/api'
import { RecruitmentCard } from '../components/Cards'
import { STATUS_META } from '../data/sampleCourses'

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'open', label: '모집중' },
  { key: 'upcoming', label: '모집예정' },
  { key: 'closed', label: '모집마감' },
]

export default function Recruitment() {
  const [recs, setRecs] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecruitments().then((d) => {
      const order = { open: 0, upcoming: 1, closed: 2 }
      d.sort((a, b) => (order[a.status] - order[b.status]))
      setRecs(d); setLoading(false)
    })
  }, [])

  const list = filter === 'all' ? recs : recs.filter((r) => r.status === filter)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">RECRUITMENT</p>
          <h1>모집공고</h1>
          <p>지역별·과정별 모집 일정을 확인하고 신청하세요. 모집중인 과정은 바로 신청할 수 있습니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tabs">
            {FILTERS.map((f) => (
              <button key={f.key} className={`tab ${filter === f.key ? 'is-active' : ''}`} onClick={() => setFilter(f.key)}>
                {f.label}
                {f.key !== 'all' && (
                  <span style={{ marginLeft: 6, opacity: .7 }}>
                    {recs.filter((r) => r.status === f.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner-wrap">불러오는 중…</div>
          ) : list.length ? (
            <div className="grid grid-3">
              {list.map((r) => <RecruitmentCard key={r.id} rec={r} />)}
            </div>
          ) : (
            <p className="center muted">{STATUS_META[filter]?.label || '해당'} 공고가 없습니다.</p>
          )}
        </div>
      </section>
    </>
  )
}
