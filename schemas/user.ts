import { z } from 'zod'

export const userSchema = () =>
  z.object({
    nama: z.string().min(1, { message: 'Nama is required' }).min(3, { message: 'Nama must be at least 3 characters' }),
    umur: z
      .number()
      .int()
      .min(1, { message: 'Umur must be at least 1' })
      .max(150, { message: 'Umur must be less than 150' }),
    asalKota: z.string().min(1, { message: 'Asal kota is required' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
    phone: z.string().regex(/^[0-9]{10,12}$/, { message: 'Phone number must be 10-12 digits' })
  })
