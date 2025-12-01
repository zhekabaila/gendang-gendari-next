'use client'

import { Download, LoaderCircle } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { API } from '@/services'
import { toast } from 'sonner'
import { PembeliResponse } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

interface TicketDetailPageProps {
  ticketId: string
  token?: string | null
}

// Styles untuk PDF - OPTIMIZED untuk 1 halaman
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0
  },
  container: {
    border: '1px solid #e5e7eb',
    borderRadius: '0px',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: '#ec4899',
    padding: 12,
    position: 'relative'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#a855f7'
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  logoSubtext: {
    fontSize: 8,
    color: '#ffffff'
  },
  bookingIdContainer: {
    alignItems: 'flex-end'
  },
  bookingIdLabel: {
    fontSize: 8,
    color: '#ffffff',
    marginBottom: 2
  },
  bookingIdBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '4px 6px',
    borderRadius: 3
  },
  bookingIdText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  content: {
    padding: 12
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  eventTitleBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10
  },
  eventTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap'
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 8
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  infoCard: {
    width: '48.5%',
    borderRadius: 6,
    padding: 8,
    position: 'relative'
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  infoIconText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  infoLabel: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 2
  },
  infoValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.3
  },
  buyerBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 10
  },
  buyerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6
  },
  buyerRowLast: {
    marginBottom: 0
  },
  buyerIcon: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyerIconText: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  buyerLabel: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 1
  },
  buyerValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827'
  },
  paymentBox: {
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    padding: 10
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  paymentLabel: {
    fontSize: 8,
    color: '#6b7280'
  },
  paymentValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827'
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  paymentMethodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 8,
    fontWeight: 'bold'
  },
  divider: {
    borderTop: '1px solid #e5e7eb',
    marginVertical: 6
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827'
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ec4899'
  },
  footer: {
    backgroundColor: '#f9fafb',
    padding: 10
  },
  footerDate: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 6
  },
  noticeBox: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6
  },
  noticeTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4
  },
  noticeItem: {
    fontSize: 7,
    color: '#6b7280',
    marginBottom: 2,
    paddingLeft: 6
  },
  contact: {
    fontSize: 8,
    color: '#3b82f6',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export function TicketDetailPage({ ticketId, token }: TicketDetailPageProps) {
  const [pembelian, setPembelian] = useState<PembeliResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const fetchDetailPembelian = useCallback(
    async (id: string): Promise<PembeliResponse | undefined> => {
      setLoading(true)
      try {
        // Prepare headers - include token only if available
        const headers: Record<string, string> = {}
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        const response = await API({
          method: 'GET',
          url: '/pembeli/' + id,
          headers: Object.keys(headers).length > 0 ? headers : undefined
        })

        const { data }: { data: PembeliResponse } = response.data
        setPembelian(data)
        return data
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(
            (err.response?.data as { data?: string; message?: string })?.data ||
              (err.response?.data as { data?: string; message?: string })?.message ||
              'Gagal memuat detail pembelian'
          )
        } else {
          toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
        }
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  useEffect(() => {
    fetchDetailPembelian(ticketId)
  }, [fetchDetailPembelian, ticketId])

  const handleDownloadPDF = async () => {
    if (!pembelian) return
    setSubmitting(true)
    try {
      const blob = await pdf(<TicketPDF pembelian={pembelian} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ticket-${pembelian.id}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      toast.success('PDF berhasil diunduh')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal membuat PDF')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail tiket...</p>
        </div>
      </div>
    )
  }

  if (!pembelian) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-3xl mb-4">Pembelian Tidak Ditemukan</h2>
          <Button onClick={() => router.push('/')} className="bg-gradient-to-r from-pink-500 to-purple-600">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    )
  }

  const categoryColors = ['#ec4899', '#a855f7', '#3b82f6']
  const totalAmount = pembelian.ticket.harga * pembelian.jumlahTiket

  const getPaymentColor = (method: string) => {
    const colors: Record<string, string> = {
      transfer: '#3b82f6',
      cash: '#22c55e',
      'kartu kredit': '#a855f7',
      'e-wallet': '#f97316'
    }
    return colors[method] || '#6b7280'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 mt-16 md:mt-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Download Button */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={handleDownloadPDF}
            disabled={submitting}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            {submitting ? <LoaderCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          </Button>
        </div>

        {/* Preview Card (HTML version for display) */}
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 md:px-8 py-4 md:py-6 relative overflow-hidden">
            <div className="absolute w-48 h-48 rounded-full bg-white/10 top-0 right-0 -mr-24 -mt-24" />
            <div className="absolute w-32 h-32 rounded-full bg-white/5 bottom-0 left-0 -ml-16 -mb-16" />

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-white">SeniLokal</div>
                  <div className="text-xs text-white/90">E-Ticket</div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-white/80 mb-1">Booking ID</div>
                <div className="flex justify-start sm:justify-center items-center bg-white/20 px-2.5 py-1 rounded h-7">
                  <p className="text-xs font-bold text-white font-mono">{pembelian.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="p-4 md:p-6">
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-5">
              <h1 className="text-base md:text-lg font-bold text-gray-900 mb-2">{pembelian.ticket.judul}</h1>
              <div className="flex gap-1.5 flex-wrap">
                {pembelian.ticket.kategori.map((category, index) => {
                  const bgColor = categoryColors[index % categoryColors.length]
                  return (
                    <span
                      key={index}
                      className="inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${bgColor}20`,
                        color: bgColor
                      }}>
                      {category}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="mb-4 md:mb-5">
              <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-2.5">Detail Pertunjukan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5">
                <InfoCard
                  icon="📅"
                  label="Tanggal"
                  value={new Date(pembelian.ticket.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  bgColor="#ec4899"
                />
                <InfoCard icon="🕐" label="Waktu" value={pembelian.ticket.waktu} bgColor="#a855f7" />
                <InfoCard icon="📍" label="Venue" value={pembelian.ticket.venue} bgColor="#3b82f6" />
                <InfoCard icon="🏢" label="Penyelenggara" value={pembelian.ticket.penyelenggara} bgColor="#8b5cf6" />
              </div>
            </div>

            <div className="mb-4 md:mb-5">
              <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-2.5">Informasi Pembeli</h2>
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <BuyerInfo icon="👤" label="Nama Lengkap" value={pembelian.nama} />
                <BuyerInfo icon="📧" label="Email" value={pembelian.email} />
                <BuyerInfo icon="📱" label="No. Handphone" value={pembelian.noHandphone} />
              </div>
            </div>

            <div className="mb-4 md:mb-5">
              <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-2.5">Rincian Pembelian</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4">
                <PaymentRow label="Jumlah Tiket" value={`${pembelian.jumlahTiket}x`} />
                <PaymentRow label="Harga per Tiket" value={`Rp ${pembelian.ticket.harga.toLocaleString('id-ID')}`} />
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-500">Metode Pembayaran</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
                    style={{
                      backgroundColor: `${getPaymentColor(pembelian.metodePembayaran)}20`,
                      color: getPaymentColor(pembelian.metodePembayaran)
                    }}>
                    {pembelian.metodePembayaran}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">Total Pembayaran</span>
                  <span className="text-base font-bold text-pink-600">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 md:px-8 py-4 md:py-5">
            <div className="text-center text-xs text-gray-500 mb-3">
              Dipesan pada:{' '}
              {new Date(pembelian.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs font-semibold text-gray-900 mb-2">Penting:</div>
              <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                <li>Simpan e-ticket ini dan tunjukkan saat check-in</li>
                <li>E-ticket ini hanya berlaku untuk satu kali masuk</li>
                <li>Tidak dapat dikembalikan atau ditukar</li>
              </ul>
            </div>
            <div className="text-center text-xs text-blue-500 font-medium">Hubungi kami: support@senilokal.id</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// PDF Component - OPTIMIZED untuk 1 halaman
const TicketPDF = ({ pembelian }: { pembelian: PembeliResponse }) => {
  const categoryColors = ['#ec4899', '#a855f7', '#3b82f6']
  const totalAmount = pembelian.ticket.harga * pembelian.jumlahTiket

  const getPaymentColor = (method: string) => {
    const colors: Record<string, string> = {
      transfer: '#3b82f6',
      cash: '#22c55e',
      'kartu kredit': '#a855f7',
      'e-wallet': '#f97316'
    }
    return colors[method] || '#6b7280'
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.logo}>
                <View style={styles.logoCircle}>
                  <View style={styles.logoInner} />
                </View>
                <View>
                  <Text style={styles.logoText}>SeniLokal</Text>
                  <Text style={styles.logoSubtext}>E-Ticket</Text>
                </View>
              </View>
              <View style={styles.bookingIdContainer}>
                <Text style={styles.bookingIdLabel}>Booking ID</Text>
                <View style={styles.bookingIdBox}>
                  <Text style={styles.bookingIdText}>{pembelian.id}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Event Title */}
            <View style={styles.section}>
              <View style={styles.eventTitleBox}>
                <Text style={styles.eventTitle}>{pembelian.ticket.judul}</Text>
                <View style={styles.categoriesRow}>
                  {pembelian.ticket.kategori.map((category, index) => {
                    const bgColor = categoryColors[index % categoryColors.length]
                    return (
                      <View key={index} style={[styles.categoryBadge, { backgroundColor: `${bgColor}20` }]}>
                        <Text style={{ color: bgColor, fontSize: 8 }}>{category}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>

            {/* Detail Pertunjukan */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detail Pertunjukan</Text>
              <View style={styles.detailGrid}>
                <View style={[styles.infoCard, { backgroundColor: '#fce7f3' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#ec4899' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>T</Text>
                  </View>
                  <Text style={styles.infoLabel}>Tanggal</Text>
                  <Text style={styles.infoValue}>
                    {new Date(pembelian.ticket.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#f3e8ff' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#a855f7' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>W</Text>
                  </View>
                  <Text style={styles.infoLabel}>Waktu</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.waktu}</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#dbeafe' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#3b82f6' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>V</Text>
                  </View>
                  <Text style={styles.infoLabel}>Venue</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.venue}</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: '#e0e7ff' }]}>
                  <View style={[styles.infoIcon, { backgroundColor: '#8b5cf6' }]}>
                    <Text style={[styles.infoIconText, { color: '#ffffff' }]}>P</Text>
                  </View>
                  <Text style={styles.infoLabel}>Penyelenggara</Text>
                  <Text style={styles.infoValue}>{pembelian.ticket.penyelenggara}</Text>
                </View>
              </View>
            </View>

            {/* Informasi Pembeli */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informasi Pembeli</Text>
              <View style={styles.buyerBox}>
                <View style={styles.buyerRow}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>N</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>Nama Lengkap</Text>
                    <Text style={styles.buyerValue}>{pembelian.nama}</Text>
                  </View>
                </View>
                <View style={styles.buyerRow}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>E</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>Email</Text>
                    <Text style={styles.buyerValue}>{pembelian.email}</Text>
                  </View>
                </View>
                <View style={[styles.buyerRow, styles.buyerRowLast]}>
                  <View style={styles.buyerIcon}>
                    <Text style={[styles.buyerIconText, { color: '#3b82f6' }]}>P</Text>
                  </View>
                  <View>
                    <Text style={styles.buyerLabel}>No. Handphone</Text>
                    <Text style={styles.buyerValue}>{pembelian.noHandphone}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Rincian Pembelian */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rincian Pembelian</Text>
              <View style={styles.paymentBox}>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Jumlah Tiket</Text>
                  <Text style={styles.paymentValue}>{pembelian.jumlahTiket}x</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Harga per Tiket</Text>
                  <Text style={styles.paymentValue}>Rp {pembelian.ticket.harga.toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.paymentMethodRow}>
                  <Text style={styles.paymentLabel}>Metode Pembayaran</Text>
                  <View
                    style={[
                      styles.paymentMethodBadge,
                      { backgroundColor: `${getPaymentColor(pembelian.metodePembayaran)}20` }
                    ]}>
                    <Text
                      style={{
                        color: getPaymentColor(pembelian.metodePembayaran),
                        textTransform: 'capitalize',
                        fontSize: 8
                      }}>
                      {pembelian.metodePembayaran}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Pembayaran</Text>
                  <Text style={styles.totalValue}>Rp {totalAmount.toLocaleString('id-ID')}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerDate}>
              Dipesan pada:{' '}
              {new Date(pembelian.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>Penting:</Text>
              <Text style={styles.noticeItem}>• Simpan e-ticket ini dan tunjukkan saat check-in</Text>
              <Text style={styles.noticeItem}>• E-ticket ini hanya berlaku untuk satu kali masuk</Text>
              <Text style={styles.noticeItem}>• Tidak dapat dikembalikan atau ditukar</Text>
            </View>
            <Text style={styles.contact}>Hubungi kami: support@senilokal.id</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

// HTML Preview Components
const InfoCard = ({ icon, label, value, bgColor }: { icon: string; label: string; value: string; bgColor: string }) => (
  <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-3 relative overflow-hidden">
    <div className="relative z-10">
      <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1.5" style={{ backgroundColor: bgColor }}>
        <span className="text-sm">{icon}</span>
      </div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xs font-bold text-gray-900">{value}</div>
    </div>
  </div>
)

const BuyerInfo = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="flex items-start gap-2.5 mb-2.5">
    <div className="w-7 h-7 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
      <span className="text-sm">{icon}</span>
    </div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-xs font-semibold text-gray-900">{value}</div>
    </div>
  </div>
)

const PaymentRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-semibold text-gray-900">{value}</span>
  </div>
)
