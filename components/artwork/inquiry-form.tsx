"use client"

import type React from "react"

import { useState } from "react"
import { createInquiry } from "@/lib/api/inquiries"
import styles from "./inquiry-form.module.css"

interface InquiryFormProps {
  artworkId: string
  artworkTitle: string
}

export default function InquiryForm({ artworkId, artworkTitle }: InquiryFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await createInquiry({
        name,
        email,
        message,
        artworkId,
      })

      setIsSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setError("There was an error submitting your inquiry. Please try again.")
      console.error("Error submitting inquiry:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <h3>Thank you for your interest!</h3>
        <p>We've received your inquiry about "{artworkTitle}" and will get back to you soon.</p>
        <button onClick={() => setIsSuccess(false)} className={styles.resetButton}>
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="Enter your email address"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={styles.textarea}
            placeholder="I'm interested in this artwork and would like to know more about..."
            rows={5}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  )
}
