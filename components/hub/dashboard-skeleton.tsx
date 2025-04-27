import styles from "./dashboard-skeleton.module.css"

export default function DashboardSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}></div>
            <div className={styles.statContent}>
              <div className={styles.statTitle}></div>
              <div className={styles.statValue}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
