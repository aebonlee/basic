import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 커스텀 도메인(basic.dreamitbiz.com) 사용 → base는 '/'
export default defineConfig({
  base: '/',
  plugins: [react()],
})
