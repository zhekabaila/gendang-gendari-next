'use client'

import { Calendar, Mail, Phone, MapPin, Ticket, ChevronLeft, LoaderCircle, User, CreditCard, Clock } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { API } from '@/services'
import { toast } from 'sonner'
import { TicketResponse } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface Pembeli {
  id: string
  nama: string
  email: string
  noHandphone: string
  alamat: string
  kota: string
  jumlahTiket: number
  metodePembayaran: string
  createdAt: string
  updatedAt: string
  userId: string
  ticketId: string
  ticket: TicketResponse
}

interface UserProfile {
  id: string
  nama: string
  umur: number
  asalKota: string
  username: string
  phone: string
  role: string
  createdAt: string
  updatedAt: string
  pembeli: Pembeli[]
}

interface ProfilePageProps {
  token?: string
}

export function ProfilePage({ token }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)

      if (!token) {
        toast.error('Anda harus login untuk melihat profile')
        router.push('/login')
        return
      }

      const response = await API({
        method: 'GET',
        url: '/user/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data }: { data: UserProfile } = response.data
      setProfile(data)
    } catch (err) {
      console.error('Fetch error:', err)
      if (err instanceof AxiosError) {
        toast.error(
          (err.response?.data as { data?: string; message?: string })?.data ||
            (err.response?.data as { data?: string; message?: string })?.message ||
            'Gagal memuat profile'
        )
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }, [token, router])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat profile Anda...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-20 text-center">
          <h2 className="text-3xl mb-4 font-bold">Profile Tidak Ditemukan</h2>
          <Button onClick={() => router.push('/')} className="bg-gradient-to-r from-pink-500 to-purple-600">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    )
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'transfer':
        return 'bg-blue-100 text-blue-800'
      case 'cash':
        return 'bg-green-100 text-green-800'
      case 'kartu kredit':
        return 'bg-purple-100 text-purple-800'
      case 'e-wallet':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      {/* Profile Header */}
      <section className="max-w-6xl mx-auto px-8 mb-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.nama}</h1>
              <p className="text-gray-600 mb-2">@{profile.username}</p>
              <p className="text-gray-600">Member sejak {new Date(profile.createdAt).toLocaleDateString('id-ID')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="col-span-2 space-y-8">
            {/* Informasi Pribadi */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Informasi Pribadi</h2>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-semibold text-gray-900">@{profile.username}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nomor Telepon</p>
                    <p className="font-semibold text-gray-900">{profile.phone}</p>
                  </div>
                </div>

                {/* Umur */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Umur</p>
                    <p className="font-semibold text-gray-900">{profile.umur} tahun</p>
                  </div>
                </div>

                {/* Kota */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Asal Kota</p>
                    <p className="font-semibold text-gray-900">{profile.asalKota}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pesanan Tiket */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Pesanan Tiket Anda ({profile.pembeli.length})</h2>

              {profile.pembeli.length > 0 ? (
                <div className="space-y-6">
                  {profile.pembeli.map((order, index) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Order Number */}
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3">
                        <p className="text-sm font-semibold">Pesanan #{index + 1}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                        {/* Ticket Image */}
                        <div className="relative h-40 bg-gray-200 rounded-lg overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={order.ticket.gambar} alt={order.ticket.judul} className="w-full h-full object-cover" />
                        </div>

                        {/* Ticket & Order Info */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-bold text-gray-900">{order.ticket.judul}</h3>
                            <p className="text-sm text-gray-600">{order.ticket.venue}</p>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-600" />
                              <span>{new Date(order.ticket.tanggal).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-600" />
                              <span>{order.ticket.waktu}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Ticket className="w-4 h-4 text-gray-600" />
                              <span>{order.jumlahTiket} tiket</span>
                            </div>
                          </div>
                        </div>

                        {/* Buyer & Payment Info */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Pembeli</p>
                            <p className="font-semibold text-gray-900">{order.nama}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                            <p className="text-sm text-gray-600">{order.noHandphone}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-600" />
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentMethodColor(order.metodePembayaran)}`}>
                              {order.metodePembayaran}
                            </span>
                          </div>

                          <div className="border-t border-gray-200 pt-3">
                            <p className="text-xs text-gray-600">Total Harga</p>
                            <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                              Rp {(order.ticket.harga * order.jumlahTiket).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Date */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                          Dipesan pada:{' '}
                          <span className="font-semibold text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">Anda belum membeli tiket apapun</p>
                  <Button onClick={() => router.push('/')} className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600">
                    Lihat Tiket
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Ringkasan Pesanan */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl sticky top-24 space-y-6">
              {/* Statistik Pesanan */}
              <div>
                <h3 className="text-lg font-bold mb-4">Ringkasan Pesanan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                    <span className="text-gray-600 font-semibold">Total Pesanan</span>
                    <span className="text-2xl font-bold text-purple-600">{profile.pembeli.length}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600 font-semibold">Total Tiket</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {profile.pembeli.reduce((acc, p) => acc + p.jumlahTiket, 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600 font-semibold">Total Pengeluaran</span>
                    <span className="text-lg font-bold text-green-600">
                      Rp{' '}
                      {profile.pembeli.reduce((acc, p) => acc + p.ticket.harga * p.jumlahTiket, 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metode Pembayaran yang Digunakan */}
              {profile.pembeli.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Metode Pembayaran</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(profile.pembeli.map((p) => p.metodePembayaran))).map((method) => (
                      <div
                        key={method}
                        className={`px-3 py-2 rounded-lg text-center font-semibold capitalize text-sm ${getPaymentMethodColor(method)}`}>
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Akun */}
              {/* <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Informasi Akun</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>
                    Role: <span className="font-semibold text-gray-900 capitalize">{profile.role}</span>
                  </p>
                  <p>
                    User ID: <span className="font-mono text-gray-900 block break-all text-xs">{profile.id}</span>
                  </p>
                  <p className="mt-2">
                    Bergabung:{' '}
                    <span className="font-semibold text-gray-900">
                      {new Date(profile.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
