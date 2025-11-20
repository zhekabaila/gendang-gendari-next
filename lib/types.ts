// API response types generated from example responses

export interface BlogResponse {
  id: string
  judul: string
  kategori: string[]
  ringkasan: string
  konten: string
  penulis: string
  tanggal: string // ISO date string
  waktuBaca: number
  gambar: string
  createdAt: string
  updatedAt: string
}

export interface TicketBuyer {
  jumlahTiket: number
}

export interface TicketResponse {
  id: string
  judul: string
  kategori: string[]
  deskripsi: string
  tanggal: string // ISO date string
  waktu: string // time string (HH:mm)
  venue: string
  kota: string
  harga: number
  kapasitas: number
  penyelenggara: string
  gambar: string
  createdAt: string
  updatedAt: string
  pembeli: TicketBuyer[]
  totalTerjual: number
  sisaQuota: number
  persentaseTerisi: number
}

export interface UserResponse {
  id: string
  nama: string
  umur: number
  asalKota: string
  username: string
  password: string // hashed password
  phone?: string
  createdAt: string
  updatedAt: string
}

export type Maybe<T> = T | null | undefined

export type PaginationType = {
  limit: number
  page: number
  size: number
  pages: number
}

export interface PembeliResponse {
  id: string
  nama: string
  email: string
  noHandphone: string
  alamat: string
  kota: string
  jumlahTiket: number
  metodePembayaran: string
  createdAt: string
  updatedAt: string
  userId: string
  ticketId: string
  user: UserResponse
  ticket: TicketResponse
}