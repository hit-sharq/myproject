import Link from "next/link"
import Image from "next/image"
import { getRecentArtworks } from "@/lib/api/dashboard"
import styles from "./recent-artworks.module.css"

export default async function RecentArtworks() {
  const artworks = await getRecentArtworks()

  if (artworks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No artworks added yet.</p>
        <Link href="/hub/artworks/new" className="btn btn-primary">
          Add Your First Artwork
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {artworks.map((artwork) => (
          <Link href={`/hub/artworks/${artwork.id}`} key={artwork.id} className={styles.item}>
            <div className={styles.imageContainer}>
              <Image
                src={artwork.imageUrl || "/placeholder.svg?height=80&width=80"}
                alt={artwork.title}
                width={80}
                height={80}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{artwork.title}</h3>
              <p className={styles.details}>
                {artwork.medium} • ${artwork.price.toLocaleString()}
              </p>
              <div className={styles.status}>
                <span className={`${styles.statusIndicator} ${artwork.available ? styles.available : styles.sold}`}>
                  {artwork.available ? "Available" : "Sold"}
                </span>
                {artwork.featured && <span className={styles.featured}>Featured</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.footer}>
        <Link href="/hub/artworks" className={styles.viewAllLink}>
          View All Artworks
        </Link>
      </div>
    </div>
  )
}
