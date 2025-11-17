'use client'

import { Footer } from '@/app/_components/Footer'
import { Navbar } from '@/app/_components/Navbar'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export function ContactLayout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl mb-2">Pesan Terkirim!</h3>
            <p className="text-gray-600 mb-6">Terima kasih telah menghubungi kami. Tim kami akan segera merespon.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl">
              Tutup
            </button>
          </div>
        </div>
      )}

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
            <MessageCircle className="w-5 h-5" />
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-6xl mb-6">
            Ada Pertanyaan?
            <br />
            Kami Siap Membantu
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Tim kami siap menjawab pertanyaan dan membantu Anda dalam setiap langkah
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-8 mt-16 mb-20">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-2">Email</h3>
            <p className="text-gray-600 mb-2">info@senilokal.id</p>
            <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-2">Telepon</h3>
            <p className="text-gray-600 mb-2">+62 812 3456 7890</p>
            <p className="text-sm text-gray-500">Senin - Jumat, 09:00 - 17:00</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl mb-2">Alamat</h3>
            <p className="text-gray-600 mb-2">Jl. Kebudayaan No. 123</p>
            <p className="text-sm text-gray-500">Jakarta Pusat, 10110</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h2 className="text-3xl mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Subjek</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tentang apa pesan Anda?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Pesan</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl">Jam Operasional</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center py-2 border-b border-purple-200">
                  <span>Senin - Jumat</span>
                  <span className="font-medium">09:00 - 17:00 WIB</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-purple-200">
                  <span>Sabtu</span>
                  <span className="font-medium">09:00 - 15:00 WIB</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Minggu & Libur</span>
                  <span className="font-medium text-red-500">Tutup</span>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8">
              <h3 className="text-2xl mb-6">Pertanyaan Umum</h3>
              <div className="space-y-4">
                {[
                  'Bagaimana cara memesan tiket?',
                  'Apakah bisa refund tiket?',
                  'Bagaimana cara menjadi partner?',
                  'Apakah ada diskon untuk grup?'
                ].map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all text-gray-700">
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-3" />
                  <p className="text-gray-700">Lokasi Kantor Kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
