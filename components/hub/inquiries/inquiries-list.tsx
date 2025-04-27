import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getInquiries } from "@/lib/api/inquiries"
import Pagination from "@/components/ui/pagination"
import styles from "./inquiries-list.module.css"

interface InquiriesListProps {
  status?: "PENDING" | "RESPONDED" | "CLOSED"
  page: number
}

export default async function InquiriesList({ status, page = 1 }: InquiriesListProps) {
  const limit = 10
  const { inquiries, total } = await getInquiries({
    status,
    page,
    limit,
  })

  const totalPages = Math.ceil(total / limit)

  if (inquiries.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No inquiries found</h3>
        <p>There are no inquiries matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Artwork</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.name}</td>
                <td>{inquiry.email}</td>
                <td>
                  {inquiry.artwork ? (
                    <Link href={`/gallery/${inquiry.artwork.id}`} target="_blank" className={styles.artworkLink}>
                      {inquiry.artwork.title}
                    </Link>
                  ) : (
                    <span className={styles.generalInquiry}>General Inquiry</span>
                  )}
                </td>
                <td>
                  <span title={new Date(inquiry.createdAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}
                  </span>
                </td>
                <td>
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
                </td>
                <td className={styles.actions}>
                  <Link href={`/hub/inquiries/${inquiry.id}`} className={styles.actionButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="sr-only">View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
