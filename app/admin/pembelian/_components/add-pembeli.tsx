'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { pembeliSchema } from '@/schemas/pembeli'
import { API } from '@/services'
import { pembeliServices } from '@/services/pembeli'
import { toast } from 'sonner'
import { usePembeliStore } from '../_stores/use-pembeli-store'
import { PembeliResponse } from '@/lib/types'
import { LoaderCircle, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IProps {
  type: 'add' | 'edit'
  editData: PembeliResponse | null
  open: boolean
  onOpenChange: (open: boolean) => void
  fetchPembelisFunc: () => void
  token: string
}

const AddPembeli = ({ type, editData, open, onOpenChange, fetchPembelisFunc, token }: IProps) => {
  const [loading, setLoading] = useState(false)

  const { addPembeli, updatePembeli } = usePembeliStore()

  const form = useForm<z.infer<typeof pembeliSchema>>({
    resolver: zodResolver(pembeliSchema),
    defaultValues: {
      nama: '',
      email: '',
      noHandphone: '',
      alamat: '',
      kota: '',
      jumlahTiket: 0,
      metodePembayaran: '',
      userId: '',
      ticketId: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof pembeliSchema>) => {
    try {
      setLoading(true)

      const payload = {
        nama: values.nama,
        email: values.email,
        noHandphone: values.noHandphone,
        alamat: values.alamat,
        kota: values.kota,
        jumlahTiket: values.jumlahTiket,
        metodePembayaran: values.metodePembayaran,
        userId: values.userId || undefined,
        ticketId: values.ticketId
      }

      const response = await API({
        url: type === 'add' ? pembeliServices.create : pembeliServices.update + '/' + editData?.id,
        method: type === 'add' ? 'POST' : 'PATCH',
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data }: { data: PembeliResponse } = response.data

      if (type === 'add') {
        addPembeli(data)
      } else {
        updatePembeli(data.id, data)
      }

      toast.success(`Pembeli ${type === 'add' ? 'ditambahkan' : 'diperbarui'} berhasil`)
      form.reset()
      onOpenChange(false)
    } catch (err) {
      console.error('Submit error:', err)
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as { data?: string; message?: string })?.data ||
          (err.response?.data as { data?: string; message?: string })?.message ||
          err.message ||
          '500: Internal Server Error'
        toast.error(errorMessage)
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (type === 'edit' && editData) {
      const fields: { name: keyof z.infer<typeof pembeliSchema>; type: 'string' | 'number' }[] = [
        { name: 'nama', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'noHandphone', type: 'string' },
        { name: 'alamat', type: 'string' },
        { name: 'kota', type: 'string' },
        { name: 'jumlahTiket', type: 'number' },
        { name: 'metodePembayaran', type: 'string' },
        { name: 'userId', type: 'string' },
        { name: 'ticketId', type: 'string' }
      ]

      const defaultValue: Record<string, any> = {
        string: '',
        number: 0
      }

      fields.forEach(({ name, type }) => {
        const value = (editData as Record<string, any>)[name as string] ?? defaultValue[type]
        form.setValue(name as any, value)
      })
    }
  }, [type, editData, form])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[95vw] sm:max-w-xl lg:max-w-2xl w-full mx-auto max-h-[90vh] p-4 sm:p-6 rounded-xl">
        <button
          className="absolute top-3 right-3 sm:top-6 sm:right-6 p-1"
          onClick={() => {
            onOpenChange(false)
            form.reset()
          }}>
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <AlertDialogHeader className="pr-8">
          <AlertDialogTitle className="text-lg sm:text-xl">
            {type === 'add' ? 'Tambah Pembeli Baru' : 'Edit Data Pembeli'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm">
            {type === 'add' ? 'Tambahkan data pembeli tiket yang baru.' : 'Edit informasi pembeli tiket yang sudah ada.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className="max-h-[50vh] pr-2 sm:pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-1 sm:px-4">
              {/* Nama */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Nama<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Masukkan nama pembeli"
                        className="text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={loading} placeholder="nama@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* No Handphone */}
              <FormField
                control={form.control}
                name="noHandphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      No Handphone<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="08123456789" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kota */}
              <FormField
                control={form.control}
                name="kota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kota<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="Jakarta" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Jumlah Tiket */}
              <FormField
                control={form.control}
                name="jumlahTiket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jumlah Tiket<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={loading}
                        placeholder="0"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Metode Pembayaran */}
              <FormField
                control={form.control}
                name="metodePembayaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Metode Pembayaran<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Pilih metode pembayaran</option>
                        <option value="transfer">Transfer</option>
                        <option value="cash">Cash</option>
                        <option value="kartu kredit">Kartu Kredit</option>
                        <option value="e-wallet">E-Wallet</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ticket ID */}
              <FormField
                control={form.control}
                name="ticketId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ticket ID<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="ID tiket" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User ID (Optional) */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="ID user (opsional)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Alamat */}
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Alamat<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={loading} placeholder="Masukkan alamat lengkap" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <AlertDialogFooter className="pt-3 sm:pt-4 flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              form.reset()
            }}
            className="w-full sm:w-auto text-sm sm:text-base"
            type="button">
            Batal
          </Button>
          <Button
            className="w-full sm:w-auto text-sm sm:text-base"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
            type="submit">
            {loading && <LoaderCircle className="w-3 h-3 sm:w-4 sm:h-4 animate-spin mr-2" />}
            {type === 'add' ? 'Tambah Pembeli' : 'Perbarui Pembeli'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddPembeli
