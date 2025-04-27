import { Suspense } from "react"
import DashboardStats from "@/components/hub/dashboard-stats"
import DashboardSkeleton from "@/components/hub/dashboard-skeleton"
import RecentArtworks from "@/components/hub/recent-artworks"
import RecentInquiries from "@/components/hub/recent-inquiries"
import styles from "./page.module.css"

export default function HubDashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recent Artworks</h2>
          <Suspense fallback={<p>Loading recent artworks...</p>}>
            <RecentArtworks />
          </Suspense>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recent Inquiries</h2>
          <Suspense fallback={<p>Loading recent inquiries...</p>}>
            <RecentInquiries />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
