import { TicketResponse } from '@/lib/types'
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface TicketCardProps {
  ticket: TicketResponse
  featured?: boolean
}

export function TicketCard({ ticket, featured = false }: TicketCardProps) {
  const isAlmostFull = ticket.persentaseTerisi >= 80

  return (
    <div className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-40 sm:h-48 md:h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ticket.gambar || 'https://placehold.co/600x400'}
          alt={ticket.judul}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {featured && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-2 shadow-lg">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Pilihan</span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center flex-wrap gap-1 md:gap-2">
          {ticket.kategori.map((e) => (
            <span
              key={e}
              className="block text-purple-700 bg-white/90 backdrop-blur-sm text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full">
              {e}
            </span>
          ))}
        </div>

        {isAlmostFull && (
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-red-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm">
            Hampir Penuh!
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-xl mb-2 md:mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {ticket.judul}
        </h3>

        <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-600">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-500 flex-shrink-0" />
            <span className="text-xs md:text-sm truncate">
              {new Date(ticket.tanggal).toLocaleDateString('id-ID', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-600">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-500 flex-shrink-0" />
            <span className="text-xs md:text-sm truncate">
              {ticket.venue}, {ticket.kota}
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-600">
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500 flex-shrink-0" />
            <span className="text-xs md:text-sm">
              {ticket.totalTerjual} / {ticket.kapasitas} tiket terjual
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3 md:mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isAlmostFull ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              style={{ width: `${ticket.persentaseTerisi}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-xs md:text-sm text-gray-500 mb-0.5 md:mb-1">Harga mulai dari</div>
            <div className="text-lg md:text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
              Rp {ticket.harga.toLocaleString('id-ID')}
            </div>
          </div>
          <Link
            href={`/ticket/${ticket.id}`}
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all text-sm md:text-base flex-shrink-0">
            Detail
          </Link>
        </div>
      </div>
    </div>
  )
}
