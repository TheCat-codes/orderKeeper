/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useUserStore } from "../stores/authStore"
import { useNavigate } from "react-router-dom"

export function Protected ({ children }:{children: React.ReactNode}) {
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      if(user === null) return navigate('/')
    }

    checkAuth()
  }, [])

  return children
} 