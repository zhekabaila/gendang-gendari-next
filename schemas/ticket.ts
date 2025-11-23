import { z } from 'zod'

export const ticketSchema = z.object({
  judul: z.string().min(1, { message: 'Judul is required' }).min(3, { message: 'Judul must be at least 3 characters' }),
  kategori: z.array(z.string()).min(1, { message: 'At least one category is required' }),
  deskripsi: z
    .string()
    .min(1, { message: 'Deskripsi is required' })
    .min(10, { message: 'Deskripsi must be at least 10 characters' }),
  tanggal: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val))
    .refine((date) => date > new Date(), { message: 'Tanggal harus di masa depan' }),
  waktu: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Waktu must be in HH:MM format' }),
  venue: z.string().min(1, { message: 'Venue is required' }),
  kota: z.string().min(1, { message: 'Kota is required' }),
  harga: z.number().int().positive({ message: 'Harga must be a positive number' }),
  kapasitas: z.number().int().positive({ message: 'Kapasitas must be a positive number' }),
  penyelenggara: z.string().min(1, { message: 'Penyelenggara is required' }),
  gambar: z.string().regex(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, {
    message: 'Gambar must be a valid base64 image format (data:image/png;base64,...)'
  })
})
