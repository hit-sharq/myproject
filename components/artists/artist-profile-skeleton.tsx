import styles from "./artist-profile-skeleton.module.css"

export default function ArtistProfileSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageContainer}></div>

        <div className={styles.info}>
          <div className={styles.name}></div>
          <div className={styles.location}></div>
          <div className={styles.socialLinks}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.socialLink}></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.biography}>
        <div className={styles.sectionTitle}></div>
        <div className={styles.bioContent}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.paragraph}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
