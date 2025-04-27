import { Suspense } from "react"
import Link from "next/link"
import ArtworksList from "@/components/hub/artworks/artworks-list"
import ArtworksListSkeleton from "@/components/hub/artworks/artworks-list-skeleton"
import styles from "./page.module.css"

export const metadata = {
  title: "Manage Artworks | ArtAfrik Hub",
  description: "Manage your artworks on ArtAfrik",
}

export default function ArtworksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Artworks</h1>
        <Link href="/hub/artworks/new" className="btn btn-primary">
          Add New Artwork
        </Link>
      </div>

      <div className={styles.filters}>
        <form className={styles.searchForm} action="/hub/artworks" method="get">
          <input
            type="text"
            name="search"
            placeholder="Search artworks..."
            defaultValue={search}
            className={styles.searchInput}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      <Suspense fallback={<ArtworksListSkeleton />}>
        <ArtworksList search={search} page={page} />
      </Suspense>
    </div>
  )
}
