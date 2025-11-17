import { Navbar } from '@/app/_components/Navbar'
import { mockBlogs, mockTickets } from '@/json/mockData'
import { Ticket, BookOpen, Users, TrendingUp, Calendar, DollarSign, Eye, BarChart3 } from 'lucide-react'

export function AdminDashboard() {
  const totalTickets = mockTickets.length
  const totalSold = mockTickets.reduce((sum, ticket) => sum + ticket.ticketsSold, 0)
  const totalRevenue = mockTickets.reduce((sum, ticket) => sum + ticket.ticketsSold * ticket.price, 0)
  const totalBlogs = mockBlogs.length

  const recentTickets = mockTickets.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl mb-2">Dashboard Admin</h1>
          <p className="text-gray-600 text-lg">Selamat datang kembali! Berikut ringkasan platform Anda.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl mb-1">{totalTickets}</div>
            <div className="text-gray-600 text-sm">Total Pertunjukan</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl mb-1">{totalSold.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Tiket Terjual</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl mb-1">Rp {(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-gray-600 text-sm">Total Pendapatan</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl mb-1">{totalBlogs}</div>
            <div className="text-gray-600 text-sm">Artikel Blog</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-left group">
            <Ticket className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl mb-2">Kelola Tiket</h3>
            <p className="opacity-90">Tambah, edit, atau hapus pertunjukan</p>
          </button>

          <button className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-left group">
            <BookOpen className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl mb-2">Kelola Blog</h3>
            <p className="opacity-90">Buat dan kelola artikel blog</p>
          </button>
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl">Pertunjukan Terbaru</h2>
            </div>
            <button className="text-purple-600 hover:text-purple-700 transition-colors">Lihat Semua →</button>
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
                {recentTickets.map((ticket) => {
                  const soldPercentage = (ticket.ticketsSold / ticket.capacity) * 100
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ticket.imageUrl} alt={ticket.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="text-gray-900">{ticket.title}</div>
                            <div className="text-sm text-gray-500">{ticket.organizer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{new Date(ticket.date).toLocaleDateString('id-ID')}</td>
                      <td className="px-6 py-4 text-gray-700">{ticket.city}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {ticket.ticketsSold} / {ticket.capacity}
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
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl">Penjualan Tiket Bulanan</h3>
            </div>
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Grafik penjualan akan ditampilkan di sini</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl">Kategori Populer</h3>
            </div>
            <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Grafik kategori akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
