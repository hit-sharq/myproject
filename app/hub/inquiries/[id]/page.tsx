import { notFound } from "next/navigation"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getInquiryById } from "@/lib/api/inquiries"
import InquiryResponseForm from "@/components/hub/inquiries/inquiry-response-form"
import styles from "./page.module.css"

interface InquiryPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: InquiryPageProps) {
  const inquiry = await getInquiryById(params.id)

  if (!inquiry) {
    return {
      title: "Inquiry Not Found | ArtAfrik Hub",
      description: "The requested inquiry could not be found.",
    }
  }

  return {
    title: `Inquiry from ${inquiry.name} | ArtAfrik Hub`,
    description: `View and respond to inquiry from ${inquiry.name}`,
  }
}

export default async function InquiryPage({ params }: InquiryPageProps) {
  const inquiry = await getInquiryById(params.id)

  if (!inquiry) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link href="/hub/inquiries">Inquiries</Link> / Inquiry from {inquiry.name}
        </div>
        <div className={styles.status}>
          <span
            className={`${styles.statusBadge} ${
              inquiry.status === "PENDING"
                ? styles.statusPending
                : inquiry.status === "RESPONDED"
                  ? styles.statusResponded
                  : styles.statusClosed
            }`}
          >
            {inquiry.status}
          </span>
        </div>
      </div>

      <div className={styles.inquiryCard}>
        <div className={styles.inquiryHeader}>
          <div className={styles.inquiryInfo}>
            <h1 className={styles.inquiryTitle}>
              {inquiry.artwork ? `Inquiry about "${inquiry.artwork.title}"` : "General Inquiry"}
            </h1>
            <p className={styles.inquiryMeta}>
              From <strong>{inquiry.name}</strong> ({inquiry.email}) •{" "}
              <span title={new Date(inquiry.createdAt).toLocaleString()}>
                {formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}
              </span>
            </p>
          </div>
          {inquiry.artwork && (
            <div className={styles.artworkLink}>
              <Link href={`/gallery/${inquiry.artwork.id}`} target="_blank" className="btn btn-outline">
                View Artwork
              </Link>
            </div>
          )}
        </div>

        <div className={styles.inquiryBody}>
          <p className={styles.inquiryMessage}>{inquiry.message}</p>
        </div>
      </div>

      <InquiryResponseForm inquiry={inquiry} />
    </div>
  )
}
