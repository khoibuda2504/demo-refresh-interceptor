import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export interface User {
  user: {
    name: string | null,
    accessToken: string
  }
  setToken: (accessToken: string) => void
  setUser: (user: string | null) => void
}
export const useUserStore = create<User>()(persist(
  (set) => ({
    user: {
      name: '',
      accessToken: ''
    },
    setToken: (accessToken) => set((state) => ({ user: { ...state.user, accessToken } })),
    setUser: (name) => set((state) => ({ user: {...state.user, name }})),
  }),
  {name: 'auth'}
))