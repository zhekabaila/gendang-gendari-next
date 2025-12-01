'use client'

import { Ticket, BookOpen, Users, TrendingUp, Calendar, DollarSign, Eye, BarChart3 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { API } from '@/services'
import { ticketServices } from '@/services/ticket'
import { blogServices } from '@/services/blog'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { TicketResponse, BlogResponse, UserResponse, PembeliResponse } from '@/lib/types'
import { dashboardServices } from '@/services/dashboard'

interface IProps {
  token: string
}

export function AdminDashboard({ token }: IProps) {
  // Tickets states
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  const [loadingTickets, setLoadingTickets] = useState(true)
  const [fetchingTickets, setFetchingTickets] = useState(false)

  // Blogs states
  const [blogs, setBlogs] = useState<BlogResponse[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [fetchingBlogs, setFetchingBlogs] = useState(false)

  // Users states
  const [users, setUsers] = useState<UserResponse[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [fetchingUsers, setFetchingUsers] = useState(false)

  // Pembeli states
  const [pembeli, setPembeli] = useState<PembeliResponse[]>([])
  const [loadingPembeli, setLoadingPembeli] = useState(true)
  const [fetchingPembeli, setFetchingPembeli] = useState(false)

  const [loadingDashboardStats, setLoadingDashboardStats] = useState(false)
  const [dashboardStats, setDashboardStats] = useState<{
    totalTiket: number
    tiketTerjual: number
    totalPendapatan: number
    totalBlog: number
  }>({
    totalTiket: 0,
    tiketTerjual: 0,
    totalPendapatan: 0,
    totalBlog: 0
  })

  // Fetch Tickets
  const fetchTickets = useCallback(() => {
    setLoadingTickets(true)

    API({
      method: 'GET',
      url: ticketServices.getAll,
      params: {
        page: 1,
        limit: 5
      }
    })
      .then((res) => {
        const { data } = res.data
        setTickets(data)
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
        setLoadingTickets(false)
      })
  }, [])

  // Fetch Blogs
  const fetchBlogs = useCallback(() => {
    setLoadingBlogs(true)

    API({
      method: 'GET',
      url: blogServices.getAll,
      params: {
        page: 1,
        limit: 5
      }
    })
      .then((res) => {
        const { data } = res.data
        setBlogs(data)
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
        setLoadingBlogs(false)
      })
  }, [])

  // Fetch Users
  const fetchUsers = useCallback(() => {
    setLoadingUsers(true)

    API({
      method: 'GET',
      url: '/user',
      params: {
        page: 1,
        limit: 5
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const { data } = res.data
        setUsers(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(
            (error.response?.data as { data?: string; message?: string })?.data ||
              (error.response?.data as { data?: string; message?: string })?.message ||
              '500: Internal Server Error'
          )
        } else {
          toast.error('Failed to fetch users')
        }
      })
      .finally(() => {
        setLoadingUsers(false)
      })
  }, [])

  const fetchDashboardStats = useCallback(() => {
    setLoadingDashboardStats(true)

    API({
      method: 'GET',
      url: dashboardServices.stats,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const { data } = res.data
        setDashboardStats(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(
            (error.response?.data as { data?: string; message?: string })?.data ||
              (error.response?.data as { data?: string; message?: string })?.message ||
              '500: Internal Server Error'
          )
        } else {
          toast.error('Failed to fetch users')
        }
      })
      .finally(() => {
        setLoadingDashboardStats(false)
      })
  }, [])

  // Fetch Pembeli
  const fetchPembeli = useCallback(() => {
    setLoadingPembeli(true)

    API({
      method: 'GET',
      url: '/pembeli',
      params: {
        page: 1,
        limit: 5
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const { data } = res.data
        setPembeli(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(
            (error.response?.data as { data?: string; message?: string })?.data ||
              (error.response?.data as { data?: string; message?: string })?.message ||
              '500: Internal Server Error'
          )
        } else {
          toast.error('Failed to fetch pembeli')
        }
      })
      .finally(() => {
        setLoadingPembeli(false)
      })
  }, [])

  // Initial fetch - runs only once on mount
  useEffect(() => {
    fetchTickets()
    fetchBlogs()
    fetchUsers()
    fetchPembeli()
    fetchDashboardStats()
  }, [fetchTickets, fetchBlogs, fetchUsers, fetchPembeli, fetchDashboardStats])

  // Calculate stats from tickets
  const totalTickets = tickets.length
  const totalSold = tickets.reduce((sum, ticket) => sum + (ticket.totalTerjual || 0), 0)
  const totalRevenue = tickets.reduce((sum, ticket) => sum + (ticket.totalTerjual || 0) * (ticket.harga || 0), 0)
  const totalBlogs = blogs.length
  const recentTickets = tickets.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-16 sm:mt-20">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">Dashboard Admin</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Selamat datang kembali! Berikut ringkasan platform Anda.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1">
              {loadingDashboardStats ? '...' : dashboardStats.totalTiket}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Pertunjukan</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-pink-500">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1">
              {loadingDashboardStats ? '...' : dashboardStats.tiketTerjual.toLocaleString()}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Tiket Terjual</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl mb-1 truncate">
              {loadingDashboardStats ? '...' : `Rp ${dashboardStats.totalPendapatan}`}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Pendapatan</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl mb-1">
              {loadingDashboardStats ? '...' : dashboardStats.totalBlog}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Artikel Blog</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
          <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all text-left group">
            <Ticket className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">Kelola Tiket</h3>
            <p className="opacity-90 text-sm sm:text-base">Tambah, edit, atau hapus pertunjukan</p>
          </button>

          <button className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all text-left group">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">Kelola Blog</h3>
            <p className="opacity-90 text-sm sm:text-base">Buat dan kelola artikel blog</p>
          </button>
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h2 className="text-lg sm:text-xl lg:text-2xl">Pertunjukan Terbaru</h2>
            </div>
            <button className="text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base">
              Lihat Semua →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Pertunjukan</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Lokasi</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Terjual</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTickets.map((ticket: TicketResponse) => {
                  const soldPercentage = (ticket.totalTerjual / ticket.kapasitas) * 100
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ticket.gambar} alt={ticket.judul} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="text-gray-900">{ticket.judul}</div>
                            <div className="text-sm text-gray-500">{ticket.penyelenggara}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {ticket.kategori[0]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{new Date(ticket.tanggal).toLocaleDateString('id-ID')}</td>
                      <td className="px-6 py-4 text-gray-700">{ticket.kota}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {ticket.totalTerjual} / {ticket.kapasitas}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                            style={{ width: `${soldPercentage}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {soldPercentage >= 80 ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Hampir Penuh</span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Tersedia</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h3 className="text-base sm:text-lg lg:text-xl">Penjualan Tiket Bulanan</h3>
            </div>
            <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl flex items-center justify-center">
              <p className="text-gray-500 text-sm sm:text-base text-center px-4">
                Grafik penjualan akan ditampilkan di sini
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              <h3 className="text-base sm:text-lg lg:text-xl">Kategori Populer</h3>
            </div>
            <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl flex items-center justify-center">
              <p className="text-gray-500 text-sm sm:text-base text-center px-4">Grafik kategori akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
