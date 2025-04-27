import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getRecentInquiries } from "@/lib/api/inquiries"
import styles from "./recent-inquiries.module.css"

export default async function RecentInquiries() {
  const inquiries = await getRecentInquiries()

  if (inquiries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No inquiries received yet.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {inquiries.map((inquiry) => (
          <Link href={`/hub/inquiries/${inquiry.id}`} key={inquiry.id} className={styles.item}>
            <div className={styles.header}>
              <h3 className={styles.name}>{inquiry.name}</h3>
              <span className={`${styles.status} ${styles[inquiry.status.toLowerCase()]}`}>{inquiry.status}</span>
            </div>
            <p className={styles.message}>{inquiry.message.substring(0, 100)}...</p>
            <div className={styles.footer}>
              <span className={styles.artwork}>
                {inquiry.artwork ? `Re: ${inquiry.artwork.title}` : "General Inquiry"}
              </span>
              <span className={styles.time}>
                {formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.viewAll}>
        <Link href="/hub/inquiries" className={styles.viewAllLink}>
          View All Inquiries
        </Link>
      </div>
    </div>
  )
}
