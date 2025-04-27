import Link from "next/link"
import Image from "next/image"
import styles from "./artist-spotlight.module.css"

// Mock data for featured artist
const featuredArtist = {
  id: "1",
  name: "Amara Okafor",
  location: "Lagos, Nigeria",
  bio: "Amara Okafor is a contemporary artist whose work explores the intersection of traditional African symbolism and modern urban life. Her vibrant paintings capture the energy and spirit of African culture while addressing themes of identity, heritage, and social change.",
  imageUrl: "/placeholder.svg?height=400&width=400",
  artworks: [
    {
      id: "1",
      title: "Serengeti Sunset",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "2",
      title: "Market Rhythms",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "3",
      title: "Ancestral Voices",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
  ],
}

export default function ArtistSpotlight() {
  return (
    <div className={styles.spotlight}>
      <div className={styles.artist}>
        <div className={styles.imageContainer}>
          <Image
            src={featuredArtist.imageUrl || "/placeholder.svg"}
            alt={featuredArtist.name}
            width={400}
            height={400}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{featuredArtist.name}</h3>
          <p className={styles.location}>{featuredArtist.location}</p>
          <p className={styles.bio}>{featuredArtist.bio}</p>
          <Link href={`/artists/${featuredArtist.id}`} className={styles.link}>
            View Profile
          </Link>
        </div>
      </div>
      <div className={styles.artworks}>
        {featuredArtist.artworks.map((artwork) => (
          <Link href={`/gallery/${artwork.id}`} key={artwork.id} className={styles.artwork}>
            <Image
              src={artwork.imageUrl || "/placeholder.svg"}
              alt={artwork.title}
              width={300}
              height={300}
              className={styles.artworkImage}
            />
            <p className={styles.artworkTitle}>{artwork.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
