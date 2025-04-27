import Link from "next/link"
import Image from "next/image"
import { getArtworks } from "@/lib/api/artworks"
import styles from "./related-artworks.module.css"

interface RelatedArtworksProps {
  artistId: string
  currentArtworkId: string
}

export default async function RelatedArtworks({ artistId, currentArtworkId }: RelatedArtworksProps) {
  const { artworks } = await getArtworks({
    artistId,
    limit: 4,
  })

  // Filter out the current artwork
  const relatedArtworks = artworks.filter((artwork) => artwork.id !== currentArtworkId)

  if (relatedArtworks.length === 0) {
    return <p className={styles.noResults}>No other artworks by this artist.</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {relatedArtworks.map((artwork) => (
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
              <p className={styles.price}>${artwork.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
