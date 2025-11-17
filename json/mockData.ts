export interface Ticket {
  id: string
  title: string
  category: string
  date: string
  time: string
  venue: string
  city: string
  price: number
  imageUrl: string
  description: string
  organizer: string
  capacity: number
  ticketsSold: number
  featured: boolean
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  imageUrl: string
  category: string
  readTime: string
}

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Wayang Kulit Ramayana Spektakuler',
    category: 'Wayang',
    date: '2025-12-15',
    time: '19:00 WIB',
    venue: 'Gedung Kesenian Jakarta',
    city: 'Jakarta',
    price: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    description:
      'Pertunjukan wayang kulit megah yang mengisahkan kisah epik Ramayana dengan dalang terkenal Ki Joko Edan. Nikmati perpaduan seni tradisional dengan teknologi modern dalam pertunjukan spektakuler ini.',
    organizer: 'Sanggar Wayang Nusantara',
    capacity: 500,
    ticketsSold: 324,
    featured: true
  },
  {
    id: '2',
    title: 'Tari Saman Festival Aceh',
    category: 'Tari',
    date: '2025-12-20',
    time: '18:30 WIB',
    venue: 'Taman Budaya Aceh',
    city: 'Banda Aceh',
    price: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800',
    description:
      'Festival tari Saman yang memukau dengan 100 penari profesional. Saksikan harmoni gerakan yang menakjubkan dan energi yang luar biasa dari tarian warisan budaya UNESCO ini.',
    organizer: 'Dewan Kesenian Aceh',
    capacity: 800,
    ticketsSold: 456,
    featured: true
  },
  {
    id: '3',
    title: 'Konser Gamelan Jawa Kontemporer',
    category: 'Musik',
    date: '2025-12-18',
    time: '20:00 WIB',
    venue: 'Balai Soedjatmoko',
    city: 'Yogyakarta',
    price: 100000,
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    description:
      'Kolaborasi unik antara musik gamelan tradisional Jawa dengan aransemen kontemporer. Dipersembahkan oleh maestro gamelan terbaik Indonesia dengan nuansa modern yang menyegarkan.',
    organizer: 'ISI Yogyakarta',
    capacity: 300,
    ticketsSold: 187,
    featured: false
  },
  {
    id: '4',
    title: 'Teater Tradisional: Malin Kundang',
    category: 'Teater',
    date: '2025-12-22',
    time: '19:30 WIB',
    venue: 'Gedung Teater Padang',
    city: 'Padang',
    price: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
    description:
      'Adaptasi modern dari cerita rakyat Malin Kundang yang menyentuh hati. Pertunjukan teater dengan set panggung spektakuler dan akting memukau dari aktor-aktor berbakat.',
    organizer: 'Teater Minang Kabau',
    capacity: 400,
    ticketsSold: 298,
    featured: true
  },
  {
    id: '5',
    title: 'Festival Angklung Internasional',
    category: 'Musik',
    date: '2025-12-25',
    time: '16:00 WIB',
    venue: 'Saung Angklung Udjo',
    city: 'Bandung',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    description:
      'Festival angklung terbesar dengan partisipasi pemain dari berbagai negara. Rasakan getaran musik bambu yang menenangkan dalam harmoni yang indah dan penuh warna.',
    organizer: 'Saung Angklung Udjo',
    capacity: 1000,
    ticketsSold: 678,
    featured: false
  },
  {
    id: '6',
    title: 'Pertunjukan Reog Ponorogo Megah',
    category: 'Tari',
    date: '2025-12-28',
    time: '17:00 WIB',
    venue: 'Alun-Alun Ponorogo',
    city: 'Ponorogo',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
    description:
      'Pertunjukan Reog Ponorogo yang mempesona dengan dadak merak raksasa dan gerakan akrobatik yang menantang maut. Saksikan keberanian dan kekuatan para pemain dalam tradisi seni yang legendaris.',
    organizer: 'Paguyuban Reog Ponorogo',
    capacity: 600,
    ticketsSold: 423,
    featured: false
  }
]

export const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Mengenal Lebih Dekat Seni Wayang Kulit Indonesia',
    excerpt:
      'Wayang kulit adalah salah satu warisan budaya Indonesia yang telah diakui UNESCO. Mari kita jelajahi sejarah dan keunikan seni pertunjukan ini.',
    content: `Wayang kulit merupakan seni pertunjukan tradisional Indonesia yang telah berusia ratusan tahun. Seni ini tidak hanya sekadar hiburan, tetapi juga medium penyampaian nilai-nilai filosofis dan pendidikan moral.

Dalam setiap pertunjukan wayang kulit, seorang dalang berperan sangat penting. Dalang tidak hanya menggerakkan wayang, tetapi juga menjadi narator, pengatur musik gamelan, dan penyampai pesan moral. Kemampuan multitasking ini membuat profesi dalang sangat dihormati dalam masyarakat Jawa.

Wayang kulit biasanya dibuat dari kulit kerbau atau sapi yang telah dikeringkan. Proses pembuatannya memerlukan keahlian khusus dan kesabaran tinggi. Setiap tokoh wayang memiliki karakteristik unik yang tercermin dari bentuk wajah, postur tubuh, dan detail ornamen.

UNESCO telah mengakui wayang kulit sebagai Masterpiece of Oral and Intangible Heritage of Humanity pada tahun 2003. Pengakuan ini menjadi bukti bahwa seni wayang kulit memiliki nilai universal yang perlu dilestarikan.`,
    author: 'Dr. Siti Rahmawati',
    date: '2025-11-10',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    category: 'Budaya',
    readTime: '5 menit'
  },
  {
    id: '2',
    title: 'Keindahan Tari Saman: Harmoni dalam Gerakan',
    excerpt:
      'Tari Saman dari Aceh adalah bukti nyata bagaimana seni dapat menyatukan gerakan, suara, dan jiwa dalam harmoni yang sempurna.',
    content: `Tari Saman merupakan tarian tradisional dari Aceh yang terkenal dengan keunikan dan keindahannya. Tarian ini biasanya dibawakan oleh sekelompok penari laki-laki yang duduk berjajar sambil melakukan gerakan yang sangat kompak dan presisi tinggi.

Yang membuat Tari Saman istimewa adalah tidak adanya iringan musik alat tradisional. Sebagai gantinya, para penari menciptakan irama sendiri melalui tepukan tangan, tepukan dada, dan nyanyian yang terkoordinasi dengan sempurna. Inilah yang membuat setiap pertunjukan Tari Saman menjadi tontonan yang memukau.

Tari Saman biasanya dibawakan dalam acara-acara penting seperti perayaan hari besar Islam, pesta pernikahan, atau acara kenegaraan. Tarian ini tidak hanya berfungsi sebagai hiburan, tetapi juga sebagai media dakwah dan penyampaian pesan moral.

Pada tahun 2011, UNESCO memasukkan Tari Saman ke dalam Daftar Representatif Budaya Tak Benda Warisan Manusia. Pengakuan internasional ini semakin menegaskan bahwa Tari Saman adalah aset budaya yang sangat berharga bagi Indonesia.`,
    author: 'Ahmad Fauzi',
    date: '2025-11-12',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800',
    category: 'Tari',
    readTime: '4 menit'
  },
  {
    id: '3',
    title: 'Gamelan: Orkestra Tradisional yang Mendunia',
    excerpt:
      'Musik gamelan telah memikat hati pendengar di seluruh dunia. Simak perjalanan instrumen tradisional ini menuju panggung internasional.',
    content: `Gamelan adalah ansambel musik tradisional Indonesia yang terdiri dari berbagai instrumen perkusi seperti gong, kenong, saron, dan bonang. Musik gamelan memiliki karakteristik suara yang unik dan harmonis, menciptakan atmosfer yang khas.

Sejarah gamelan dapat ditelusuri hingga ratusan tahun yang lalu. Relief pada Candi Borobudur menunjukkan berbagai instrumen musik yang menyerupai gamelan modern. Ini membuktikan bahwa musik gamelan telah menjadi bagian integral dari budaya Jawa sejak zaman kuno.

Yang menarik dari musik gamelan adalah sistem nada yang berbeda dari musik Barat. Gamelan menggunakan sistem laras slendro dan pelog yang memiliki interval nada unik. Perbedaan ini memberikan warna musik yang eksotis dan menarik bagi pendengar internasional.

Saat ini, gamelan telah dipelajari di berbagai universitas di seluruh dunia. Banyak musisi Barat yang tertarik untuk menggabungkan elemen gamelan dalam karya musik kontemporer mereka. Ini menunjukkan bahwa gamelan memiliki daya tarik universal yang melampaui batas budaya.`,
    author: 'Prof. Budi Santoso',
    date: '2025-11-15',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    category: 'Musik',
    readTime: '6 menit'
  }
]
