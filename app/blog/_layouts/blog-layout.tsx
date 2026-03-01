'use client'

import { BookOpen, Filter, Loader } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { BlogCard } from '../_components/BlogCard'
import { API } from '@/services'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useBlogStore } from '@/_stores/use-blog-store'
import { blogServices } from '@/services/blog'
import InputSearch from '@/components/core/input-search'
import { BlogCardSkeleton, FilterSkeleton, FeaturedArticleSkeleton } from '@/components/core/skeleton'

export function BlogLayout() {
  // Blog states
  const [blogPageParams, setBlogPageParams] = useState<number>(1)

  // Categories states
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [fetchingCategories, setFetchingCategories] = useState(false)

  const { blogs, setBlogs, setLoading, loading, fetching, setFetching, pagination } = useBlogStore()

  const searchParams = useSearchParams()

  const qParams = searchParams.get('q') || ''
  const categoryParams = searchParams.get('category') || null

  const navigate = useRouter()

  const handleFilter = (key: 'category' | 'q', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    navigate.replace(`?${params.toString()}`, { scroll: false })
  }

  const fetchBlogs = useCallback(
    (type: 'fetch' | 'loadmore' = 'fetch') => {
      // Cancel previous request if exists
      if (!loading) {
        setFetching(true)
      }

      API({
        method: 'GET',
        url: blogServices.getAll,
        params: {
          sort: -1,
          page: type === 'fetch' ? 1 : blogPageParams,
          limit: 50,
          value: qParams || undefined,
          kategori: categoryParams || undefined
        }
      })
        .then((res) => {
          const { data: agentData, ...others } = res.data
          if (type === 'loadmore') {
            setBlogs([...blogs, ...agentData], others)
          } else {
            setBlogs(agentData, others)
            setBlogPageParams(1)
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            toast.error(
              (error.response?.data as { data?: string; message?: string })?.data ||
                (error.response?.data as { data?: string; message?: string })?.message ||
                '500: Internal Server Error'
            )
          } else {
            toast.error('Failed to fetch blogs')
          }
        })
        .finally(() => {
          if (loading) setLoading(false)
          else setFetching(false)
        })
    },
    [blogPageParams, qParams, categoryParams, qParams]
  )

  const fetchCategories = useCallback(() => {
    setLoadingCategories(true)

    API({
      method: 'GET',
      url: blogServices.selectCategory
    })
      .then((res) => {
        const { data } = res.data
        setCategories(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(
            (error.response?.data as { data?: string; message?: string })?.data ||
              (error.response?.data as { data?: string; message?: string })?.message ||
              '500: Internal Server Error'
          )
        } else {
          toast.error('Failed to fetch categories')
        }
      })
      .finally(() => {
        setLoadingCategories(false)
      })
  }, [])

  // Initial fetch - runs only once on mount
  useEffect(() => {
    fetchBlogs()
    fetchCategories()
  }, [])

  // Fetch blogs when filters change
  useEffect(() => {
    fetchBlogs()
  }, [categoryParams, qParams])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-orange-400 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Blog & Artikel</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            Cerita Seni
            <br />& Budaya Indonesia
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Jelajahi artikel menarik tentang seni, budaya, dan pertunjukan tradisional Indonesia
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {loading ? (
        <section className="max-w-7xl mx-auto px-8 mt-16 mb-16">
          <FeaturedArticleSkeleton />
        </section>
      ) : blogs.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-16">
          <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 cursor-pointer group hover:shadow-3xl transition-all">
            <div className="relative h-64 md:h-96 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blogs[0].gambar || 'https://placehold.co/600x400'}
                alt={blogs[0].judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-full">
                Featured
              </div>
            </div>
            <div className="p-6 md:p-12 flex flex-col justify-center">
              {blogs[0].kategori.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mb-3 md:mb-4">
                  {blogs[0].kategori.map((e) => (
                    <div
                      key={e}
                      className="bg-blue-100 text-blue-700 backdrop-blur-sm px-3 md:px-4 py-1 text-xs md:text-sm rounded-full">
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              )}
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 group-hover:text-blue-600 transition-colors">
                {blogs[0].judul}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{blogs[0].ringkasan}</p>
              <div className="flex items-center gap-4 text-gray-500">
                <span>{blogs[0].penulis}</span>
                <span>•</span>
                <span>{new Date(blogs[0].createdAt).toLocaleDateString('id-ID')}</span>
                <span>•</span>
                <span>{blogs[0].waktuBaca} min</span>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
        {loadingCategories ? (
          <FilterSkeleton />
        ) : (
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Search */}
              <div className="relative">
                <InputSearch
                  type="text"
                  defaultValue={qParams}
                  onChangeValue={(e) => handleFilter('q', e)}
                  placeholder="Cari artikel..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Kategori:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        if (category === categoryParams) {
                          handleFilter('category', '')
                          return
                        }
                        handleFilter('category', category)
                      }}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        categoryParams === category
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20">
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
          <h2 className="text-2xl md:text-3xl">Semua Artikel</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Fetching indicator */}
            {fetching && (
              <div className="absolute bg-white/20 backdrop-blur-sm inset-0 flex items-center justify-center py-8 gap-2">
                <Loader className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-600">Memuat lebih banyak artikel...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl text-gray-600 mb-2">Tidak Ada Artikel</h3>
            <p className="text-gray-500">Coba ubah pencarian atau filter untuk melihat artikel lainnya</p>
          </div>
        )}
      </section>
    </div>
  )
}
