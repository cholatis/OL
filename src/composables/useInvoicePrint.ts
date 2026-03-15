/**
 * Composable for handling Invoice printing and PDF export
 */
export function useInvoicePrint() {
  const printInvoice = (invoiceId: string) => {
    console.log('Printing invoice:', invoiceId)
    window.print()
  }

  const exportPdf = async (invoiceId: string) => {
    console.log('Exporting invoice to PDF:', invoiceId)
    // In a real app, we might use jsPDF or a server-side generator
    // For now, we'll trigger the print dialog which allows "Save as PDF"
    window.print()
  }

  const sendEmail = async (invoiceId: string, email: string) => {
    console.log(`Sending invoice ${invoiceId} to ${email}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 1000)
    })
  }

  return {
    printInvoice,
    exportPdf,
    sendEmail,
  }
}
