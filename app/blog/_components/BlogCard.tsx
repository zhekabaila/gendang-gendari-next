import { BlogResponse } from '@/lib/types'
import { Calendar, User, Clock } from 'lucide-react'
import Link from 'next/link'

interface BlogCardProps {
  blog: BlogResponse
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-40 sm:h-48 md:h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blog.gambar || 'https://placehold.co/600x400'}
          alt={blog.judul}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center flex-wrap gap-1 md:gap-2">
          {blog.kategori.map((e) => (
            <div
              key={e}
              className="bg-white/90 backdrop-blur-sm px-1.5 md:px-2 py-0.5 text-[8px] md:text-[10px] rounded-full">
              <span className="text-purple-700">{e}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-xl mb-2 md:mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {blog.judul}
        </h3>

        <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-base">
          {blog.ringkasan}
        </p>

        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
          <div className="flex items-center gap-1 md:gap-1.5">
            <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="truncate max-w-[80px] md:max-w-none">{blog.penulis}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{blog.waktuBaca}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-600">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500" />
            <span className="text-xs md:text-sm">
              {new Date(blog.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <Link
            href={'/blog/' + blog.id}
            className="text-purple-600 hover:text-purple-700 transition-colors text-sm md:text-base">
            Baca →
          </Link>
        </div>
      </div>
    </div>
  )
}
