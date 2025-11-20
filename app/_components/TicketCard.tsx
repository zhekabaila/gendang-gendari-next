import { TicketResponse } from '@/lib/types'
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react'

interface TicketCardProps {
  ticket: TicketResponse
  featured?: boolean
}

export function TicketCard({ ticket, featured = false }: TicketCardProps) {
  const isAlmostFull = ticket.persentaseTerisi >= 80

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-56">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={'https://placehold.co/600x400'}
          alt={ticket.judul}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Pilihan</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex items-center flex-wrap gap-2">
          {ticket.kategori.map((e) => (
            <span
              key={e}
              className="block text-purple-700 bg-white/90 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-full">
              {e}
            </span>
          ))}
        </div>

        {isAlmostFull && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm">
            Hampir Penuh!
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">{ticket.judul}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm">
              {new Date(ticket.tanggal).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-pink-500" />
            <span className="text-sm">
              {ticket.venue}, {ticket.kota}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-sm">
              {ticket.totalTerjual} / {ticket.kapasitas} tiket terjual
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isAlmostFull ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              style={{ width: `${ticket.persentaseTerisi}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">Harga mulai dari</div>
            <div className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Rp {ticket.harga.toLocaleString('id-ID')}
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
            Detail
          </button>
        </div>
      </div>
    </div>
  )
}
