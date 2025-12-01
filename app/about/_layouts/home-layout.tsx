import { Heart, Target, Users, Award, Sparkles, Globe, TrendingUp, Shield } from 'lucide-react'

export function AboutLayout() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Tentang SeniLokal</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            Melestarikan Budaya,
            <br />
            Mendukung Seniman Lokal
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto opacity-90">
            Platform digital yang menghubungkan pecinta seni dengan pertunjukan seni lokal terbaik di seluruh Indonesia
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Misi Kami</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Memudahkan akses masyarakat terhadap pertunjukan seni lokal berkualitas, sekaligus memberikan platform yang
              efektif bagi seniman dan penyelenggara untuk menjangkau audiens yang lebih luas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">Visi Kami</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Menjadi platform terdepan dalam mempromosikan dan melestarikan seni budaya lokal Indonesia, menjembatani
              tradisi dengan teknologi modern untuk generasi masa depan.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-3 md:mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg md:text-xl text-gray-600">Prinsip yang memandu setiap langkah kami</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl mb-3">Cinta Budaya</h3>
              <p className="text-gray-600">Dedikasi penuh untuk melestarikan dan mengembangkan seni budaya Indonesia</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3">Kolaboratif</h3>
              <p className="text-gray-600">Membangun ekosistem yang saling mendukung antara seniman dan penikmat seni</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl mb-3">Inovatif</h3>
              <p className="text-gray-600">Menggunakan teknologi untuk memberikan pengalaman terbaik bagi semua pihak</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl mb-3">Terpercaya</h3>
              <p className="text-gray-600">Transparansi dan keamanan dalam setiap transaksi dan layanan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl mb-4 md:mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                SeniLokal lahir dari keprihatinan terhadap minimnya akses masyarakat terhadap pertunjukan seni lokal. Banyak
                pertunjukan berkualitas tinggi yang hanya diketahui oleh kalangan terbatas, sementara seniman kesulitan
                menjangkau audiens yang lebih luas.
              </p>
              <p>
                Kami percaya bahwa teknologi dapat menjembatani kesenjangan ini. Dengan platform digital yang mudah
                digunakan, kami menghubungkan seniman dengan penikmat seni dari berbagai kalangan, terutama generasi muda
                yang merupakan masa depan pelestarian budaya.
              </p>
              <p>
                Sejak diluncurkan, kami telah memfasilitasi lebih dari 500 pertunjukan seni di 15 kota besar Indonesia,
                dengan lebih dari 50.000 penonton yang puas. Perjalanan kami baru dimulai, dan kami terus berkomitmen untuk
                mendukung ekosistem seni dan budaya Indonesia.
              </p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl md:rounded-3xl blur-2xl opacity-50" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800"
              alt="Seni Budaya Indonesia"
              className="relative w-full h-64 md:h-96 object-cover rounded-2xl md:rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl mb-3 md:mb-4">Dampak Kami</h2>
            <p className="text-lg md:text-xl opacity-90">Angka-angka yang membanggakan</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
              <Award className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4" />
              <div className="text-3xl md:text-5xl mb-1 md:mb-2">500+</div>
              <div className="text-sm md:text-lg opacity-90">Pertunjukan Terfasilitasi</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
              <Users className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4" />
              <div className="text-3xl md:text-5xl mb-1 md:mb-2">50K+</div>
              <div className="text-sm md:text-lg opacity-90">Penonton Bahagia</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
              <Globe className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4" />
              <div className="text-3xl md:text-5xl mb-1 md:mb-2">15+</div>
              <div className="text-sm md:text-lg opacity-90">Kota di Indonesia</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
              <Heart className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4" />
              <div className="text-3xl md:text-5xl mb-1 md:mb-2">200+</div>
              <div className="text-sm md:text-lg opacity-90">Seniman Terdukung</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl mb-3 md:mb-4">Tim Kami</h2>
          <p className="text-lg md:text-xl text-gray-600">Orang-orang di balik SeniLokal</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            {
              name: 'Andi Wijaya',
              role: 'CEO & Founder',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
            },
            {
              name: 'Siti Nurhaliza',
              role: 'Head of Operations',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
            },
            {
              name: 'Budi Santoso',
              role: 'Head of Technology',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
            },
            {
              name: 'Maya Anggraini',
              role: 'Head of Marketing',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
            }
          ].map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative mb-4">
                <div className="absolute -inset-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-full aspect-square object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
              }}
            />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl mb-3 md:mb-4">Bergabunglah Bersama Kami</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
              Mari bersama-sama melestarikan seni dan budaya Indonesia untuk generasi mendatang
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-purple-700 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all">
                Jelajahi Pertunjukan
              </button>
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl md:rounded-2xl hover:bg-white/30 transition-all">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
