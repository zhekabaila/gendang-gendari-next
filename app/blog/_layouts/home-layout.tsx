'use client'

import { Footer } from '@/app/_components/Footer'
import { Navbar } from '@/app/_components/Navbar'
import { mockBlogs } from '@/json/mockData'
import { BookOpen, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { BlogCard } from '../_components/BlogCard'

export function BlogLayout() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const categories = ['Semua', 'Budaya', 'Tari', 'Musik', 'Teater', 'Wayang']

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredBlog = mockBlogs[0]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <BookOpen className="w-5 h-5" />
            <span>Blog & Artikel</span>
          </div>
          <h1 className="text-6xl mb-6">
            Cerita Seni
            <br />& Budaya Indonesia
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Jelajahi artikel menarik tentang seni, budaya, dan pertunjukan tradisional Indonesia
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-8 -mt-20 mb-16">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-2 cursor-pointer group hover:shadow-3xl transition-all">
          <div className="relative h-96 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredBlog.imageUrl}
              alt={featuredBlog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
              Featured
            </div>
          </div>
          <div className="p-12 flex flex-col justify-center">
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm mb-4 self-start">
              {featuredBlog.category}
            </div>
            <h2 className="text-4xl mb-4 group-hover:text-purple-600 transition-colors">{featuredBlog.title}</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{featuredBlog.excerpt}</p>
            <div className="flex items-center gap-4 text-gray-500">
              <span>{featuredBlog.author}</span>
              <span>•</span>
              <span>{new Date(featuredBlog.date).toLocaleDateString('id-ID')}</span>
              <span>•</span>
              <span>{featuredBlog.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-8 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-6">
            {/* Search */}
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

            {/* Category Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Kategori:</span>
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
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-7 h-7 text-purple-600" />
          <h2 className="text-3xl">Semua Artikel</h2>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl text-gray-600 mb-2">Tidak Ada Artikel</h3>
            <p className="text-gray-500">Coba ubah pencarian atau filter untuk melihat artikel lainnya</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
