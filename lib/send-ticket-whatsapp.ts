import { pdf } from '@react-pdf/renderer'
import { createElement, ReactElement } from 'react'
import type { DocumentProps } from '@react-pdf/renderer'
import { PembeliResponse } from '@/lib/types'

// ─── Config ──────────────────────────────────────────────────────────────────
const EVOLUTION_API_URL = `${process.env.NEXT_PUBLIC_EVOLUTION_API_URL}/message/sendMedia/zheka_2`
const EVOLUTION_API_KEY = process.env.NEXT_PUBLIC_EVOLUTION_API_KEY!

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Format a phone number to the international format without '+' sign.
 * Converts 08xx... → 628xx...
 */
function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1)
  }
  if (!cleaned.startsWith('62')) {
    return '62' + cleaned
  }
  return cleaned
}

/**
 * Convert a Blob to a base64 string (without the data URI prefix).
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip "data:application/pdf;base64," prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Build the WhatsApp caption message.
 */
function buildCaption(pembelian: PembeliResponse): string {
  const totalAmount = pembelian.ticket.harga * pembelian.jumlahTiket
  const eventDate = new Date(pembelian.ticket.tanggal).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    `🎉 *Halo, ${pembelian.nama}!*\n\n` +
    `Terima kasih telah membeli tiket melalui *SeniLokal*. ` +
    `Pembelian Anda telah berhasil dikonfirmasi! 🎊\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `🎭 *${pembelian.ticket.judul}*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📋 *Detail Pembelian:*\n` +
    `• 🆔 Booking ID: \`${pembelian.id}\`\n` +
    `• 📅 Tanggal: ${eventDate}\n` +
    `• 🕐 Waktu: ${pembelian.ticket.waktu}\n` +
    `• 📍 Venue: ${pembelian.ticket.venue}\n` +
    `• 🎟️ Jumlah Tiket: ${pembelian.jumlahTiket}x\n` +
    `• 💳 Metode Bayar: ${pembelian.metodePembayaran}\n` +
    `• 💰 Total: *Rp ${totalAmount.toLocaleString('id-ID')}*\n\n` +
    `📄 E-Ticket Anda telah terlampir dalam file PDF di pesan ini. ` +
    `Harap simpan baik-baik dan tunjukkan saat check-in di venue.\n\n` +
    `⚠️ *Catatan Penting:*\n` +
    `• E-ticket hanya berlaku untuk satu kali masuk\n` +
    `• Tidak dapat dikembalikan atau ditukar\n` +
    `• Pastikan hadir 30 menit sebelum acara dimulai\n\n` +
    `Sampai jumpa di acara! Selamat menikmati pertunjukan 🎶✨\n\n` +
    `_Salam,_\n` +
    `*Tim SeniLokal*\n` +
    `📧 support@senilokal.id`
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * Generates the PDF ticket and sends it to the buyer's WhatsApp number
 * via the Evolution API.
 *
 * @param pembelian  - The full purchase response object
 * @param TicketPDF  - The React PDF component (passed in to avoid circular imports)
 */
export async function sendTicketWhatsApp(
  pembelian: PembeliResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TicketPDFComponent: React.ComponentType<{ pembelian: PembeliResponse }>
): Promise<void> {
  // 1. Generate PDF blob
  const element = createElement(TicketPDFComponent, { pembelian }) as ReactElement<DocumentProps>
  const blob = await pdf(element).toBlob()

  // 2. Convert to base64
  const base64 = await blobToBase64(blob)

  // 3. Format phone number
  const whatsappNumber = formatPhoneNumber(pembelian.noHandphone)

  // 4. Build the caption
  const caption = buildCaption(pembelian)

  // 5. Send via Evolution API
  const response = await fetch(EVOLUTION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: EVOLUTION_API_KEY
    },
    body: JSON.stringify({
      number: whatsappNumber,
      mediatype: 'document',
      mimetype: 'application/pdf',
      caption: caption,
      media: base64,
      fileName: `e-ticket-senilokal-${pembelian.id}.pdf`,
      delay: 1000
    })
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Evolution API error (${response.status}): ${errText}`)
  }
}
