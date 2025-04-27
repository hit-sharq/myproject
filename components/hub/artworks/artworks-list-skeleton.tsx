import styles from "./artworks-list-skeleton.module.css"

export default function ArtworksListSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className={styles.imageCell}>
                  <div className={styles.skeletonImage}></div>
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
                <td>
                  <div className={styles.skeletonBadge}></div>
                </td>
                <td className={styles.actions}>
                  <div className={styles.skeletonAction}></div>
                  <div className={styles.skeletonAction}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
