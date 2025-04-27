import { getCategories } from "@/lib/api/categories"
import { getCurrentArtist } from "@/lib/auth"
import ArtworkForm from "@/components/hub/artworks/artwork-form"
import styles from "./page.module.css"

export const metadata = {
  title: "Add New Artwork | ArtAfrik Hub",
  description: "Add a new artwork to your ArtAfrik gallery",
}

export default async function NewArtworkPage() {
  const [categories, artist] = await Promise.all([getCategories(), getCurrentArtist()])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Artwork</h1>
      <ArtworkForm categories={categories} artistId={artist?.id} />
    </div>
  )
}
