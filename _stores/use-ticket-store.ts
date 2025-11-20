import { TicketResponse, PaginationType } from '@/lib/types'
import { create } from 'zustand'

interface TicketState {
  tickets: TicketResponse[]
  loading: boolean
  fetching: boolean
  selectedDeleteData: string[]
  pagination: PaginationType | null
  setTickets: (tickets: TicketResponse[], pagination?: PaginationType | null) => void
  updateTicket: (id: string, updatedData: Partial<TicketResponse>) => void
  setLoading: (loading: boolean) => void
  setFetching: (fetching: boolean) => void
  replaceDeleteData: (ids: string[]) => void
  setRemoveData: (id: string) => void
  toggleDeleteData: (id: string) => void
  findDeleteDataById: (id: string) => boolean
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  loading: true,
  fetching: false,
  selectedDeleteData: [],
  pagination: null,
  setTickets: (tickets, pagination = null) => set({ tickets, pagination }),
  updateTicket: (id, updatedData) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => (ticket.id === id ? { ...ticket, ...updatedData } : ticket))
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
      tickets: state.tickets.filter((ticket) => ticket.id !== id)
    })),
  findDeleteDataById: (id): boolean => {
    return useTicketStore.getState().selectedDeleteData.includes(id)
  }
}))
