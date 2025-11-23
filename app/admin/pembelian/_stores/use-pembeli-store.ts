import { create } from 'zustand'
import { PembeliResponse, PaginationType } from '@/lib/types'

interface PembeliStore {
  pembelis: PembeliResponse[]
  loading: boolean
  fetching: boolean
  pagination: PaginationType

  setBlogs: (blogs: PembeliResponse[], meta: Partial<PaginationType>) => void
  setLoading: (loading: boolean) => void
  setFetching: (fetching: boolean) => void
  addPembeli: (pembeli: PembeliResponse) => void
  updatePembeli: (id: string, pembeli: PembeliResponse) => void
  removePembeli: (id: string) => void
}

export const usePembeliStore = create<PembeliStore>((set) => ({
  pembelis: [],
  loading: true,
  fetching: false,
  pagination: {
    limit: 10,
    page: 1,
    size: 0,
    pages: 1
  },

  setBlogs: (pembelis, meta) =>
    set({
      pembelis,
      pagination: {
        limit: meta.limit || 10,
        page: meta.page || 1,
        size: meta.size || 0,
        pages: meta.pages || 1
      }
    }),

  setLoading: (loading) => set({ loading }),
  setFetching: (fetching) => set({ fetching }),

  addPembeli: (pembeli) =>
    set((state) => ({
      pembelis: [pembeli, ...state.pembelis]
    })),

  updatePembeli: (id, pembeli) =>
    set((state) => ({
      pembelis: state.pembelis.map((p) => (p.id === id ? pembeli : p))
    })),

  removePembeli: (id) =>
    set((state) => ({
      pembelis: state.pembelis.filter((p) => p.id !== id)
    }))
}))
