import jsPDF from 'jspdf'

/**
 * Generate a PDF report from report data
 * This is a server-side version adapted from the client-side PDF export button
 */
export async function generateReportPDF(
  reportData: any,
  forces: any,
  revelations: any[],
  userName: string
): Promise<Buffer> {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Set colors
    const colors = {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      accent: '#F472B6',
      text: '#D1D5DB',
      textSecondary: '#9CA3AF',
      background: '#0D1117',
    }

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [96, 165, 250]
    }

    // Set text color
    const setTextColor = (hex: string) => {
      const rgb = hexToRgb(hex)
      pdf.setTextColor(rgb[0], rgb[1], rgb[2])
    }

    // Helper to add text with word wrap
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, color: string = colors.text) => {
      setTextColor(color)
      pdf.setFontSize(fontSize)
      const lines = pdf.splitTextToSize(text, maxWidth)
      pdf.text(lines, x, y)
      return y + lines.length * (fontSize * 0.4) + 2
    }

    let yPosition = 20
    const pageWidth = 210 // A4 width in mm
    const margin = 15
    const contentWidth = pageWidth - 2 * margin

    // Title
    setTextColor(colors.primary)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('LifeClock Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    setTextColor(colors.textSecondary)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(userName, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Life Index Box
    pdf.setFillColor(15, 23, 42) // #0F172A (dark background)
    pdf.roundedRect(margin, yPosition, contentWidth, 50, 3, 3, 'F')
    
    yPosition += 15
    setTextColor(colors.primary)
    pdf.setFontSize(32)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${reportData.lifeIndex.lifeIndex}/100`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 8

    setTextColor(colors.text)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.text(reportData.lifeIndex.stage, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 6

    setTextColor(colors.textSecondary)
    pdf.setFontSize(10)
    pdf.text("It's not your age. It's your inner maturity.", pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 8

    pdf.setDrawColor(255, 255, 255, 0.1)
    pdf.line(margin + 5, yPosition, pageWidth - margin - 5, yPosition)
    yPosition += 8

    setTextColor(colors.text)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text(reportData.profile.dominantEnergy, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 60

    // Check if we need a new page
    if (yPosition > 250) {
      pdf.addPage()
      yPosition = 20
    }

    // Hidden Forces
    setTextColor(colors.text)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('The 3 Hidden Forces', margin, yPosition)
    yPosition += 10

    if (forces?.shadow) {
      pdf.setFillColor(15, 23, 42)
      pdf.roundedRect(margin, yPosition, contentWidth, 30, 2, 2, 'F')
      yPosition += 8
      
      setTextColor(colors.secondary)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Your Shadow', margin + 5, yPosition)
      yPosition += 7

      setTextColor(colors.text)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const shadowPhase = forces.shadow.phase?.title || 'Shadow Phase'
      yPosition = addWrappedText(shadowPhase, margin + 5, yPosition, contentWidth - 10, 10, colors.text)
      yPosition += 3

      const shadowInsight = forces.shadow.insight || ''
      if (shadowInsight) {
        setTextColor(colors.textSecondary)
        pdf.setFontSize(9)
        yPosition = addWrappedText(shadowInsight, margin + 5, yPosition, contentWidth - 10, 9, colors.textSecondary)
      }
      yPosition += 15
    }

    if (forces?.fear) {
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFillColor(15, 23, 42)
      pdf.roundedRect(margin, yPosition, contentWidth, 30, 2, 2, 'F')
      yPosition += 8

      setTextColor(colors.accent)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Your Fear', margin + 5, yPosition)
      yPosition += 7

      setTextColor(colors.text)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const fearPhase = forces.fear.phase?.title || 'Fear Phase'
      yPosition = addWrappedText(fearPhase, margin + 5, yPosition, contentWidth - 10, 10, colors.text)
      yPosition += 3

      const fearInsight = forces.fear.insight || ''
      if (fearInsight) {
        setTextColor(colors.textSecondary)
        pdf.setFontSize(9)
        yPosition = addWrappedText(fearInsight, margin + 5, yPosition, contentWidth - 10, 9, colors.textSecondary)
      }
      yPosition += 15
    }

    if (forces?.power) {
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFillColor(15, 23, 42)
      pdf.roundedRect(margin, yPosition, contentWidth, 30, 2, 2, 'F')
      yPosition += 8

      setTextColor('#FBBF24')
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Your Power', margin + 5, yPosition)
      yPosition += 7

      setTextColor(colors.text)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const powerPhase = forces.power.phase?.title || 'Power Phase'
      yPosition = addWrappedText(powerPhase, margin + 5, yPosition, contentWidth - 10, 10, colors.text)
      yPosition += 3

      const powerInsight = forces.power.insight || ''
      if (powerInsight) {
        setTextColor(colors.textSecondary)
        pdf.setFontSize(9)
        yPosition = addWrappedText(powerInsight, margin + 5, yPosition, contentWidth - 10, 9, colors.textSecondary)
      }
      yPosition += 15
    }

    // Revelations (first 10 only to keep PDF size manageable)
    if (revelations && revelations.length > 0) {
      if (yPosition > 230) {
        pdf.addPage()
        yPosition = 20
      }

      setTextColor(colors.text)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Your Revelations', margin, yPosition)
      yPosition += 10

      const maxRevelations = Math.min(10, revelations.length)
      for (let i = 0; i < maxRevelations; i++) {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 20
        }

        const revelation = revelations[i]
        pdf.setFillColor(15, 23, 42)
        pdf.roundedRect(margin, yPosition, contentWidth, 20, 2, 2, 'F')
        yPosition += 6

        setTextColor(colors.primary)
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.text((revelation.category || 'INSIGHT').toUpperCase(), margin + 5, yPosition)
        yPosition += 6

        setTextColor(colors.text)
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        const revText = revelation.text || ''
        yPosition = addWrappedText(revText, margin + 5, yPosition, contentWidth - 10, 9, colors.text)
        yPosition += 5
      }

      if (revelations.length > 10) {
        setTextColor(colors.textSecondary)
        pdf.setFontSize(9)
        pdf.text(`... and ${revelations.length - 10} more revelations in your online report`, margin, yPosition)
        yPosition += 10
      }
    }

    // Footer
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(10)
      setTextColor(colors.textSecondary)
      pdf.text(
        `"Time is no longer counted. It belongs to you."`,
        pageWidth / 2,
        287,
        { align: 'center' }
      )
      pdf.text(
        `LifeClock - Page ${i} of ${totalPages} - Generated ${new Date().toLocaleDateString('en-US')}`,
        pageWidth / 2,
        292,
        { align: 'center' }
      )
    }

    // Convert to Buffer
    const pdfOutput = pdf.output('arraybuffer')
    return Buffer.from(pdfOutput)
  } catch (error) {
    console.error('[PDF Generator] Error generating PDF:', error)
    throw error
  }
}

