import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section center" style={{ padding: '120px 0' }}>
      <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--kdn-accent)' }}>404</div>
      <h1 style={{ marginTop: 8 }}>페이지를 찾을 수 없습니다</h1>
      <p className="muted">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>홈으로</Link>
    </div>
  )
}
