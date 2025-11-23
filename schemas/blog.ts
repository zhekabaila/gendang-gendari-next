import { z } from 'zod'

export const blogSchema = z.object({
  judul: z.string().min(1, { message: 'Judul is required' }).min(5, { message: 'Judul must be at least 5 characters' }),
  kategori: z.array(z.string()).min(1, { message: 'At least one category is required' }),
  ringkasan: z
    .string()
    .min(1, { message: 'Ringkasan is required' })
    .min(20, { message: 'Ringkasan must be at least 20 characters' })
    .max(500, { message: 'Ringkasan must be less than 500 characters' }),
  konten: z.string().min(1, { message: 'Konten is required' }).min(50, { message: 'Konten must be at least 50 characters' }),
  penulis: z
    .string()
    .min(1, { message: 'Penulis is required' })
    .min(3, { message: 'Penulis name must be at least 3 characters' }),
  tanggal: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val))
    .refine((date) => date <= new Date(), { message: 'Tanggal cannot be in the future' }),
  waktuBaca: z
    .number()
    .int()
    .positive({ message: 'Waktu baca must be a positive number' })
    .max(600, { message: 'Waktu baca must be less than 600 minutes' }),
  gambar: z.string().regex(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, {
    message: 'Gambar must be a valid base64 image format (data:image/png;base64,...)'
  })
})
