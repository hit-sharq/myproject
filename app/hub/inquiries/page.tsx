import { Suspense } from "react"
import InquiriesList from "@/components/hub/inquiries/inquiries-list"
import InquiriesListSkeleton from "@/components/hub/inquiries/inquiries-list-skeleton"
import styles from "./page.module.css"

export const metadata = {
  title: "Manage Inquiries | ArtAfrik Hub",
  description: "Manage customer inquiries about your artworks",
}

export default function InquiriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const status =
    typeof searchParams.status === "string" ? (searchParams.status as "PENDING" | "RESPONDED" | "CLOSED") : undefined
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Inquiries</h1>
      </div>

      <div className={styles.filters}>
        <div className={styles.statusFilters}>
          <a href="/hub/inquiries" className={`${styles.statusFilter} ${!status ? styles.active : ""}`}>
            All
          </a>
          <a
            href="/hub/inquiries?status=PENDING"
            className={`${styles.statusFilter} ${status === "PENDING" ? styles.active : ""}`}
          >
            Pending
          </a>
          <a
            href="/hub/inquiries?status=RESPONDED"
            className={`${styles.statusFilter} ${status === "RESPONDED" ? styles.active : ""}`}
          >
            Responded
          </a>
          <a
            href="/hub/inquiries?status=CLOSED"
            className={`${styles.statusFilter} ${status === "CLOSED" ? styles.active : ""}`}
          >
            Closed
          </a>
        </div>
      </div>

      <Suspense fallback={<InquiriesListSkeleton />}>
        <InquiriesList status={status} page={page} />
      </Suspense>
    </div>
  )
}
