import { BlogResponse, PaginationType } from '@/lib/types'
import { create } from 'zustand'

interface BlogState {
  blogs: BlogResponse[]
  loading: boolean
  fetching: boolean
  selectedDeleteData: string[]
  pagination: PaginationType | null
  setBlogs: (blogs: BlogResponse[], pagination?: PaginationType | null) => void
  updateBlog: (id: string, updatedData: Partial<BlogResponse>) => void
  setLoading: (loading: boolean) => void
  setFetching: (fetching: boolean) => void
  replaceDeleteData: (ids: string[]) => void
  setRemoveData: (id: string) => void
  toggleDeleteData: (id: string) => void
  findDeleteDataById: (id: string) => boolean
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  loading: true,
  fetching: false,
  selectedDeleteData: [],
  pagination: null,
  setBlogs: (blogs, pagination = null) => set({ blogs, pagination }),
  updateBlog: (id, updatedData) =>
    set((state) => ({
      blogs: state.blogs.map((blog) => (blog.id === id ? { ...blog, ...updatedData } : blog))
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
      blogs: state.blogs.filter((blog) => blog.id !== id)
    })),
  findDeleteDataById: (id): boolean => {
    return useBlogStore.getState().selectedDeleteData.includes(id)
  }
}))
