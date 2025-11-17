'use client'

import { Footer } from '@/app/_components/Footer'
import { Navbar } from '@/app/_components/Navbar'
import { TicketCard } from '@/app/_components/TicketCard'
import { mockTickets } from '@/json/mockData'
import { Sparkles, Calendar, MapPin, Filter } from 'lucide-react'
import { useState } from 'react'

export function HomeLayout() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedCity, setSelectedCity] = useState('Semua')

  const categories = ['Semua', 'Wayang', 'Tari', 'Musik', 'Teater']
  const cities = ['Semua', 'Jakarta', 'Bandung', 'Yogyakarta', 'Banda Aceh', 'Padang', 'Ponorogo']

  const filteredTickets = mockTickets.filter((ticket) => {
    const categoryMatch = selectedCategory === 'Semua' || ticket.category === selectedCategory
    const cityMatch = selectedCity === 'Semua' || ticket.city === selectedCity
    return categoryMatch && cityMatch
  })

  const featuredTickets = mockTickets.filter((t) => t.featured)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900">Platform Tiket Pertunjukan Seni Lokal Terpercaya</span>
            </div>

            <h1 className="text-6xl mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-7 h-7 text-purple-600" />
          <h2 className="text-3xl">Pertunjukan Pilihan</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {featuredTickets.slice(0, 3).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} featured />
          ))}
        </div>
      </section>

      {/* Main Ticket List Section */}
      <section id="ticket-section" className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl">Semua Pertunjukan</h2>
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">Filter:</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedCategory === category
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
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                      selectedCity === city
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

        {/* Ticket Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl text-gray-600 mb-2">Tidak Ada Pertunjukan</h3>
            <p className="text-gray-500">Coba ubah filter untuk melihat pertunjukan lainnya</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
