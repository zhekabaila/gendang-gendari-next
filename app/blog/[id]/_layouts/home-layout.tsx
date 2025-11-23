'use client'

import { Calendar, User, Clock, Heart, Share2, ChevronLeft, LoaderCircle } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { API } from '@/services'
import { blogServices } from '@/services/blog'
import { toast } from 'sonner'
import { BlogResponse } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface BlogDetailPageProps {
  blogId: string
}

export function BlogDetailPage({ blogId }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<BlogResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch blog detail
  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true)
      const response = await API({
        method: 'GET',
        url: `${blogServices.getAll}/${blogId}`
      })

      const { data }: { data: BlogResponse } = response.data
      setBlog(data)
    } catch (err) {
      console.error('Fetch error:', err)
      if (err instanceof AxiosError) {
        toast.error(
          (err.response?.data as { data?: string; message?: string })?.data ||
            (err.response?.data as { data?: string; message?: string })?.message ||
            'Blog tidak ditemukan'
        )
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }, [blogId])

  useEffect(() => {
    fetchBlog()
  }, [fetchBlog])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-20 text-center">
          <h2 className="text-3xl mb-4">Blog Tidak Ditemukan</h2>
          <Button onClick={() => router.push('/blog')} className="bg-gradient-to-r from-pink-500 to-purple-600">
            Kembali ke Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-8 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </button>
      </div>

      {/* Hero Image */}
      <section className="max-w-4xl mx-auto px-8 mb-8">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.gambar} alt={blog.judul} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {blog.kategori.map((e) => (
                <div key={e} className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {e}
                </div>
              ))}
            </div>
            <h1 className="text-5xl font-bold">{blog.judul}</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        {/* Meta Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Penulis</p>
              <p className="font-semibold text-gray-900">{blog.penulis}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tanggal</p>
              <p className="font-semibold text-gray-900">
                {new Date(blog.tanggal).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Waktu Baca</p>
              <p className="font-semibold text-gray-900">{blog.waktuBaca} menit</p>
            </div>
          </div>
        </div>

        {/* Ringkasan */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Ringkasan</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{blog.ringkasan}</p>
        </div>

        {/* Konten */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Konten</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.konten}</div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 py-4 bg-white border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-colors flex items-center justify-center gap-2 text-gray-700 hover:text-purple-600 font-semibold">
            <Heart className="w-5 h-5" />
            Simpan
          </button>
          <button className="flex-1 py-4 bg-white border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-colors flex items-center justify-center gap-2 text-gray-700 hover:text-purple-600 font-semibold">
            <Share2 className="w-5 h-5" />
            Bagikan
          </button>
        </div>
      </section>
    </div>
  )
}
