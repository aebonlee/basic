import { CENTER, PILLARS, STATS } from '../data/center'

const VISION = [
  { icon: '🌍', title: '지역', desc: '수도권에 집중된 AI 교육 기회를 전국 17개 지역으로 넓혀, 어디서나 배우고 가르칠 수 있게 합니다.' },
  { icon: '🤝', title: '기본', desc: '기본사회의 가치 아래, 누구도 기술에서 소외되지 않도록 AI 리터러시를 공공재로 제공합니다.' },
  { icon: '🚀', title: '실전', desc: '이론에 그치지 않고 현장에서 바로 가르치고 활용하는 실전형 교육을 지향합니다.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">{CENTER.org}</p>
          <h1>{CENTER.name} 소개</h1>
          <p>{CENTER.fullName}는 모두를 위한 인공지능 교육을 지역에서 실현합니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title-rule">미션</h2>
          <p style={{ fontSize: 19, lineHeight: 1.8, color: 'var(--kdn-fg-muted)', maxWidth: 820 }}>
            {CENTER.intro} 우리는 AI강사를 양성해 교육의 토대를 만들고, 시민과 재직자가 인공지능을 일상과 업무에
            활용하도록 돕고, 공공기관 구성원이 갖춰야 할 AI 기초 역량을 표준 교육으로 보장합니다.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">VISION</p>
            <h2>우리가 지향하는 가치</h2>
          </div>
          <div className="grid grid-3">
            {VISION.map((v) => (
              <div className="card pillar" key={v.title}>
                <div className="pillar__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">사업영역</p>
            <h2>세 갈래 교육 체계</h2>
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

      <section className="section section--surface">
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

      <section className="section">
        <div className="container">
          <h2 className="section-title-rule">찾아오시는 길 · 문의</h2>
          <div className="card" style={{ maxWidth: 640 }}>
            <dl className="aside-card__dl" style={{ display: 'grid', gap: 14, margin: 0 }}>
              <div style={{ display: 'flex', gap: 16 }}><dt style={{ width: 80, color: 'var(--kdn-fg-disabled)' }}>주소</dt><dd style={{ margin: 0, fontWeight: 600 }}>{CENTER.address}</dd></div>
              <div style={{ display: 'flex', gap: 16 }}><dt style={{ width: 80, color: 'var(--kdn-fg-disabled)' }}>전화</dt><dd style={{ margin: 0, fontWeight: 600 }}>{CENTER.tel}</dd></div>
              <div style={{ display: 'flex', gap: 16 }}><dt style={{ width: 80, color: 'var(--kdn-fg-disabled)' }}>이메일</dt><dd style={{ margin: 0, fontWeight: 600 }}>{CENTER.email}</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
