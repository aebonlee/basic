import { Link } from 'react-router-dom'
import { CENTER } from '../data/center'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <div className="brand brand--footer">
            <span className="brand__mark">AI</span>
            <span className="brand__text">
              <strong>{CENTER.name}</strong>
              <em>{CENTER.org}</em>
            </span>
          </div>
          <p>{CENTER.fullName}는 지역 AI강사 양성과 시민·공공의 AI 활용 역량 강화를 위해 교육을 기획·운영합니다.</p>
        </div>

        <div className="site-footer__cols">
          <div>
            <h4>바로가기</h4>
            <Link to="/about">센터소개</Link>
            <Link to="/courses">교육과정</Link>
            <Link to="/recruitment">모집공고</Link>
            <Link to="/mypage">마이페이지</Link>
          </div>
          <div>
            <h4>문의</h4>
            <span>{CENTER.tel}</span>
            <span>{CENTER.email}</span>
            <span>{CENTER.address}</span>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} {CENTER.org} {CENTER.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
