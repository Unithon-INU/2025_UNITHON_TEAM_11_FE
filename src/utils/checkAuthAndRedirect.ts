// src/utils/checkAuthAndRedirect.ts
'use client'

import { useRouter } from 'next/navigation'

export const checkAuthAndRedirect = () => {
  const router = useRouter()

  return () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      const confirmed = window.confirm('로그인이 필요한 기능입니다. 로그인하시겠습니까?')
      if (confirmed) {
        router.push('/login')
      }
      return false
    }
    return true
  }
}
