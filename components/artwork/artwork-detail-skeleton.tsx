import styles from "./artwork-detail-skeleton.module.css"

export default function ArtworkDetailSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}></div>
        <div className={styles.thumbnails}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.thumbnail}></div>
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <div className={styles.title}></div>
          <div className={styles.artist}></div>
        </div>

        <div className={styles.price}></div>

        <div className={styles.specs}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.specItem}>
              <div className={styles.specLabel}></div>
              <div className={styles.specValue}></div>
            </div>
          ))}
        </div>

        <div className={styles.description}>
          <div className={styles.sectionTitle}></div>
          <div className={styles.descriptionText}></div>
          <div className={styles.descriptionText}></div>
        </div>

        <div className={styles.artistInfo}>
          <div className={styles.sectionTitle}></div>
          <div className={styles.artistBio}>
            <div className={styles.artistImage}></div>
            <div className={styles.artistDetails}>
              <div className={styles.artistName}></div>
              <div className={styles.artistLocation}></div>
              <div className={styles.artistBioText}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
