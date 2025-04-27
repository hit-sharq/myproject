import Link from "next/link"
import Image from "next/image"
import styles from "./featured-artworks.module.css"

// Mock data for featured artworks
const featuredArtworks = [
  {
    id: "1",
    title: "Serengeti Sunset",
    artist: "Amara Okafor",
    imageUrl: "/placeholder.svg?height=400&width=300",
    price: 1200,
  },
  {
    id: "2",
    title: "Market Day",
    artist: "Emmanuel Kwesi",
    imageUrl: "/placeholder.svg?height=400&width=300",
    price: 950,
  },
  {
    id: "3",
    title: "Ancestral Wisdom",
    artist: "Zainab Musa",
    imageUrl: "/placeholder.svg?height=400&width=300",
    price: 1500,
  },
  {
    id: "4",
    title: "Urban Rhythms",
    artist: "Kofi Mensah",
    imageUrl: "/placeholder.svg?height=400&width=300",
    price: 1100,
  },
]

export default function FeaturedArtworks() {
  return (
    <div className={styles.grid}>
      {featuredArtworks.map((artwork) => (
        <Link href={`/gallery/${artwork.id}`} key={artwork.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={artwork.imageUrl || "/placeholder.svg"}
              alt={artwork.title}
              width={300}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{artwork.title}</h3>
            <p className={styles.artist}>{artwork.artist}</p>
            <p className={styles.price}>${artwork.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
