import { BlogResponse } from '@/lib/types'
import { Calendar, User, Clock } from 'lucide-react'

interface BlogCardProps {
  blog: BlogResponse
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={'https://placehold.co/600x400'}
          alt={blog.judul}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center flex-wrap gap-2">
          {blog.kategori.map((e) => (
            <div key={e} className="bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] rounded-full">
              <span className="text-purple-700">{e}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">{blog.judul}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{blog.ringkasan}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{blog.penulis}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{blog.waktuBaca}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm">
              {new Date(blog.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <button className="text-purple-600 hover:text-purple-700 transition-colors">Baca →</button>
        </div>
      </div>
    </div>
  )
}
