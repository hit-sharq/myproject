import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import GalleryGrid from "@/components/gallery/gallery-grid"
import GalleryFilters from "@/components/gallery/gallery-filters"
import GallerySkeleton from "@/components/gallery/gallery-skeleton"
import styles from "./page.module.css"

export const metadata = {
  title: "Gallery | ArtAfrik",
  description: "Explore our collection of authentic African artworks from talented artists across the continent.",
}

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryId = typeof searchParams.category === "string" ? searchParams.category : undefined
  const artistId = typeof searchParams.artist === "string" ? searchParams.artist : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Explore African Art</h1>

          <div className={styles.galleryLayout}>
            <aside className={styles.sidebar}>
              <GalleryFilters selectedCategory={categoryId} selectedArtist={artistId} searchQuery={search} />
            </aside>

            <div className={styles.content}>
              <Suspense fallback={<GallerySkeleton />}>
                <GalleryGrid categoryId={categoryId} artistId={artistId} search={search} page={page} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
