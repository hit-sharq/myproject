import Link from "next/link"
import Image from "next/image"
import { getArtists } from "@/lib/api/artists"
import Pagination from "@/components/ui/pagination"
import styles from "./artist-grid.module.css"

interface ArtistGridProps {
  search?: string
  page: number
}

export default async function ArtistGrid({ search, page = 1 }: ArtistGridProps) {
  const limit = 9
  const { artists, total } = await getArtists({
    search,
    page,
    limit,
  })

  const totalPages = Math.ceil(total / limit)

  if (artists.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No artists found</h3>
        <p>Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {artists.map((artist) => (
          <Link href={`/artists/${artist.id}`} key={artist.id} className={styles.artistCard}>
            <div className={styles.imageContainer}>
              <Image
                src={artist.profileImageUrl || "/placeholder.svg?height=300&width=300"}
                alt={artist.name}
                width={300}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{artist.name}</h3>
              <p className={styles.location}>{artist.location}</p>
              <p className={styles.bio}>{artist.shortBio}</p>
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
