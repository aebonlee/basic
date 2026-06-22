import { createClient } from '@supabase/supabase-js'

// 공용 Supabase 프로젝트(hcmgdztsgjvzcyxyayaj).
// 인증 사이트는 클린 빌드(시크릿 미주입) 시에도 로그인이 깨지지 않도록
// URL/anon key 실제값을 fallback 으로 하드코딩한다. anon key 는 공개용 키다.
const FALLBACK_URL = 'https://hcmgdztsgjvzcyxyayaj.supabase.co'
const FALLBACK_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbWdkenRzZ2p2emN5eHlheWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzU4ODcsImV4cCI6MjA4NzAxMTg4N30.gznaPzY1l8qDAPsEyYNR9KS7f7VqS3xaw-_2HTSwSZw'

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// 이 프로젝트의 모든 테이블 접두사
export const PREFIX = 'basic_'
export const T = {
  profiles: `${PREFIX}profiles`,
  courses: `${PREFIX}courses`,
  recruitments: `${PREFIX}recruitments`,
  enrollments: `${PREFIX}enrollments`,
}
