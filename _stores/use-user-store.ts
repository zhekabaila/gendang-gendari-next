import { UserResponse } from '@/lib/types'
import { create } from 'zustand'
import { PaginationType } from '@/lib/types'

interface UserState {
  users: UserResponse[]
  loading: boolean
  fetching: boolean
  selectedDeleteData: string[]
  pagination: PaginationType | null
  setUsers: (users: UserResponse[], pagination?: PaginationType | null) => void
  updateUser: (id: string, updatedData: Partial<UserResponse>) => void
  setLoading: (loading: boolean) => void
  setFetching: (fetching: boolean) => void
  replaceDeleteData: (ids: string[]) => void
  setRemoveData: (id: string) => void
  toggleDeleteData: (id: string) => void
  findDeleteDataById: (id: string) => boolean
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: true,
  fetching: false,
  selectedDeleteData: [],
  pagination: null,
  setUsers: (users, pagination = null) => set({ users, pagination }),
  updateUser: (id, updatedData) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
    })),
  setLoading: (loading) => set({ loading }),
  setFetching: (fetching) => set({ fetching }),
  replaceDeleteData: (ids) => set({ selectedDeleteData: ids }),
  toggleDeleteData: (id) =>
    set((state) => ({
      selectedDeleteData: state.selectedDeleteData.includes(id)
        ? state.selectedDeleteData.filter((item) => item !== id)
        : [...state.selectedDeleteData, id]
    })),
  setRemoveData: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id)
    })),
  findDeleteDataById: (id): boolean => {
    return useUserStore.getState().selectedDeleteData.includes(id)
  }
}))
