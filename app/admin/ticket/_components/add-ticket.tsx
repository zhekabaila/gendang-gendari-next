import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoaderCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { TicketResponse } from '@/lib/types'
import { useTicketStore } from '@/_stores/use-ticket-store'
import { API } from '@/services'
import { ticketServices } from '@/services/ticket'
import { ticketSchema } from '@/schemas/ticket'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IProps {
  type: 'add' | 'edit'
  editData: TicketResponse | null
  open: boolean
  onOpenChange: (open: boolean) => void
  fetchBadwordsFunc: () => void
  token: string
}

const AddTicket = ({ type, editData, open, onOpenChange, fetchBadwordsFunc, token }: IProps) => {
  const [loading, setLoading] = useState(false)

  const { updateTicket } = useTicketStore()

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      deskripsi: '',
      gambar: '',
      harga: 0,
      judul: '',
      kapasitas: 0,
      kategori: [],
      kota: '',
      penyelenggara: '',
      tanggal: new Date(),
      venue: '',
      waktu: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      setLoading(true)

      // Format data untuk API
      const payload = {
        ...values,
        tanggal: values.tanggal instanceof Date ? values.tanggal.toISOString().split('T')[0] : values.tanggal,
        kategori: Array.isArray(values.kategori) ? values.kategori : [values.kategori]
      }

      const response = await API({
        url: type === 'add' ? ticketServices.create : ticketServices.update + '/' + editData?.id,
        method: type === 'add' ? 'POST' : 'PATCH',
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data }: { data: TicketResponse } = response.data

      if (type === 'add') {
        fetchBadwordsFunc()
      } else {
        updateTicket(data.id, data)
      }
      toast.success(`Ticket ${type === 'add' ? 'added' : 'updated'} successfully`)
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
        toast.error(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (type === 'edit' && editData) {
      const fields: { name: keyof z.infer<typeof ticketSchema>; type: 'string' | 'number' | 'date' | 'array' }[] = [
        { name: 'deskripsi', type: 'string' },
        { name: 'gambar', type: 'string' },
        { name: 'harga', type: 'number' },
        { name: 'judul', type: 'string' },
        { name: 'kapasitas', type: 'number' },
        { name: 'kategori', type: 'array' },
        { name: 'kota', type: 'string' },
        { name: 'penyelenggara', type: 'string' },
        { name: 'tanggal', type: 'date' },
        { name: 'venue', type: 'string' },
        { name: 'waktu', type: 'string' }
      ]

      const defaultValue: Record<string, any> = {
        string: '',
        number: 0,
        date: new Date(),
        array: []
      }

      fields.forEach(({ name, type }) => {
        const value = (editData as Record<string, any>)[name as string] ?? defaultValue[type]
        form.setValue(name as any, value)
      })
    }
  }, [type, editData, form])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-4xl w-full mx-auto max-h-[90vh] p-4 sm:p-6 rounded-xl">
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
            {type === 'add' ? 'Add New Ticket' : 'Edit Ticket'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm">
            {type === 'add' ? 'Add a new ticket event with all required details.' : 'Edit the ticket event details.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className="max-h-[50vh] pr-2 sm:pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-1 sm:px-4">
              {/* Judul */}
              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel className="text-sm sm:text-base">
                      Judul<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="Nama Pertunjukan" className="text-sm sm:text-base" />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Penyelenggara */}
              <FormField
                control={form.control}
                name="penyelenggara"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Penyelenggara<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="Nama Penyelenggara" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kategori */}
              <FormField
                control={form.control}
                name="kategori"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Kategori<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Musik, Teater, dll (pisahkan dengan koma)"
                        value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                        onChange={(e) => field.onChange(e.target.value.split(',').map((v) => v.trim()))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal */}
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Tanggal<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...(field as any)}
                        type="date"
                        disabled={loading}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split('T')[0]
                            : typeof field.value === 'string'
                              ? (field.value as string).split('T')[0]
                              : ''
                        }
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Waktu */}
              <FormField
                control={form.control}
                name="waktu"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Waktu<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="time" disabled={loading} placeholder="HH:MM" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Venue */}
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Venue<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="Nama Tempat/Lokasi" />
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
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Kota<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} placeholder="Kota" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Harga */}
              <FormField
                control={form.control}
                name="harga"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Harga (Rp)<sup className="text-destructive">*</sup>
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

              {/* Kapasitas */}
              <FormField
                control={form.control}
                name="kapasitas"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-2">
                    <FormLabel>
                      Kapasitas<sup className="text-destructive">*</sup>
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

              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Deskripsi<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={loading} placeholder="Deskripsi detail tentang pertunjukan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gambar */}
              <FormField
                control={form.control}
                name="gambar"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Gambar<sup className="text-destructive">*</sup>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          disabled={loading}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                const result = event.target?.result as string
                                field.onChange(result)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="cursor-pointer"
                        />
                        {field.value && typeof field.value === 'string' && field.value.startsWith('data:image') && (
                          <div className="relative w-full h-auto rounded-lg overflow-hidden bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
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
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto text-sm sm:text-base"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
            type="submit">
            {loading && <LoaderCircle className="w-3 h-3 sm:w-4 sm:h-4 animate-spin mr-2" />}
            {type === 'add' ? 'Add Ticket' : 'Update Ticket'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddTicket
