import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

/**
 * Send an email
 * @param to Recipient email address
 * @param subject Email subject
 * @param html Email content in HTML format
 * @returns Whether the email was sent successfully
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

/**
 * Send an inquiry notification email
 * @param name Customer name
 * @param email Customer email
 * @param message Inquiry message
 * @param artworkTitle Optional artwork title
 * @returns Whether the email was sent successfully
 */
export async function sendInquiryNotification(
  name: string,
  email: string,
  message: string,
  artworkTitle?: string,
): Promise<boolean> {
  const subject = artworkTitle ? `New Inquiry About "${artworkTitle}" from ${name}` : `New General Inquiry from ${name}`

  const html = `
    <h1>${subject}</h1>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
    <p>You can respond to this inquiry from your admin dashboard.</p>
  `

  return sendEmail(process.env.EMAIL_TO || "", subject, html)
}
