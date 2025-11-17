import { Ticket, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl">SeniLokal</span>
            </div>
            <p className="text-purple-200 mb-6">
              Platform pemesanan tiket pertunjukan seni lokal terpercaya untuk mendukung kreativitas daerah.
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Navigasi</h3>
            <ul className="space-y-3">
              {['Beranda', 'Tentang', 'Blog', 'Kontak'].map((item) => {
                // const pages = ['landing', 'about', 'blog', 'contact']
                return (
                  <li key={item}>
                    <button className="text-purple-200 hover:text-white transition-colors">{item}</button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4">Kategori</h3>
            <ul className="space-y-3 text-purple-200">
              <li>Teater Tradisional</li>
              <li>Musik Daerah</li>
              <li>Tari Kontemporer</li>
              <li>Pertunjukan Wayang</li>
              <li>Festival Budaya</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200">info@senilokal.id</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200">
                  Jl. Kebudayaan No. 123
                  <br />
                  Jakarta Pusat, 10110
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-12 pt-8 flex justify-between items-center">
          <p className="text-purple-300">© 2025 SeniLokal. Semua hak cipta dilindungi.</p>
          <div className="flex gap-6 text-purple-300">
            <button className="hover:text-white transition-colors">Kebijakan Privasi</button>
            <button className="hover:text-white transition-colors">Syarat & Ketentuan</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
