import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ArtworkDetail from "@/components/artwork/artwork-detail"
import ArtworkDetailSkeleton from "@/components/artwork/artwork-detail-skeleton"
import RelatedArtworks from "@/components/artwork/related-artworks"
import InquiryForm from "@/components/artwork/inquiry-form"
import { getArtworkById } from "@/lib/api/artworks"
import styles from "./page.module.css"

interface ArtworkPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ArtworkPageProps) {
  const artwork = await getArtworkById(params.id)

  if (!artwork) {
    return {
      title: "Artwork Not Found | ArtAfrik",
      description: "The requested artwork could not be found.",
    }
  }

  return {
    title: `${artwork.title} by ${artwork.artist.name} | ArtAfrik`,
    description: artwork.description.substring(0, 160),
    openGraph: {
      title: `${artwork.title} by ${artwork.artist.name} | ArtAfrik`,
      description: artwork.description.substring(0, 160),
      images: [
        {
          url: artwork.imageUrl,
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
    },
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = await getArtworkById(params.id)

  if (!artwork) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <Suspense fallback={<ArtworkDetailSkeleton />}>
            <ArtworkDetail artwork={artwork} />
          </Suspense>

          <div className={styles.inquirySection}>
            <h2 className={styles.sectionTitle}>Interested in this artwork?</h2>
            <InquiryForm artworkId={artwork.id} artworkTitle={artwork.title} />
          </div>

          <div className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>More by {artwork.artist.name}</h2>
            <Suspense fallback={<p>Loading related artworks...</p>}>
              <RelatedArtworks artistId={artwork.artistId} currentArtworkId={artwork.id} />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
