'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Clock, MapPin, Users, Building, Heart, Share2, ChevronLeft, LoaderCircle } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { API } from '@/services'
import { ticketServices } from '@/services/ticket'
import { pembeliServices } from '@/services/pembeli'
import { toast } from 'sonner'
import { TicketResponse, PembeliResponse } from '@/lib/types'
import { pembeliSchema } from '@/schemas/pembeli'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface TicketDetailPageProps {
  ticketId: string
  token?: string | null
}

export function TicketDetailPage({ ticketId, token }: TicketDetailPageProps) {
  const [ticket, setTicket] = useState<TicketResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof pembeliSchema>>({
    resolver: zodResolver(pembeliSchema),
    defaultValues: {
      nama: '',
      email: '',
      noHandphone: '',
      alamat: '',
      kota: '',
      jumlahTiket: 1,
      metodePembayaran: '',
      userId: '',
      ticketId: ticketId
    }
  })

  // Fetch ticket detail
  const fetchTicket = useCallback(async () => {
    try {
      setLoading(true)
      const response = await API({
        method: 'GET',
        url: `${ticketServices.getAll}/${ticketId}`
      })

      const { data }: { data: TicketResponse } = response.data
      setTicket(data)
      form.setValue('ticketId', data.id)
      form.setValue('kota', data.kota)
    } catch (err) {
      console.error('Fetch error:', err)
      if (err instanceof AxiosError) {
        toast.error(
          (err.response?.data as { data?: string; message?: string })?.data ||
            (err.response?.data as { data?: string; message?: string })?.message ||
            'Tiket tidak ditemukan'
        )
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }, [ticketId, form])

  useEffect(() => {
    fetchTicket()
  }, [fetchTicket])

  const onSubmit = async (values: z.infer<typeof pembeliSchema>) => {
    try {
      setSubmitting(true)

      const payload = {
        nama: values.nama,
        email: values.email,
        noHandphone: values.noHandphone,
        alamat: values.alamat,
        kota: values.kota,
        jumlahTiket: values.jumlahTiket,
        metodePembayaran: values.metodePembayaran,
        userId: values.userId || undefined,
        ticketId: values.ticketId
      }

      // Prepare headers - include token only if user is logged in
      const headers: Record<string, string> = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await API({
        url: pembeliServices.create,
        method: 'POST',
        data: payload,
        headers: Object.keys(headers).length > 0 ? headers : undefined
      })

      const { data }: { data: PembeliResponse } = response.data

      toast.success('Pembelian tiket berhasil!')

      form.reset()

      // Redirect to purchase detail page
      setTimeout(() => {
        router.push(`/pembelian/${data.id}`)
      }, 1000)
    } catch (err) {
      console.error('Submit error:', err)
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as { data?: string; message?: string })?.data ||
          (err.response?.data as { data?: string; message?: string })?.message ||
          err.message ||
          'Pembelian tiket gagal'
        toast.error(errorMessage)
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail tiket...</p>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-3xl mb-4">Tiket Tidak Ditemukan</h2>
          <Button onClick={() => router.push('/')} className="bg-gradient-to-r from-pink-500 to-purple-600">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    )
  }

  const soldPercentage = (ticket.totalTerjual / ticket.kapasitas) * 100
  const remainingTickets = ticket.kapasitas - ticket.totalTerjual
  const totalPrice = ticket.harga * form.watch('jumlahTiket')

  return (
    <div className="min-h-screen mt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-8 mb-12">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ticket.gambar} alt={ticket.judul} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center gap-2 flex-wrap">
              {ticket.kategori.map((e) => (
                <div key={e} className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  {e}
                </div>
              ))}
            </div>
            <h1 className="text-5xl mb-4 font-bold">{ticket.judul}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(ticket.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{ticket.waktu}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl mb-4 font-bold">Tentang Pertunjukan</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{ticket.deskripsi}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Lokasi</h3>
                </div>
                <p className="text-gray-700 font-medium">{ticket.venue}</p>
                <p className="text-gray-600">{ticket.kota}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Penyelenggara</h3>
                </div>
                <p className="text-gray-700 font-medium">{ticket.penyelenggara}</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Jadwal</h3>
                </div>
                <p className="text-gray-700 font-medium">{new Date(ticket.tanggal).toLocaleDateString('id-ID')}</p>
                <p className="text-gray-600">{ticket.waktu}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Kapasitas</h3>
                </div>
                <p className="text-gray-700 font-medium">{ticket.kapasitas} kursi</p>
                <p className="text-gray-600">{remainingTickets} tiket tersisa</p>
              </div>
            </div>

            {/* Seat Availability */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl mb-4 font-bold">Ketersediaan Tiket</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tiket Terjual</span>
                  <span className="text-gray-900 font-semibold">
                    {ticket.totalTerjual} / {ticket.kapasitas}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      soldPercentage >= 80
                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
              </div>
              {soldPercentage >= 80 && (
                <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-orange-900 font-medium">Segera pesan! Hanya tersisa {remainingTickets} tiket lagi.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Harga per tiket</div>
                <div className="text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  Rp {ticket.harga.toLocaleString('id-ID')}
                </div>
              </div>

              {/* Booking Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Nama */}
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={submitting} placeholder="Nama Anda" className="rounded-lg" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={submitting}
                            placeholder="email@example.com"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* No Handphone */}
                  <FormField
                    control={form.control}
                    name="noHandphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">No Handphone</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={submitting} placeholder="08123456789" className="rounded-lg" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Alamat */}
                  <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Alamat</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={submitting}
                            placeholder="Alamat lengkap Anda"
                            rows={2}
                            className="rounded-lg resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Metode Pembayaran */}
                  <FormField
                    control={form.control}
                    name="metodePembayaran"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Metode Pembayaran</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            disabled={submitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                            <option value="">Pilih metode</option>
                            <option value="transfer">Transfer</option>
                            <option value="cash">Cash</option>
                            <option value="kartu kredit">Kartu Kredit</option>
                            <option value="e-wallet">E-Wallet</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Jumlah Tiket */}
                  <FormField
                    control={form.control}
                    name="jumlahTiket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Jumlah Tiket</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                            <button
                              type="button"
                              onClick={() => field.onChange(field.value - 1)}
                              disabled={submitting || field.value === 1}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50">
                              -
                            </button>
                            <span className="flex-1 text-center font-semibold">{field.value}</span>
                            <button
                              type="button"
                              onClick={() => field.onChange(field.value + 1)}
                              disabled={submitting || field.value >= remainingTickets}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50">
                              +
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Biaya Layanan</span>
                      <span className="font-semibold">Rp 5.000</span>
                    </div>
                    <div className="border-t border-gray-200 my-2" />
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        Rp {(totalPrice + 5000).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {submitting && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                    {submitting ? 'Memproses...' : 'Beli Tiket'}
                  </Button>
                </form>
              </Form>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <Heart className="w-4 h-4" />
                  Simpan
                </button>
                <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
