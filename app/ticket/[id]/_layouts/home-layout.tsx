'use client'

import { Footer } from '@/app/_components/Footer'
import { Navbar } from '@/app/_components/Navbar'
import { mockTickets } from '@/json/mockData'
import { Calendar, Clock, MapPin, Users, Building, Ticket, Heart, Share2, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface TicketDetailPageProps {
  ticketId: string
}

export function TicketDetailPage({ ticketId }: TicketDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [showBookingSuccess, setShowBookingSuccess] = useState(false)

  const ticket = mockTickets.find((t) => t.id === ticketId)

  if (!ticket) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-3xl mb-4">Tiket Tidak Ditemukan</h2>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">
            Kembali ke Beranda
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const soldPercentage = (ticket.ticketsSold / ticket.capacity) * 100
  const remainingTickets = ticket.capacity - ticket.ticketsSold
  const totalPrice = ticket.price * quantity

  const handleBooking = () => {
    setShowBookingSuccess(true)
    setTimeout(() => {
      setShowBookingSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Booking Success Modal */}
      {showBookingSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center transform animate-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl mb-2">Pemesanan Berhasil!</h3>
            <p className="text-gray-600 mb-6">Tiket Anda telah dipesan. Silakan cek email untuk konfirmasi.</p>
            <button
              onClick={() => setShowBookingSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Kembali ke Daftar Pertunjukan
        </button>
      </div>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-8 mb-12">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ticket.imageUrl} alt={ticket.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">{ticket.category}</div>
            <h1 className="text-5xl mb-4">{ticket.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(ticket.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{ticket.time}</span>
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
              <h2 className="text-2xl mb-4">Tentang Pertunjukan</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{ticket.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl">Lokasi</h3>
                </div>
                <p className="text-gray-700">{ticket.venue}</p>
                <p className="text-gray-600">{ticket.city}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl">Penyelenggara</h3>
                </div>
                <p className="text-gray-700">{ticket.organizer}</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl">Jadwal</h3>
                </div>
                <p className="text-gray-700">{new Date(ticket.date).toLocaleDateString('id-ID')}</p>
                <p className="text-gray-600">{ticket.time}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl">Kapasitas</h3>
                </div>
                <p className="text-gray-700">{ticket.capacity} kursi</p>
                <p className="text-gray-600">{remainingTickets} tiket tersisa</p>
              </div>
            </div>

            {/* Seat Availability */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl mb-4">Ketersediaan Tiket</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tiket Terjual</span>
                  <span className="text-gray-900">
                    {ticket.ticketsSold} / {ticket.capacity}
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
                  <p className="text-orange-900">Segera pesan! Hanya tersisa {remainingTickets} tiket lagi.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Harga per tiket</div>
                <div className="text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Rp {ticket.price.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <label className="block text-sm text-gray-600 mb-3">Jumlah Tiket</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
                    -
                  </button>
                  <div className="flex-1 text-center text-2xl">{quantity}</div>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-lg">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="text-lg">Rp 5.000</span>
                </div>
                <div className="border-t border-gray-200 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Rp {(totalPrice + 5000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all mb-4 flex items-center justify-center gap-2">
                <Ticket className="w-5 h-5" />
                Pesan Tiket
              </button>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Simpan
                </button>
                <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
