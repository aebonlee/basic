# 기본사회위원회 AI교육센터

기본사회위원회 산하 AI교육센터 공식 사이트. 전국 지역의 **AI강사 양성과정**, 시민·재직자 대상 **AI 활용 교육**, **관공서 기초교육**의 기획·모집·개설을 한 곳에서 운영합니다.

- 운영 도메인: https://basic.dreamitbiz.com
- 디자인: 가온시큐어 KDN 디자인 시스템 (딥네이비 #1B2A4A + 로열블루 #0046C8, Pretendard)

## 기능

| 영역 | 내용 |
| --- | --- |
| 센터소개 | 미션·비전, 3대 사업영역, 통계, 문의 |
| 교육과정 | 분류별(강사양성/AI활용/관공서기초) 과정 목록·상세·커리큘럼 |
| 모집공고 | 모집중/예정/마감 필터, 지역·일정·정원, 신청률 |
| 수강신청 | 로그인 후 신청, Supabase 저장, 마이페이지 현황 |
| 강의개설 | 강사·관리자용 과정/모집공고 등록 |
| 로그인 | 구글·카카오 OAuth (Supabase Auth), 수강생/강사/관리자 역할 |

## 기술 스택

React 18 · Vite 5 · React Router 6 · Supabase (Auth + DB)

## 개발

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

## 환경변수

```
VITE_SUPABASE_URL=https://hcmgdztsgjvzcyxyayaj.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

> 미설정 시 `src/lib/supabase.js` 의 공개 fallback 값으로 동작합니다(인증 사이트 안전장치).

## Supabase

테이블 접두사 `basic_`. 스키마/RLS 는 [`docs/schema.sql`](docs/schema.sql) 참고.

- `basic_profiles` (역할), `basic_courses`, `basic_recruitments`, `basic_enrollments`
- 테이블이 비어 있으면 `src/data/sampleCourses.js` 샘플로 폴백 렌더됩니다.
- OAuth: Supabase Auth 에서 Google·Kakao 활성화, Redirect 에 `https://basic.dreamitbiz.com/auth/callback` 등록.

## 배포

`main` 브랜치 push 시 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 GitHub Pages 로 배포합니다.
저장소 Secrets 에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 등록 필요. 커스텀 도메인은 `public/CNAME`.
