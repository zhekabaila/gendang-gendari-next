import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatIDRCurrency = (amount: number): string => {
  return `Rp${amount.toLocaleString('id-ID')}`
}

export const formatDate = (date: Date): string => {
  return !!date ? format(date, 'dd MMMM yyyy') : '-'
}

export const formatRupiah = (value: string | number, showDecimal: boolean = false) => {
  if (!value) return '0'

  // Cek apakah value negatif
  const isNegative = Number(value) < 0

  // Ubah ke positif untuk proses formatting
  const absValue = Math.abs(Number(value))

  // Pisahkan bagian integer dan desimal
  const [integerPart, decimalPart] = absValue.toString().split('.')

  // Format bagian integer dengan titik sebagai pemisah ribuan
  const numberString = integerPart.replace(/[^,\d]/g, '')
  const sisa = numberString.length % 3
  let rupiah = numberString.substr(0, sisa)
  const ribuan = numberString.substr(sisa).match(/\d{3}/g)

  if (ribuan) {
    const separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  // Tambahkan bagian desimal jika ada dan showDecimal = true
  if (showDecimal && decimalPart) {
    rupiah += ',' + decimalPart
  }

  // Tambahkan tanda minus jika value negatif
  return isNegative ? `-${rupiah}` : rupiah
}

export const getConfirmDeleteLabel = (total: number, data?: string) => {
  return `Yes, delete ${total > 1 ? `(${total})` : `"${data}"`}`
}

export const isValidUrl = (string: string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export const getFareClassText = (type: 'Y' | 'C' | 'F') => {
  const fareClass = {
    Y: 'Economy Class',
    C: 'Business Class',
    F: 'First Class'
  }
  return fareClass[type]
}

export const renderImage = (url: string) => {
  return url && isValidUrl(url) ? url : '/placeholder-image.png'
}

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const getInitials = (name: string) => {
  const result = name
    .split(' ')
    .slice(0, 2)
    .map((e) => e[0])
    .join('')
    .toUpperCase()

  return result
}

export function getGenderFromPrefix(prefix: string) {
  const malePrefixes = ['Mr', 'Mstr']
  const femalePrefixes = ['Mrs', 'Ms', 'Miss']

  if (malePrefixes.includes(prefix)) return 'Male'
  if (femalePrefixes.includes(prefix)) return 'Female'

  // Jika tidak terdefinisi
  return undefined
}

export const fetchLogoBase64 = async (logoUrl: string): Promise<string | null> => {
  const res = await fetch('/api/image-to-base64', {
    method: 'POST',
    body: JSON.stringify({ logo_url: logoUrl }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    if (res.ok) {
      const { base64 } = await res.json()
      return base64 as string
    } else {
      return null
    }
  })
  return res
}
