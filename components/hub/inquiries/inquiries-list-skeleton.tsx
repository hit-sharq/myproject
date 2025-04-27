import styles from "./inquiries-list-skeleton.module.css"

export default function InquiriesListSkeleton() {
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
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.skeletonText}></div>
                </td>
                <td>
                  <div className={styles.skeletonText}></div>
                </td>
                <td>
                  <div className={styles.skeletonText}></div>
                </td>
                <td>
                  <div className={styles.skeletonText}></div>
                </td>
                <td>
                  <div className={styles.skeletonBadge}></div>
                </td>
                <td className={styles.actions}>
                  <div className={styles.skeletonAction}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
