'use client'

import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Ticket,
  ChevronLeft,
  LoaderCircle,
  User,
  CreditCard,
  Clock,
  Eye,
  Download,
  X
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { API } from '@/services'
import { toast } from 'sonner'
import { PembeliResponse, TicketResponse } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

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
  const [selectedPembelian, setSelectedPembelian] = useState<PembeliResponse | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

  const fetchDetailPembelian = useCallback(
    async (id: string): Promise<PembeliResponse | undefined> => {
      try {
        const response = await API({
          method: 'GET',
          url: '/pembeli/' + id,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const { data }: { data: PembeliResponse } = response.data
        return data
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(
            (err.response?.data as { data?: string; message?: string })?.data ||
              (err.response?.data as { data?: string; message?: string })?.message ||
              'Gagal memuat detail pembelian'
          )
        } else {
          toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
        }
        return undefined
      }
    },
    [token]
  )

  const handleOpenDetail = useCallback(
    async (id: string) => {
      const data = await fetchDetailPembelian(id)
      if (data) {
        setSelectedPembelian(data)
        setIsDialogOpen(true)
      }
    },
    [fetchDetailPembelian]
  )

  const handleDownloadPDF = async () => {
    if (!selectedPembelian) return
    setSubmitting(true)
    try {
      const blob = await pdf(<TicketPDF pembelian={selectedPembelian} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ticket-${selectedPembelian.id}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      toast.success('PDF berhasil diunduh')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal membuat PDF')
    } finally {
      setSubmitting(false)
    }
  }

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
                      <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3">
                        <p className="text-sm font-semibold">Pesanan #{index + 1}</p>
                        <button
                          onClick={() => handleOpenDetail(order.id)}
                          className="hover:bg-white/20 p-1.5 rounded transition-colors">
                          <Eye className="w-4 h-4 text-white" />
                        </button>
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

      {/* Detail Ticket Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <AlertDialogCancel className="absolute top-6 right-6">
            <X />
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">Detail E-Ticket</AlertDialogTitle>
            <AlertDialogDescription>Informasi lengkap tiket pembelian Anda</AlertDialogDescription>
          </AlertDialogHeader>

          {selectedPembelian && (
            <div className="space-y-6">
              {/* Download Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleDownloadPDF}
                  disabled={submitting}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  {submitting ? (
                    <>
                      <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                      Membuat PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Unduh E-Ticket PDF
                    </>
                  )}
                </Button>
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                {/* HEADER */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 relative overflow-hidden">
                  <div className="absolute w-32 h-32 rounded-full bg-white/10 top-0 right-0 -mr-16 -mt-16" />
                  <div className="absolute w-24 h-24 rounded-full bg-white/5 bottom-0 left-0 -ml-12 -mb-12" />

                  <div className="relative z-10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">SeniLokal</div>
                        <div className="text-xs text-white/90">E-Ticket</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-white/80 mb-1">Booking ID</div>
                      <div className="flex justify-center items-center bg-white/20 px-2 py-1 rounded">
                        <p className="text-xs font-bold text-white font-mono">{selectedPembelian.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{selectedPembelian.ticket.judul}</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedPembelian.ticket.kategori.map((category, index) => {
                        const colors = ['#ec4899', '#a855f7', '#3b82f6']
                        const bgColor = colors[index % colors.length]
                        return (
                          <span
                            key={index}
                            className="inline-flex justify-center items-center px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${bgColor}20`,
                              color: bgColor
                            }}>
                            {category}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Detail Pertunjukan</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <TicketInfoCard
                        icon="📅"
                        label="Tanggal"
                        value={new Date(selectedPembelian.ticket.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                        bgColor="#ec4899"
                      />
                      <TicketInfoCard icon="🕐" label="Waktu" value={selectedPembelian.ticket.waktu} bgColor="#a855f7" />
                      <TicketInfoCard icon="📍" label="Venue" value={selectedPembelian.ticket.venue} bgColor="#3b82f6" />
                      <TicketInfoCard
                        icon="🏢"
                        label="Penyelenggara"
                        value={selectedPembelian.ticket.penyelenggara}
                        bgColor="#8b5cf6"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Informasi Pembeli</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <TicketBuyerInfo icon="👤" label="Nama Lengkap" value={selectedPembelian.nama} />
                      <TicketBuyerInfo icon="📧" label="Email" value={selectedPembelian.email} />
                      <TicketBuyerInfo icon="📱" label="No. Handphone" value={selectedPembelian.noHandphone} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Rincian Pembelian</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <TicketPaymentRow label="Jumlah Tiket" value={`${selectedPembelian.jumlahTiket}x`} />
                      <TicketPaymentRow
                        label="Harga per Tiket"
                        value={`Rp ${selectedPembelian.ticket.harga.toLocaleString('id-ID')}`}
                      />
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Metode Pembayaran</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentMethodColor(selectedPembelian.metodePembayaran)}`}>
                          {selectedPembelian.metodePembayaran}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">Total Pembayaran</span>
                        <span className="text-base font-bold text-pink-600">
                          Rp {(selectedPembelian.ticket.harga * selectedPembelian.jumlahTiket).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4">
                  <div className="text-center text-xs text-gray-500 mb-2">
                    Dipesan pada:{' '}
                    {new Date(selectedPembelian.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="bg-white rounded-lg p-2 mb-2">
                    <div className="text-xs font-semibold text-gray-900 mb-1">Penting:</div>
                    <ul className="text-xs text-gray-500 space-y-0.5 list-disc list-inside">
                      <li>Simpan e-ticket ini dan tunjukkan saat check-in</li>
                      <li>E-ticket ini hanya berlaku untuk satu kali masuk</li>
                      <li>Tidak dapat dikembalikan atau ditukar</li>
                    </ul>
                  </div>
                  <div className="text-center text-xs text-blue-500 font-medium">Hubungi kami: support@senilokal.id</div>
                </div>
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Components for Ticket Display in Dialog
const TicketInfoCard = ({
  icon,
  label,
  value,
  bgColor
}: {
  icon: string
  label: string
  value: string
  bgColor: string
}) => (
  <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-2.5 relative overflow-hidden">
    <div className="relative z-10">
      <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: bgColor }}>
        <span className="text-xs">{icon}</span>
      </div>
      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
      <div className="text-xs font-bold text-gray-900 leading-tight">{value}</div>
    </div>
  </div>
)

const TicketBuyerInfo = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="flex items-start gap-2 mb-2">
    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-xs">{icon}</span>
    </div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-xs font-semibold text-gray-900">{value}</div>
    </div>
  </div>
)

const TicketPaymentRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-semibold text-gray-900">{value}</span>
  </div>
)

// PDF Styles - same as in pembelian detail page
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0
  },
  container: {
    border: '1px solid #e5e7eb',
    borderRadius: '0px',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#ec4899',
    padding: 12,
    position: 'relative'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#a855f7'
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  logoSubtext: {
    fontSize: 8,
    color: '#ffffff'
  },
  bookingIdContainer: {
    alignItems: 'flex-end'
  },
  bookingIdLabel: {
    fontSize: 8,
    color: '#ffffff',
    marginBottom: 2
  },
  bookingIdBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '4px 6px',
    borderRadius: 3
  },
  bookingIdText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  content: {
    padding: 12
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  eventTitleBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10
  },
  eventTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap'
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 8
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  infoCard: {
    width: '48.5%',
    borderRadius: 6,
    padding: 8,
    position: 'relative'
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  infoIconText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  infoLabel: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 2
  },
  infoValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3
  },
  buyerBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10
  },
  buyerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6
  },
  buyerRowLast: {
    marginBottom: 0
  },
  buyerIcon: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyerIconText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  buyerLabel: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 1
  },
  buyerValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827'
  },
  paymentBox: {
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    padding: 10
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  paymentLabel: {
    fontSize: 8,
    color: '#6b7280'
  },
  paymentValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827'
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  paymentMethodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 8,
    fontWeight: 'bold'
  },
  divider: {
    borderTop: '1px solid #e5e7eb',
    marginVertical: 6
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827'
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ec4899'
  },
  footer: {
    backgroundColor: '#f9fafb',
    padding: 10
  },
  footerDate: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 6
  },
  noticeBox: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6
  },
  noticeTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4
  },
  noticeItem: {
    fontSize: 7,
    color: '#6b7280',
    marginBottom: 2,
    paddingLeft: 6
  },
  contact: {
    fontSize: 8,
    color: '#3b82f6',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

// PDF Component
const TicketPDF = ({ pembelian }: { pembelian: PembeliResponse }) => {
  const categoryColors = ['#ec4899', '#a855f7', '#3b82f6']
  const totalAmount = pembelian.ticket.harga * pembelian.jumlahTiket

  const getPaymentColor = (method: string) => {
    const colors: Record<string, string> = {
      transfer: '#3b82f6',
      cash: '#22c55e',
      'kartu kredit': '#a855f7',
      'e-wallet': '#f97316'
    }
    return colors[method] || '#6b7280'
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.logo}>
                <View style={styles.logoCircle}>
                  <View style={styles.logoInner} />
                </View>
                <View>
                  <Text style={styles.logoText}>SeniLokal</Text>
                  <Text style={styles.logoSubtext}>E-Ticket</Text>
                </View>
              </View>
              <View style={styles.bookingIdContainer}>
                <Text style={styles.bookingIdLabel}>Booking ID</Text>
                <View style={styles.bookingIdBox}>
                  <Text style={styles.bookingIdText}>{pembelian.id}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Event Title */}
            <View style={styles.section}>
              <View style={styles.eventTitleBox}>
                <Text style={styles.eventTitle}>{pembelian.ticket.judul}</Text>
                <View style={styles.categoriesRow}>
                  {pembelian.ticket.kategori.map((category, index) => {
                    const bgColor = categoryColors[index % categoryColors.length]
                    return (
                      <View key={index} style={[styles.categoryBadge, { backgroundColor: `${bgColor}20` }]}>
                        <Text style={{ color: bgColor, fontSize: 8 }}>{category}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>

            {/* Detail Pertunjukan */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detail Pertunjukan</Text>
              <View style={styles.detailGrid}>
                <View style={[styles.infoCard, { backgroundColor: '#fce7f3' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#ec4899' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>T</Text>
                  </View>
                  <Text style={styles.infoLabel}>Tanggal</Text>
                  <Text style={styles.infoValue}>
                    {new Date(pembelian.ticket.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#f3e8ff' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#a855f7' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>W</Text>
                  </View>
                  <Text style={styles.infoLabel}>Waktu</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.waktu}</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#dbeafe' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#3b82f6' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>V</Text>
                  </View>
                  <Text style={styles.infoLabel}>Venue</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.venue}</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#e0e7ff' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#8b5cf6' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>P</Text>
                  </View>
                  <Text style={styles.infoLabel}>Penyelenggara</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.penyelenggara}</Text>
                </View>
              </View>
            </View>

            {/* Informasi Pembeli */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informasi Pembeli</Text>
              <View style={styles.buyerBox}>
                <View style={styles.buyerRow}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>N</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>Nama Lengkap</Text>
                    <Text style={styles.buyerValue}>{pembelian.nama}</Text>
                  </View>
                </View>
                <View style={styles.buyerRow}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>E</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>Email</Text>
                    <Text style={styles.buyerValue}>{pembelian.email}</Text>
                  </View>
                </View>
                <View style={[styles.buyerRow, styles.buyerRowLast]}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>P</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>No. Handphone</Text>
                    <Text style={styles.buyerValue}>{pembelian.noHandphone}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Rincian Pembelian */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rincian Pembelian</Text>
              <View style={styles.paymentBox}>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Jumlah Tiket</Text>
                  <Text style={styles.paymentValue}>{pembelian.jumlahTiket}x</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Harga per Tiket</Text>
                  <Text style={styles.paymentValue}>Rp {pembelian.ticket.harga.toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.paymentMethodRow}>
                  <Text style={styles.paymentLabel}>Metode Pembayaran</Text>
                  <View
                    style={[
                      styles.paymentMethodBadge,
                      { backgroundColor: `${getPaymentColor(pembelian.metodePembayaran)}20` }
                    ]}>
                    <Text
                      style={{
                        color: getPaymentColor(pembelian.metodePembayaran),
                        textTransform: 'capitalize',
                        fontSize: 8
                      }}>
                      {pembelian.metodePembayaran}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Pembayaran</Text>
                  <Text style={styles.totalValue}>Rp {totalAmount.toLocaleString('id-ID')}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerDate}>
              Dipesan pada:{' '}
              {new Date(pembelian.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>Penting:</Text>
              <Text style={styles.noticeItem}>• Simpan e-ticket ini dan tunjukkan saat check-in</Text>
              <Text style={styles.noticeItem}>• E-ticket ini hanya berlaku untuk satu kali masuk</Text>
              <Text style={styles.noticeItem}>• Tidak dapat dikembalikan atau ditukar</Text>
            </View>
            <Text style={styles.contact}>Hubungi kami: support@senilokal.id</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
