import Link from "next/link"
import Image from "next/image"
import { getArtworks } from "@/lib/api/artworks"
import Pagination from "@/components/ui/pagination"
import styles from "./gallery-grid.module.css"

interface GalleryGridProps {
  categoryId?: string
  artistId?: string
  search?: string
  page: number
}

export default async function GalleryGrid({ categoryId, artistId, search, page = 1 }: GalleryGridProps) {
  const limit = 12
  const { artworks, total } = await getArtworks({
    categoryId,
    artistId,
    search,
    page,
    limit,
  })

  const totalPages = Math.ceil(total / limit)

  if (artworks.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No artworks found</h3>
        <p>Try adjusting your filters or search criteria.</p>
      </div>
    )
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
              <p className={styles.artist}>{artwork.artist.name}</p>
              <div className={styles.details}>
                <p className={styles.medium}>{artwork.medium}</p>
                <p className={styles.price}>${artwork.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
