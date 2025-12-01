import { Ticket, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Ticket className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl">SeniLokal</span>
            </div>
            <p className="text-purple-200 mb-6 text-sm md:text-base">
              Platform pemesanan tiket pertunjukan seni lokal terpercaya untuk mendukung kreativitas daerah.
            </p>
            <div className="flex gap-2 md:gap-3">
              <button className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className="w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 md:mb-4 text-base md:text-lg">Navigasi</h3>
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
            <h3 className="mb-3 md:mb-4 text-base md:text-lg">Kategori</h3>
            <ul className="space-y-2 md:space-y-3 text-purple-200 text-sm md:text-base">
              <li>Teater Tradisional</li>
              <li>Musik Daerah</li>
              <li>Tari Kontemporer</li>
              <li>Pertunjukan Wayang</li>
              <li>Festival Budaya</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 md:mb-4 text-base md:text-lg">Hubungi Kami</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200 text-sm md:text-base">info@senilokal.id</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200 text-sm md:text-base">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-purple-300" />
                <span className="text-purple-200 text-sm md:text-base">
                  Jl. Kebudayaan No. 123
                  <br />
                  Jakarta Pusat, 10110
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-300 text-xs md:text-sm text-center md:text-left">
            © 2025 SeniLokal. Semua hak cipta dilindungi.
          </p>
          <div className="flex gap-4 md:gap-6 text-purple-300 text-xs md:text-sm">
            <button className="hover:text-white transition-colors">Kebijakan Privasi</button>
            <button className="hover:text-white transition-colors">Syarat & Ketentuan</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
