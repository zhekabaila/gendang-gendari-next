import { z } from 'zod'

export const pembeliSchema = z.object({
  nama: z.string().min(1, { message: 'Nama is required' }).min(3, { message: 'Nama must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  noHandphone: z.string().regex(/^[0-9]{10,12}$/, { message: 'Phone number must be 10-12 digits' }),
  alamat: z.string().min(1, { message: 'Alamat is required' }).min(5, { message: 'Alamat must be at least 5 characters' }),
  kota: z.string().min(1, { message: 'Kota is required' }),
  jumlahTiket: z.coerce
    .number()
    .int()
    .min(1, { message: 'Umur must be at least 1' })
    .max(150, { message: 'Umur must be less than 150' }),
  metodePembayaran: z
    .string()
    .min(1, { message: 'Metode pembayaran is required' })
    .refine((method) => ['transfer', 'cash', 'kartu kredit', 'e-wallet'].includes(method.toLowerCase()), {
      message: 'Metode pembayaran must be one of: transfer, cash, kartu kredit, e-wallet'
    }),
  userId: z.string().optional(),
  ticketId: z.string().min(1, { message: 'Ticket ID is required' })
})
