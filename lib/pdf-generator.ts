import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { PembeliResponse } from './types'

export const generateETicketPDF = async (pembeli: PembeliResponse) => {
  // Create a temporary div for PDF content
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'relative'
  tempDiv.style.left = '-9999px'
  tempDiv.style.top = '-9999px'
  tempDiv.style.width = '794px' // A4 width in pixels at 96 DPI
  tempDiv.style.backgroundColor = '#ffffff'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.padding = '5px'
  tempDiv.style.color = '#333333'
  // tempDiv.style.fontSize = '12px'
  // tempDiv.style.lineHeight = '1.3'
  // tempDiv.style.boxSizing = 'border-box'

  // Calculate total amount
  const totalAmount = pembeli.ticket.harga * pembeli.jumlahTiket

  // Payment method color mapping
  const getPaymentColor = (method: string) => {
    const colors: Record<string, string> = {
      transfer: '#3b82f6', // Blue
      cash: '#22c55e', // Green
      'kartu kredit': '#a855f7', // Purple
      'e-wallet': '#f97316' // Orange
    }
    return colors[method] || '#6b7280'
  }

  // Create HTML structure for the E-Ticket
  tempDiv.innerHTML = `
    <div style="width: 100%; font-family: Arial, sans-serif; color: #333333; all: initial; font-family: Arial, sans-serif;">
      
      <!-- HEADER -->
      <div style="background: linear-gradient(135deg, #db2777 0%, #9333ea 100%); padding: 20px 30px; position: relative; overflow: hidden;">
        <!-- Decorative circles -->
        <div style="position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center;">
          <!-- Logo Section -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #db2777 0%, #9333ea 100%);"></div>
            </div>
            <div>
              <div style="font-size: 22px; font-weight: bold; color: white;">SeniLokal</div>
              <div style="font-size: 11px; color: rgba(255,255,255,0.9); margin-top: 2px;">E-Ticket</div>
            </div>
          </div>
          
          <!-- Booking ID -->
          <div style="text-align: right;">
            <div style="font-size: 9px; color: rgba(255,255,255,0.8); margin-bottom: 3px;">Booking ID</div>
            <div style="background: rgba(255,255,255,0.2); padding: 7px 10px; border-radius: 4px; letter-spacing: 1px; text-align: center;">
              <span style="font-size: 11px; font-weight: bold; color: white; font-family: monospace; display: inline-block; vertical-align: middle;">
                ${pembeli.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div style="padding: 25px;">
        
        <!-- EVENT TITLE SECTION -->
        <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <h1 style="font-size: 18px; font-weight: bold; color: #111827; margin: 0 0 10px 0; line-height: 1.3;">
            ${pembeli.ticket.judul}
          </h1>
          
          <!-- Categories -->
          <div style="display: block;">
            ${pembeli.ticket.kategori
              .map((kategori, index) => {
                const colors = ['#ec4899', '#a855f7', '#3b82f6']
                const color = colors[index % colors.length]
                return `
                <span style="background: ${color}20; color: ${color}; display: inline-block; padding: 5px 10px; border-radius: 15px; font-size: 10px; font-weight: 500; margin-right: 6px; margin-bottom: 6px; vertical-align: middle;">
                  ${kategori}
                </span>
              `
              })
              .join('')}
          </div>
        </div>

        <!-- DETAIL PERTUNJUKAN -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: bold; color: #111827; margin: 0 0 10px 0;">Detail Pertunjukan</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <!-- Tanggal -->
            <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 8px; padding: 12px; position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: #ec4899; text-align: center; margin-bottom: 6px; padding-top: 5px; box-sizing: border-box;">
                  <span style="font-size: 16px; line-height: 20px; vertical-align: middle;">📅</span>
                </div>
                <div style="font-size: 9px; color: #9ca3af; margin-bottom: 3px;">Tanggal</div>
                <div style="font-size: 10px; font-weight: bold; color: #111827; line-height: 1.3;">
                  ${new Date(pembeli.ticket.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <!-- Waktu -->
            <div style="background: linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%); border-radius: 8px; padding: 12px; position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: #a855f7; text-align: center; margin-bottom: 6px; padding-top: 5px; box-sizing: border-box;">
                  <span style="font-size: 16px; line-height: 20px; vertical-align: middle;">🕐</span>
                </div>
                <div style="font-size: 9px; color: #9ca3af; margin-bottom: 3px;">Waktu</div>
                <div style="font-size: 10px; font-weight: bold; color: #111827;">
                  ${pembeli.ticket.waktu}
                </div>
              </div>
            </div>

            <!-- Venue -->
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 8px; padding: 12px; position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: #3b82f6; text-align: center; margin-bottom: 6px; padding-top: 5px; box-sizing: border-box;">
                  <span style="font-size: 16px; line-height: 20px; vertical-align: middle;">📍</span>
                </div>
                <div style="font-size: 9px; color: #9ca3af; margin-bottom: 3px;">Venue</div>
                <div style="font-size: 10px; font-weight: bold; color: #111827; line-height: 1.3;">
                  ${pembeli.ticket.venue}
                </div>
              </div>
            </div>

            <!-- Penyelenggara -->
            <div style="background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%); border-radius: 8px; padding: 12px; position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: #8b5cf6; text-align: center; margin-bottom: 6px; padding-top: 5px; box-sizing: border-box;">
                  <span style="font-size: 16px; line-height: 20px; vertical-align: middle;">🏢</span>
                </div>
                <div style="font-size: 9px; color: #9ca3af; margin-bottom: 3px;">Penyelenggara</div>
                <div style="font-size: 10px; font-weight: bold; color: #111827; line-height: 1.3;">
                  ${pembeli.ticket.penyelenggara}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- INFORMASI PEMBELI -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: bold; color: #111827; margin: 0 0 10px 0;">Informasi Pembeli</h2>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 15px;">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <!-- Nama -->
              <div style="display: table; width: 100%;">
                <div style="display: table-cell; width: 28px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #3b82f620; text-align: center; padding-top: 5px; box-sizing: border-box;">
                    <span style="font-size: 14px; line-height: 18px;">👤</span>
                  </div>
                </div>
                <div style="display: table-cell; vertical-align: top; padding-left: 10px;">
                  <div style="font-size: 9px; color: #6b7280; margin-bottom: 2px;">Nama Lengkap</div>
                  <div style="font-size: 11px; font-weight: 600; color: #111827;">${pembeli.nama}</div>
                </div>
              </div>

              <!-- Email -->
              <div style="display: table; width: 100%;">
                <div style="display: table-cell; width: 28px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #3b82f620; text-align: center; padding-top: 5px; box-sizing: border-box;">
                    <span style="font-size: 14px; line-height: 18px;">📧</span>
                  </div>
                </div>
                <div style="display: table-cell; vertical-align: top; padding-left: 10px;">
                  <div style="font-size: 9px; color: #6b7280; margin-bottom: 2px;">Email</div>
                  <div style="font-size: 11px; font-weight: 600; color: #111827;">${pembeli.email}</div>
                </div>
              </div>

              <!-- No Handphone -->
              <div style="display: table; width: 100%;">
                <div style="display: table-cell; width: 28px; vertical-align: top;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #3b82f620; text-align: center; padding-top: 5px; box-sizing: border-box;">
                    <span style="font-size: 14px; line-height: 18px;">📱</span>
                  </div>
                </div>
                <div style="display: table-cell; vertical-align: top; padding-left: 10px;">
                  <div style="font-size: 9px; color: #6b7280; margin-bottom: 2px;">No. Handphone</div>
                  <div style="font-size: 11px; font-weight: 600; color: #111827;">${pembeli.noHandphone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RINCIAN PEMBELIAN -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; font-weight: bold; color: #111827; margin: 0 0 10px 0;">Rincian Pembelian</h2>
          
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
            <!-- Jumlah Tiket -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 11px; color: #6b7280;">Jumlah Tiket</span>
              <span style="font-size: 11px; font-weight: 600; color: #111827;">${pembeli.jumlahTiket}x</span>
            </div>

            <!-- Harga per Tiket -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 11px; color: #6b7280;">Harga per Tiket</span>
              <span style="font-size: 11px; font-weight: 600; color: #111827;">Rp ${pembeli.ticket.harga.toLocaleString('id-ID')}</span>
            </div>

            <!-- Metode Pembayaran -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 11px; color: #6b7280;">Metode Pembayaran</span>
              <span style="background: ${getPaymentColor(pembeli.metodePembayaran)}20; color: ${getPaymentColor(pembeli.metodePembayaran)}; padding: 4px 12px; border-radius: 15px; font-size: 10px; font-weight: 600; text-transform: capitalize;">
                ${pembeli.metodePembayaran}
              </span>
            </div>

            <!-- Divider -->
            <div style="border-top: 1px solid #e5e7eb; margin: 12px 0;"></div>

            <!-- Total -->
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; font-weight: 600; color: #111827;">Total Pembayaran</span>
              <span style="font-size: 16px; font-weight: bold; color: #db2777;">
                Rp ${totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="background: #f9fafb; padding: 20px 30px; margin-top: auto;">
        <!-- Order Date -->
        <div style="text-align: center; font-size: 10px; color: #6b7280; margin-bottom: 12px;">
          Dipesan pada: ${new Date(pembeli.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        <!-- Important Notice -->
        <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 600; color: #111827; margin-bottom: 8px;">Penting:</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 10px; color: #6b7280; line-height: 1.6;">
            <li>Simpan e-ticket ini dan tunjukkan saat check-in</li>
            <li>E-ticket ini hanya berlaku untuk satu kali masuk</li>
            <li>Tidak dapat dikembalikan atau ditukar</li>
          </ul>
        </div>

        <!-- Contact -->
        <div style="text-align: center; font-size: 10px; color: #3b82f6; font-weight: 500;">
          Hubungi kami: support@senilokal.id
        </div>
      </div>

    </div>
  `

  // Create a completely isolated iframe to avoid CSS inheritance issues
  const iframe = document.createElement('iframe')
  iframe.style.position = 'relative'
  iframe.style.left = '-9999px'
  iframe.style.top = '-9999px'
  iframe.style.width = '794px'
  iframe.style.height = '1200px'
  iframe.style.border = 'none'

  document.body.appendChild(iframe)

  // Wait for iframe to load
  await new Promise((resolve) => {
    iframe.onload = resolve
    if (iframe.contentDocument) {
      resolve(undefined)
    }
  })

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (!iframeDoc) {
    throw new Error('Failed to create isolated document')
  }

  // Write clean HTML with no external CSS dependencies
  iframeDoc.open()
  iframeDoc.write(`
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      ${tempDiv.innerHTML}
    </body>
    </html>
  `)
  iframeDoc.close()

  // Wait for images to load
  await new Promise((resolve) => {
    const images = Array.from(iframeDoc.querySelectorAll('img'))
    let loadedCount = 0

    if (images.length === 0) {
      resolve(undefined)
      return
    }

    const checkComplete = () => {
      loadedCount++
      if (loadedCount === images.length) {
        setTimeout(resolve, 500)
      }
    }

    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        checkComplete()
      } else {
        img.onload = checkComplete
        img.onerror = checkComplete
      }
    })
  })

  try {
    // Convert iframe content to canvas with improved options
    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 30000,
      logging: false,
      width: 794,
      height: iframeDoc.body.scrollHeight,
      onclone: (clonedDoc) => {
        const clonedImages = Array.from(clonedDoc.querySelectorAll('img'))
        clonedImages.forEach((img) => {
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            img.style.width = '1px'
            img.style.height = '1px'
            img.style.opacity = '0'
          }
        })
      }
    })

    // Validate canvas dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has invalid dimensions (0x0). This usually indicates issues with rendering.')
    }

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    // Download the PDF
    const fileName = `E-Ticket_${pembeli.ticket.judul.replace(/\s+/g, '_')}_${pembeli.id.substring(0, 8)}.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)

    if (error instanceof Error) {
      if (error.message.includes('Canvas has invalid dimensions')) {
        throw new Error('Gagal membuat PDF: Ada masalah dengan rendering. Silakan coba lagi.')
      }
    }

    throw new Error('Gagal membuat PDF. Silakan coba lagi atau hubungi support.')
  } finally {
    // Clean up both tempDiv and iframe
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv)
    }
    if (iframe && document.body.contains(iframe)) {
      document.body.removeChild(iframe)
    }
  }
}
