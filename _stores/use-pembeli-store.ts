import { PembeliResponse, PaginationType } from '@/lib/types'
import { create } from 'zustand'

interface PembeliState {
  pembeli: PembeliResponse[]
  loading: boolean
  fetching: boolean
  selectedDeleteData: string[]
  pagination: PaginationType | null
  setPembeli: (pembeli: PembeliResponse[], pagination?: PaginationType | null) => void
  updatePembeli: (id: string, updatedData: Partial<PembeliResponse>) => void
  setLoading: (loading: boolean) => void
  setFetching: (fetching: boolean) => void
  replaceDeleteData: (ids: string[]) => void
  setRemoveData: (id: string) => void
  toggleDeleteData: (id: string) => void
  findDeleteDataById: (id: string) => boolean
}

export const usePembeliStore = create<PembeliState>((set) => ({
  pembeli: [],
  loading: true,
  fetching: false,
  selectedDeleteData: [],
  pagination: null,
  setPembeli: (pembeli, pagination = null) => set({ pembeli, pagination }),
  updatePembeli: (id, updatedData) =>
    set((state) => ({
      pembeli: state.pembeli.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
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
      pembeli: state.pembeli.filter((pembeli) => pembeli.id !== id)
    })),
  findDeleteDataById: (id): boolean => {
    return usePembeliStore.getState().selectedDeleteData.includes(id)
  }
}))
