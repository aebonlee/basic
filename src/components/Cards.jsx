import { Link } from 'react-router-dom'
import { categoryLabel, categoryColor } from '../data/center'
import { STATUS_META } from '../data/sampleCourses'

export function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="course-card card card--hover">
      <span className="course-card__cover" style={{ background: course.cover || 'var(--kdn-accent)' }}>
        <span className={`pill pill--${categoryColor(course.category)}`}>{categoryLabel(course.category)}</span>
      </span>
      <h3 className="course-card__title">{course.title}</h3>
      <p className="course-card__summary">{course.summary}</p>
      <div className="course-card__meta">
        <span>📍 {course.region}</span>
        <span>⏱ {course.hours}시간 · {course.weeks}주</span>
      </div>
    </Link>
  )
}

export function RecruitmentCard({ rec }) {
  const meta = STATUS_META[rec.status] || STATUS_META.closed
  const ratio = rec.capacity ? Math.min(100, Math.round((rec.applied / rec.capacity) * 100)) : 0
  return (
    <Link to={`/recruitment/${rec.id}`} className="rec-card card card--hover">
      <div className="rec-card__top">
        <span className={`pill pill--${meta.pill}`}>{meta.label}</span>
        <span className="pill pill--surface">{rec.region}</span>
      </div>
      <h3 className="rec-card__title">{rec.title}</h3>
      <dl className="rec-card__info">
        <div><dt>교육기간</dt><dd>{rec.start_date} ~ {rec.end_date}</dd></div>
        <div><dt>접수마감</dt><dd>{rec.apply_deadline}</dd></div>
        <div><dt>일정</dt><dd>{rec.schedule_text}</dd></div>
      </dl>
      {rec.status !== 'upcoming' && (
        <div className="rec-card__bar">
          <div className="rec-card__bar-fill" style={{ width: `${ratio}%` }} />
          <span className="rec-card__bar-label">{rec.applied}/{rec.capacity}명 ({ratio}%)</span>
        </div>
      )}
    </Link>
  )
}
