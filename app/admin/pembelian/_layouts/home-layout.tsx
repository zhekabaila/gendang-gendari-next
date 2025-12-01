'use client'

import { usePembeliStore } from '../_stores/use-pembeli-store'
import { API } from '@/services'
import { pembeliServices } from '@/services/pembeli'
import { AxiosError } from 'axios'
import { Plus, Filter, Edit, Trash2, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddPembeli from '../_components/add-pembeli'
import { PembeliResponse } from '@/lib/types'
import { DeleteAlert } from '@/components/core/delete-alert'

interface IProps {
  token: string
}

export function AdminPembeliManagement({ token }: IProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editData, setEditData] = useState<PembeliResponse | null>(null)
  const [deleteData, setDeleteData] = useState<PembeliResponse | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [type, setType] = useState<'add' | 'edit'>('add')

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [metodePembayaranFilter, setMetodePembayaranFilter] = useState('')

  const { pembelis, setBlogs, setLoading, loading, fetching, setFetching, pagination } = usePembeliStore()

  const handleClearAllParams = async (): Promise<void> => {
    setSearchTerm('')
    setMetodePembayaranFilter('')
  }

  const fetchPembelis = useCallback(
    (type: 'fetch' | 'loadmore' = 'fetch') => {
      if (!loading) {
        setFetching(true)
      }

      API({
        method: 'GET',
        url: pembeliServices.getAll,
        params: {
          page: type === 'fetch' ? 1 : 1,
          limit: 50
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const { data: agentData, ...others } = res.data
          setBlogs(agentData, others)
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            toast.error(
              (error.response?.data as { data?: string; message?: string })?.data ||
                (error.response?.data as { data?: string; message?: string })?.message ||
                '500: Internal Server Error'
            )
          } else {
            toast.error('Failed to fetch pembelis')
          }
        })
        .finally(() => {
          if (loading) setLoading(false)
          else setFetching(false)
        })
    },
    [loading, setFetching, setBlogs, setLoading, token]
  )

  // Initial fetch - runs only once on mount
  useEffect(() => {
    fetchPembelis()
  }, [])

  const onConfirmDelete = async () => {
    try {
      setDeleting(true)

      const response = await API({
        url: pembeliServices.delete + '/' + deleteData?.id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await handleClearAllParams()

      fetchPembelis()
      toast.success('Pembeli dihapus berhasil')
      setOpenDelete(false)
    } catch (err) {
      console.error('Delete error:', err)
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as { data?: string; message?: string })?.data ||
          (err.response?.data as { data?: string; message?: string })?.message ||
          err.message ||
          '500: Internal Server Error'
        toast.error(errorMessage)
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setDeleting(false)
    }
  }

  // Filter pembeli based on search and filter
  const filteredPembelis = pembelis.filter((pembeli) => {
    const matchesSearch =
      pembeli.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pembeli.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pembeli.kota.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = metodePembayaranFilter ? pembeli.metodePembayaran === metodePembayaranFilter : true

    return matchesSearch && matchesFilter
  })

  return (
    <>
      <DeleteAlert
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={onConfirmDelete}
        title="Apakah anda yakin?"
        description={`Apakah anda yakin akan menghapus data pembeli "${deleteData?.nama}" ini? Setelah anda melakukan konfirmasi, maka data akan terhapus selamanya dari database.`}
        confirmLabel="Konfirmasi"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Add/Edit Modal */}
        <AddPembeli
          open={showAddModal}
          onOpenChange={(e: boolean) => {
            setShowAddModal(e)
            if (!e) {
              setEditData(null)
              setType('add')
            }
          }}
          editData={editData}
          fetchPembelisFunc={() => {
            fetchPembelis()
          }}
          token={token}
          type={type}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-16 sm:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">Kelola Pembeli</h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Kelola data pembelian tiket</p>
            </div>
            <button
              onClick={() => {
                setShowAddModal(true)
                setType('add')
              }}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Tambah Pembeli
            </button>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-gray-600 text-sm sm:text-base">Filter & Cari:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Search Input */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Cari Pembeli</label>
                <input
                  type="text"
                  placeholder="Nama, email, atau kota..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Metode Pembayaran Filter */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Metode Pembayaran</label>
                <select
                  value={metodePembayaranFilter}
                  onChange={(e) => setMetodePembayaranFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Semua metode</option>
                  <option value="transfer">Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="kartu kredit">Kartu Kredit</option>
                  <option value="e-wallet">E-Wallet</option>
                </select>
              </div>

              {/* Clear Button */}
              <div className="flex items-end">
                <button
                  onClick={handleClearAllParams}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
                  Bersihkan Filter
                </button>
              </div>
            </div>
          </div>

          {/* Pembeli Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Nama</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Telepon</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Kota</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Jumlah Tiket</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Metode Pembayaran</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPembelis.map((pembeli) => (
                    <tr key={pembeli.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{pembeli.nama}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-purple-500" />
                          {pembeli.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-green-500" />
                          {pembeli.noHandphone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {pembeli.kota}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{pembeli.jumlahTiket} tiket</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {pembeli.metodePembayaran}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditData(pembeli)
                              setType('edit')
                              setShowAddModal(true)
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteData(pembeli)
                              setOpenDelete(true)
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPembelis.length === 0 && (
              <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-600 mb-1 sm:mb-2">Tidak Ada Data Pembeli</h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Coba ubah filter atau tambah pembeli baru</p>
                <button
                  onClick={() => {
                    setShowAddModal(true)
                    setType('add')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Tambah Pembeli
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
