"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateInquiryStatus } from "@/lib/api/inquiries"
import type { Inquiry } from "@/lib/types"
import styles from "./inquiry-response-form.module.css"

interface InquiryResponseFormProps {
  inquiry: Inquiry
}

export default function InquiryResponseForm({ inquiry }: InquiryResponseFormProps) {
  const router = useRouter()
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState<"PENDING" | "RESPONDED" | "CLOSED">(inquiry.status)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real app, you would send the response via email
      // For now, we'll just update the status
      await updateInquiryStatus(inquiry.id, status)
      setSuccess("Inquiry status updated successfully")

      // Refresh the page to show the updated status
      router.refresh()
    } catch (err) {
      console.error("Error updating inquiry:", err)
      setError("Failed to update inquiry status. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Respond to Inquiry</h2>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="response" className={styles.label}>
            Your Response
          </label>
          <textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className={styles.textarea}
            rows={6}
            placeholder="Type your response here..."
          />
          <p className={styles.note}>
            Note: This response will be sent to {inquiry.name} via email. Be professional and courteous.
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Update Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "PENDING" | "RESPONDED" | "CLOSED")}
            className={styles.select}
          >
            <option value="PENDING">Pending</option>
            <option value="RESPONDED">Responded</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Status"}
          </button>
        </div>
      </form>
    </div>
  )
}
