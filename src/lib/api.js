import { supabase, T } from './supabase'
import { SAMPLE_COURSES, SAMPLE_RECRUITMENTS } from '../data/sampleCourses'

// Supabase 테이블에서 조회하되, 테이블이 비었거나 미구성이면 샘플 데이터로 폴백한다.
// 어떤 경우에도 사이트가 의미 있게 렌더되도록 한다.

export async function fetchCourses() {
  try {
    const { data, error } = await supabase.from(T.courses).select('*').order('created_at', { ascending: false })
    if (error) throw error
    if (data && data.length) return data
  } catch {
    /* 폴백 */
  }
  return SAMPLE_COURSES
}

export async function fetchCourse(id) {
  const all = await fetchCourses()
  return all.find((c) => String(c.id) === String(id)) || null
}

export async function fetchRecruitments() {
  try {
    const { data, error } = await supabase.from(T.recruitments).select('*').order('start_date', { ascending: true })
    if (error) throw error
    if (data && data.length) return data
  } catch {
    /* 폴백 */
  }
  return SAMPLE_RECRUITMENTS
}

export async function fetchRecruitment(id) {
  const all = await fetchRecruitments()
  return all.find((r) => String(r.id) === String(id)) || null
}

// 수강신청 — 로그인 사용자, 모집공고 기준
export async function applyEnrollment({ recruitment, course, user, form }) {
  const row = {
    user_id: user.id,
    user_name: form.name,
    user_email: form.email,
    phone: form.phone,
    recruitment_id: recruitment?.id ?? null,
    recruitment_title: recruitment?.title ?? null,
    course_id: course?.id ?? null,
    course_title: course?.title ?? null,
    region: recruitment?.region ?? course?.region ?? null,
    motivation: form.motivation || null,
    status: 'pending',
  }
  const { data, error } = await supabase.from(T.enrollments).insert(row).select().maybeSingle()
  if (error) throw error
  return data
}

export async function fetchMyEnrollments(userId) {
  const { data, error } = await supabase
    .from(T.enrollments)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// 강의/모집 개설 (강사·관리자)
export async function createCourse(payload) {
  const { data, error } = await supabase.from(T.courses).insert(payload).select().maybeSingle()
  if (error) throw error
  return data
}

export async function createRecruitment(payload) {
  const { data, error } = await supabase.from(T.recruitments).insert(payload).select().maybeSingle()
  if (error) throw error
  return data
}
