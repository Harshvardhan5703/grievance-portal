"use server"
// @ts-ignore
import nodemailer from "nodemailer"

interface GrievanceData {
  complaint: string
  severity: string
  tags: string[]
}

export async function submitGrievance(data: GrievanceData) {
  // Validate the data
  if (!data.complaint || data.complaint.trim() === "") {
    throw new Error("Complaint is required")
  }

  if (!data.severity) {
    throw new Error("Severity is required")
  }

  // Log the grievance data (for development purposes)
  console.log("Received grievance:", data)

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  //    tls: {
  //   rejectUnauthorized: false, 
  // },
  })

  // Compose the email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "harsak0007@gmail.com", // Change this to your receiving address
    subject: `New Grievance: Severity Level ${data.severity}`,
    html: `
      <h2>New Grievance Submitted</h2>
      <p><strong>Complaint:</strong> ${data.complaint}</p>
      <p><strong>Severity:</strong> ${data.severity}/5</p>
      <p><strong>Tags:</strong> ${data.tags.length > 0 ? data.tags.join(', ') : 'None'}</p>
      <hr/>
      <small>This message was sent automatically from the grievance portal.</small>
    `,
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully to harsak0007@gmail.com ")

    // Simulate some delay (optional)
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Failed to send grievance email")
  }
}
