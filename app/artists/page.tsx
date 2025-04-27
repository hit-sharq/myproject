import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ArtistGrid from "@/components/artists/artist-grid"
import ArtistSkeleton from "@/components/artists/artist-skeleton"
import styles from "./page.module.css"

export const metadata = {
  title: "Artists | ArtAfrik",
  description:
    "Discover talented African artists showcasing their creativity and cultural heritage through authentic artworks.",
}

export default function ArtistsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Meet Our Artists</h1>
          <p className={styles.subtitle}>
            Discover talented African artists showcasing their creativity and cultural heritage through authentic
            artworks
          </p>

          <div className={styles.searchContainer}>
            <form className={styles.searchForm} action="/artists" method="get">
              <input
                type="text"
                name="search"
                placeholder="Search artists by name or location..."
                defaultValue={search}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </form>
          </div>

          <Suspense fallback={<ArtistSkeleton />}>
            <ArtistGrid search={search} page={page} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
