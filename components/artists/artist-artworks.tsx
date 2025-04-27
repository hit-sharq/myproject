import Link from "next/link"
import Image from "next/image"
import { getArtworks } from "@/lib/api/artworks"
import styles from "./artist-artworks.module.css"

interface ArtistArtworksProps {
  artistId: string
}

export default async function ArtistArtworks({ artistId }: ArtistArtworksProps) {
  const { artworks } = await getArtworks({
    artistId,
    limit: 6,
  })

  if (artworks.length === 0) {
    return <p className={styles.noResults}>No artworks available from this artist yet.</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {artworks.map((artwork) => (
          <Link href={`/gallery/${artwork.id}`} key={artwork.id} className={styles.artworkCard}>
            <div className={styles.imageContainer}>
              <Image
                src={artwork.imageUrl || "/placeholder.svg?height=300&width=400"}
                alt={artwork.title}
                width={400}
                height={300}
                className={styles.image}
              />
              {!artwork.available && <div className={styles.soldBadge}>Sold</div>}
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{artwork.title}</h3>
              <div className={styles.details}>
                <p className={styles.medium}>{artwork.medium}</p>
                <p className={styles.price}>${artwork.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.viewAll}>
        <Link href={`/gallery?artist=${artistId}`} className="btn btn-primary">
          View All Artworks by this Artist
        </Link>
      </div>
    </div>
  )
}
