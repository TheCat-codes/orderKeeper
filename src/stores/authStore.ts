import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface User {
  id: string,
  name: string,
  username: string,
  password: string,
  email: string,
  age: number
}

interface State {
  user: User | null,
  error: string | null,
  loading: boolean,
  setLoading: () => void,
  setError: (error: string | null) => void,
  setUser: (user: User | null) => void
}

export const useUserStore = create<State>()(persist((set, get) => ({
  user: null,
  error: null,
  loading: false,
  setLoading: () => {
    const { loading } = get()
    set({ loading: !loading, error: null })
  },
  setError: (error: string | null) => {
    set({ error, loading: false })
  },
  setUser: (user: User | null) => {
    set({ user, loading: false, error: null })
  }
}),{
  name: 'user'
}))