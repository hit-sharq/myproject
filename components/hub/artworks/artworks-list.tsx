import Link from "next/link"
import Image from "next/image"
import { getArtworks } from "@/lib/api/artworks"
import Pagination from "@/components/ui/pagination"
import styles from "./artworks-list.module.css"

interface ArtworksListProps {
  search?: string
  page: number
}

export default async function ArtworksList({ search, page = 1 }: ArtworksListProps) {
  const limit = 10
  const { artworks, total } = await getArtworks({
    search,
    page,
    limit,
  })

  const totalPages = Math.ceil(total / limit)

  if (artworks.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No artworks found</h3>
        <p>Try adjusting your search criteria or add your first artwork.</p>
        <Link href="/hub/artworks/new" className="btn btn-primary">
          Add New Artwork
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id}>
                <td className={styles.imageCell}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={artwork.imageUrl || "/placeholder.svg?height=60&width=80"}
                      alt={artwork.title}
                      width={80}
                      height={60}
                      className={styles.image}
                    />
                  </div>
                </td>
                <td>{artwork.title}</td>
                <td>{artwork.category.name}</td>
                <td>${artwork.price.toLocaleString()}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      artwork.available ? styles.statusAvailable : styles.statusSold
                    }`}
                  >
                    {artwork.available ? "Available" : "Sold"}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.featuredBadge} ${artwork.featured ? styles.featured : styles.notFeatured}`}
                  >
                    {artwork.featured ? "Featured" : "Not Featured"}
                  </span>
                </td>
                <td className={styles.actions}>
                  <Link href={`/hub/artworks/${artwork.id}`} className={styles.actionButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Link>
                  <Link href={`/gallery/${artwork.id}`} target="_blank" className={styles.actionButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span className="sr-only">View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
