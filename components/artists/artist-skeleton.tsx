import styles from "./artist-skeleton.module.css"

export default function ArtistSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonName}></div>
              <div className={styles.skeletonLocation}></div>
              <div className={styles.skeletonBio}></div>
              <div className={styles.skeletonBio}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
