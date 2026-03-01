'use client'

import { useTicketStore } from '@/_stores/use-ticket-store'
import { FilterSkeleton } from '@/components/core/skeleton'
import { API } from '@/services'
import { ticketServices } from '@/services/ticket'
import { AxiosError } from 'axios'
import { Plus, Filter, Edit, Trash2, Eye, Calendar, MapPin } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddTicket from '../_components/add-ticket'
import { TicketResponse } from '@/lib/types'
import { DeleteAlert } from '@/components/core/delete-alert'

interface IProps {
  token: string
}

export function AdminTicketManagement({ token }: IProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [ticketPageParams, setTicketPageParams] = useState<number>(1)

  // Categories states
  const [categories, setCategories] = useState<string[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [fetchingCategories, setFetchingCategories] = useState(false)

  // Cities states
  const [cities, setCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(true)
  const [fetchingCities, setFetchingCities] = useState(false)
  const [editData, setEditData] = useState<TicketResponse | null>(null)
  const [deleteData, setDeleteData] = useState<TicketResponse | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [type, setType] = useState<'add' | 'edit'>('add')

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
          value: qParams || undefined,
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
    [ticketPageParams, qParams, categoryParams, cityParams]
  )

  const fetchCategories = useCallback(() => {
    if (!loadingCategories) {
      setFetchingCategories(true)
    }

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
    if (!loadingCities) {
      setFetchingCities(true)
    }

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
  }, [categoryParams, cityParams, qParams])

  const onConfirmDelete = async () => {
    try {
      setDeleting(true)

      const response = await API({
        url: ticketServices.delete + '/' + deleteData?.id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data }: { data: TicketResponse } = response.data

      fetchCategories()
      fetchCities()
      fetchTickets()
      toast.success(`Ticket ${type === 'add' ? 'added' : 'updated'} successfully`)
      setOpenDelete(false)
    } catch (err) {
      console.error('Submit error:', err)
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as { data?: string; message?: string })?.data ||
          (err.response?.data as { data?: string; message?: string })?.message ||
          err.message ||
          '500: Internal Server Error'
        toast.error(errorMessage)
      } else {
        toast.error(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <DeleteAlert
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={onConfirmDelete}
        title="Apakah anda yakin?"
        description={`Apakah anda yakin akan menghapus data tiket "${deleteData?.judul} ini? Setelah anda melakukan konfirmasi, maka data akan terhapus selamanya dari database."`}
        confirmLabel="Konfirmasi"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Add/Edit Modal */}
        <AddTicket
          open={showAddModal}
          onOpenChange={(e) => {
            setShowAddModal(e)
            if (!e) {
              setEditData(null)
              setType('add')
            }
          }}
          editData={editData}
          fetchBadwordsFunc={() => {
            fetchCategories()
            fetchCities()
            fetchTickets()
          }}
          token={token}
          type={type}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-16 sm:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">Kelola Tiket Pertunjukan</h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Tambah, edit, atau hapus pertunjukan</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Tambah Pertunjukan
            </button>
          </div>

          {/* Search & Filter */}
          {loadingCategories || loadingCities ? (
            <FilterSkeleton />
          ) : (
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-gray-600 text-sm sm:text-base">Filter:</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
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

          {/* Tickets Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Pertunjukan</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Jadwal</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Lokasi</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Harga</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Terjual / Kapasitas</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ticket.gambar} alt={ticket.judul} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <div className="text-gray-900 max-w-xs truncate">{ticket.judul}</div>
                            <div className="text-sm text-gray-500">{ticket.penyelenggara}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {ticket.kategori.map((e) => (
                            <span key={e} className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full">
                              {e}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <div>
                            <div className="text-sm">{new Date(ticket.tanggal).toLocaleDateString('id-ID')}</div>
                            <div className="text-xs text-gray-500">{ticket.waktu}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{ticket.kota}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">Rp {ticket.harga.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {ticket.totalTerjual} / {ticket.kapasitas}
                        </div>
                        <div className="text-xs text-gray-500">{ticket.persentaseTerisi}% terjual</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                            title="Lihat Detail">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditData(ticket)
                              setType('edit')
                              setShowAddModal(true)
                            }}
                            className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                            title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteData(ticket)
                              setOpenDelete(true)
                            }}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                            title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tickets.length === 0 && (
              <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-600 mb-1 sm:mb-2">Tidak Ada Pertunjukan</h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
                  Coba ubah filter atau tambah pertunjukan baru
                </p>
                <button
                  onClick={() => {
                    setShowAddModal(true)
                    setType('add')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Tambah Pertunjukan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
