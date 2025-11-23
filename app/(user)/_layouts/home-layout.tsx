'use client'

import { useTicketStore } from '@/_stores/use-ticket-store'
import { TicketCard } from '@/app/_components/TicketCard'
import { API } from '@/services'
import { ticketServices } from '@/services/ticket'
import { AxiosError } from 'axios'
import { Sparkles, Calendar, MapPin, Filter, Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { TicketCardSkeleton, FilterSkeleton } from '@/components/core/skeleton'

export function HomeLayout() {
  // Ticket states
  const [ticketPageParams, setTicketPageParams] = useState<number>(1)
  const [ticketSearch, setTicketSearch] = useState<string>('')

  // Categories states
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [fetchingCategories, setFetchingCategories] = useState(false)

  // Cities states
  const [cities, setCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(true)
  const [fetchingCities, setFetchingCities] = useState(false)

  const { tickets, setTickets, setLoading, loading, fetching, setFetching, pagination } = useTicketStore()

  const searchParams = useSearchParams()

  const pageParams = searchParams.get('page')
  const sortParams = searchParams.get('sort')
  const limitParams = searchParams.get('limit')
  const qParams = searchParams.get('q') || ''
  const categoryParams = searchParams.get('category') || null
  const cityParams = searchParams.get('city') || null

  const parsedPage = pageParams ? parseInt(pageParams, 10) || 1 : 1
  const parsedSort = sortParams === '1' ? 1 : -1
  const parsedLimit = limitParams ? parseInt(limitParams, 10) || 10 : 10

  const navigate = useRouter()

  const handleFilter = (key: 'category' | 'city', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    navigate.replace(`?${params.toString()}`, { scroll: false })
  }

  const fetchTickets = useCallback(
    (type: 'fetch' | 'loadmore' = 'fetch') => {
      if (!loading) {
        setFetching(true)
      }

      API({
        method: 'GET',
        url: ticketServices.getAll,
        params: {
          sort: -1,
          page: type === 'fetch' ? 1 : ticketPageParams,
          limit: 50,
          value: ticketSearch || undefined,
          kategori: categoryParams || undefined,
          kota: cityParams || undefined
        }
      })
        .then((res) => {
          const { data: agentData, ...others } = res.data
          if (type === 'loadmore') {
            setTickets([...tickets, ...agentData], others)
          } else {
            setTickets(agentData, others)
            setTicketPageParams(1)
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
            toast.error('Failed to fetch tickets')
          }
        })
        .finally(() => {
          if (loading) setLoading(false)
          else setFetching(false)
        })
    },
    [ticketPageParams, ticketSearch, categoryParams, cityParams]
  )

  const fetchCategories = useCallback(() => {
    setLoadingCategories(true)

    API({
      method: 'GET',
      url: ticketServices.selectCategory
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
        if (loadingCategories) setLoadingCategories(false)
        else setFetchingCategories(false)
      })
  }, [])

  const fetchCities = useCallback(() => {
    setLoadingCities(true)

    API({
      method: 'GET',
      url: ticketServices.selectCity
    })
      .then((res) => {
        const { data } = res.data
        setCities(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(
            (error.response?.data as { data?: string; message?: string })?.data ||
              (error.response?.data as { data?: string; message?: string })?.message ||
              '500: Internal Server Error'
          )
        } else {
          toast.error('Failed to fetch cities')
        }
      })
      .finally(() => {
        if (loadingCities) setLoadingCities(false)
        else setFetchingCities(false)
      })
  }, [])

  // Initial fetch - runs only once on mount
  useEffect(() => {
    fetchTickets()
    fetchCategories()
    fetchCities()
  }, [])

  // Fetch tickets when filters change
  useEffect(() => {
    fetchTickets()
  }, [categoryParams, cityParams, ticketSearch])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900">Platform Tiket Pertunjukan Seni Lokal Terpercaya</span>
            </div>

            <h1 className="text-6xl mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Dukung Seni Lokal,
              <br />
              Pesan Tiket Mudah!
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Temukan dan nikmati pertunjukan seni tradisional dan kontemporer dari berbagai daerah di Indonesia. Mudah,
              cepat, dan terpercaya.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  document.getElementById('ticket-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Jelajahi Pertunjukan
              </button>
              <button className="px-8 py-4 bg-white text-purple-700 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                Tentang Kami
              </button>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-gray-700">Pertunjukan</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-gray-700">Penonton Senang</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-gray-700">Kota di Indonesia</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Main Ticket List Section */}
      <section id="ticket-section" className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl">Semua Pertunjukan</h2>
          </div>
        </div>

        {/* Filters */}
        {loadingCategories || loadingCities ? (
          <FilterSkeleton />
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Filter:</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Kategori</label>
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
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Kota</label>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        if (city === cityParams) {
                          handleFilter('city', '')
                          return
                        }
                        handleFilter('city', city)
                      }}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        cityParams === city
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      <MapPin className="w-4 h-4" />
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TicketCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="relative">
            {tickets.length !== 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-xl text-gray-600 mb-2">Tidak Ada Pertunjukan</h3>
                <p className="text-gray-500">Coba ubah filter untuk melihat pertunjukan lainnya</p>
              </div>
            )}

            {/* Fetching indicator */}
            {fetching && (
              <div className="absolute bg-white/20 backdrop-blur-sm inset-0 flex items-center justify-center py-8 gap-2">
                <Loader className="w-5 h-5 animate-spin text-purple-600" />
                <span className="text-gray-600">Memuat lebih banyak pertunjukan...</span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
