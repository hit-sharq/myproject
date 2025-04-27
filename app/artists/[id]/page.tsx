import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ArtistArtworks from "@/components/artists/artist-artworks"
import { getArtistById } from "@/lib/api/artists"
import styles from "./page.module.css"

interface ArtistPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const artist = await getArtistById(params.id)

  if (!artist) {
    return {
      title: "Artist Not Found | ArtAfrik",
      description: "The requested artist profile could not be found.",
    }
  }

  return {
    title: `${artist.name} | ArtAfrik`,
    description: artist.shortBio,
    openGraph: {
      title: `${artist.name} | ArtAfrik`,
      description: artist.shortBio,
      images: [
        {
          url: artist.profileImageUrl,
          width: 1200,
          height: 630,
          alt: artist.name,
        },
      ],
    },
  }
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const artist = await getArtistById(params.id)

  if (!artist) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.artistProfile}>
              <div className={styles.profileImageContainer}>
                <Image
                  src={artist.profileImageUrl || "/placeholder.svg?height=300&width=300"}
                  alt={artist.name}
                  width={300}
                  height={300}
                  className={styles.profileImage}
                  priority
                />
              </div>

              <div className={styles.profileContent}>
                <h1 className={styles.name}>{artist.name}</h1>
                <p className={styles.location}>{artist.location}</p>
                <div className={styles.bio}>{artist.fullBio}</div>

                {artist.socialLinks && (
                  <div className={styles.socialLinks}>
                    {artist.socialLinks.website && (
                      <Link
                        href={artist.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" />
                          <path d="M2 12H22" />
                          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" />
                        </svg>
                        <span>Website</span>
                      </Link>
                    )}
                    {artist.socialLinks.instagram && (
                      <Link
                        href={artist.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>Instagram</span>
                      </Link>
                    )}
                    {artist.socialLinks.twitter && (
                      <Link
                        href={artist.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                        <span>Twitter</span>
                      </Link>
                    )}
                    {artist.socialLinks.facebook && (
                      <Link
                        href={artist.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <span>Facebook</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h2 className={styles.galleryTitle}>Artworks by {artist.name}</h2>
          <Suspense fallback={<p>Loading artworks...</p>}>
            <ArtistArtworks artistId={artist.id} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
