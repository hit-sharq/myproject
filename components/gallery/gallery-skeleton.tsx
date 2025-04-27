import styles from "./gallery-skeleton.module.css"

export default function GallerySkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonDetails}>
                <div className={styles.skeletonMedium}></div>
                <div className={styles.skeletonPrice}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
