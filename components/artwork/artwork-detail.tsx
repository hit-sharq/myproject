import Image from "next/image"
import Link from "next/link"
import type { Artwork } from "@/lib/types"
import styles from "./artwork-detail.module.css"

interface ArtworkDetailProps {
  artwork: Artwork
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const {
    title,
    description,
    artist,
    imageUrl,
    additionalImages,
    price,
    dimensions,
    medium,
    category,
    year,
    available,
  } = artwork

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=800"}
            alt={title}
            width={800}
            height={600}
            className={styles.image}
            priority
          />
        </div>

        {additionalImages && additionalImages.length > 0 && (
          <div className={styles.thumbnails}>
            <Image
              src={imageUrl || "/placeholder.svg?height=150&width=150"}
              alt={title}
              width={150}
              height={150}
              className={`${styles.thumbnail} ${styles.active}`}
            />

            {additionalImages.map((img, index) => (
              <Image
                key={index}
                src={img || "/placeholder.svg?height=150&width=150"}
                alt={`${title} - View ${index + 1}`}
                width={150}
                height={150}
                className={styles.thumbnail}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <Link href={`/artists/${artist.id}`} className={styles.artistLink}>
            {artist.name}
          </Link>

          {!available && <div className={styles.soldBadge}>Sold</div>}
        </div>

        <div className={styles.pricing}>
          {available ? (
            <div className={styles.price}>${price.toLocaleString()}</div>
          ) : (
            <div className={styles.soldPrice}>
              <span className={styles.soldText}>Sold</span>
              <span className={styles.originalPrice}>${price.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className={styles.specs}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Medium:</span>
            <span className={styles.specValue}>{medium}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Dimensions:</span>
            <span className={styles.specValue}>
              {dimensions.height} × {dimensions.width}
              {dimensions.depth ? ` × ${dimensions.depth}` : ""} {dimensions.unit}
            </span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Year:</span>
            <span className={styles.specValue}>{year}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Category:</span>
            <span className={styles.specValue}>
              <Link href={`/gallery?category=${category.id}`} className={styles.categoryLink}>
                {category.name}
              </Link>
            </span>
          </div>
        </div>

        <div className={styles.description}>
          <h2 className={styles.sectionTitle}>About this artwork</h2>
          <p>{description}</p>
        </div>

        <div className={styles.artistInfo}>
          <h2 className={styles.sectionTitle}>About the artist</h2>
          <div className={styles.artistBio}>
            <div className={styles.artistImageContainer}>
              <Image
                src={artist.profileImageUrl || "/placeholder.svg?height=100&width=100"}
                alt={artist.name}
                width={100}
                height={100}
                className={styles.artistImage}
              />
            </div>
            <div>
              <h3 className={styles.artistName}>{artist.name}</h3>
              <p className={styles.artistLocation}>{artist.location}</p>
              <p className={styles.artistBioText}>{artist.shortBio}</p>
              <Link href={`/artists/${artist.id}`} className={styles.viewProfileLink}>
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
