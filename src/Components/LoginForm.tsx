/* eslint-disable react-hooks/exhaustive-deps */
import type React from "react"
import { useUserStore } from "../stores/authStore.ts"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { LOGIN } from "../routes.ts"

export function Loginform () {
  const setError = useUserStore(state => state.setError)
  const setUser = useUserStore(state => state.setUser)
  const setLoading = useUserStore(state => state.setLoading)
  const error = useUserStore(state => state.error)
  const user = useUserStore(state => state.user)
  const loading = useUserStore(state => state.loading)
  const navigate = useNavigate()

  useEffect(() => {
    if(user !== null) {
      navigate('/dashboard')
    }
    setError(null)
  }, [])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading()

      const formdata = new FormData(e.currentTarget)
      const username = formdata.get('username') as string
      const password = formdata.get('password') as string

      if(!password || !username) return setLoading()

      const res = await fetch(LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify({
          username,
          password
        })
      })

      const data = await res.json()
      
      if(!res.ok) {
        setError(data.message)
      }

      setUser(data.user[0])
      navigate('/dashboard')
    } catch (e) {
      const error = e as string
      console.error(error)
    }
  }

  return (
    <>
      <form className="login-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name="username"/>
        <input type="password" placeholder="Password" name="password"/>
        <button disabled={loading} type='submit'>Log In</button>
        {error && <p className="error">{error}</p>}
        {loading && <p>Loading...</p>}
        <Link to={'/register'}>Register here</Link>
      </form>
    </>
  )
}