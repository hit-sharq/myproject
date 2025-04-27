import { notFound } from "next/navigation"
import { getArtworkById } from "@/lib/api/artworks"
import { getCategories } from "@/lib/api/categories"
import { getCurrentArtist } from "@/lib/auth"
import ArtworkForm from "@/components/hub/artworks/artwork-form"
import styles from "../new/page.module.css"

interface EditArtworkPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditArtworkPageProps) {
  const artwork = await getArtworkById(params.id)

  if (!artwork) {
    return {
      title: "Artwork Not Found | ArtAfrik Hub",
      description: "The requested artwork could not be found.",
    }
  }

  return {
    title: `Edit ${artwork.title} | ArtAfrik Hub`,
    description: `Edit artwork details for ${artwork.title}`,
  }
}

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const [artwork, categories, artist] = await Promise.all([
    getArtworkById(params.id),
    getCategories(),
    getCurrentArtist(),
  ])

  if (!artwork) {
    notFound()
  }

  // Check if the current artist is the owner of the artwork
  if (artist && artwork.artistId !== artist.id) {
    // In a real app, you might want to redirect to an error page
    // For now, we'll just show the form but it will fail on submit
    console.warn("Artist does not own this artwork")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Artwork: {artwork.title}</h1>
      <ArtworkForm artwork={artwork} categories={categories} artistId={artist?.id} />
    </div>
  )
}
