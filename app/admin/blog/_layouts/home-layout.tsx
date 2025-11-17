'use client'

import { Navbar } from '@/app/_components/Navbar'
import { mockBlogs } from '@/json/mockData'
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar } from 'lucide-react'
import { useState } from 'react'

export function AdminBlogManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)

  const categories = ['Semua', 'Budaya', 'Tari', 'Musik', 'Teater', 'Wayang']

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin />

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl mb-6">Tambah Artikel Baru</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Judul Artikel</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Judul menarik untuk artikel"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Kategori</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Budaya</option>
                    <option>Tari</option>
                    <option>Musik</option>
                    <option>Teater</option>
                    <option>Wayang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Excerpt / Ringkasan</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Ringkasan singkat artikel (1-2 kalimat)"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Konten Artikel</label>
                <textarea
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tulis konten lengkap artikel di sini..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Penulis</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nama penulis"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Waktu Baca</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="5 menit"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">URL Gambar</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Simpan Artikel
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl mb-2">Hapus Artikel?</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                Batal
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setSelectedBlog(null)
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2">Kelola Blog & Artikel</h1>
            <p className="text-gray-600 text-lg">Buat, edit, atau hapus artikel blog</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-5 h-5" />
            Tambah Artikel
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Filter Kategori:</span>
              </div>
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
          </div>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Artikel</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Penulis</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Waktu Baca</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blog.imageUrl} alt={blog.title} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="max-w-sm">
                          <div className="text-gray-900 line-clamp-1">{blog.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">{blog.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{blog.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{new Date(blog.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{blog.readTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                          title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBlog(blog.id)
                            setShowAddModal(true)
                          }}
                          className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                          title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBlog(blog.id)
                            setShowDeleteConfirm(true)
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

          {filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">Tidak Ada Artikel</h3>
              <p className="text-gray-500 mb-6">Coba ubah filter atau tambah artikel baru</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                Tambah Artikel
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="text-sm text-gray-600 mb-2">Total Artikel</div>
            <div className="text-3xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {mockBlogs.length}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
            <div className="text-sm text-gray-600 mb-2">Kategori Aktif</div>
            <div className="text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {categories.length - 1}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6">
            <div className="text-sm text-gray-600 mb-2">Penulis Aktif</div>
            <div className="text-3xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {new Set(mockBlogs.map((b) => b.author)).size}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
