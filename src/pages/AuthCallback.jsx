import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const nav = useNavigate()
  useEffect(() => {
    // Supabase 가 detectSessionInUrl 로 해시를 처리한 뒤 세션이 준비되면 이동
    const t = setTimeout(async () => {
      await supabase.auth.getSession()
      nav('/mypage', { replace: true })
    }, 400)
    return () => clearTimeout(t)
  }, [nav])

  return <div className="spinner-wrap">로그인 처리 중…</div>
}
