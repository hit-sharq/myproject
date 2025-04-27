import { prisma } from "../db"

export async function getArtworksCount() {
  try {
    const [totalArtworks, featuredArtworks, availableArtworks] = await Promise.all([
      prisma.artwork.count(),
      prisma.artwork.count({
        where: {
          featured: true,
        },
      }),
      prisma.artwork.count({
        where: {
          available: true,
        },
      }),
    ])

    return { totalArtworks, featuredArtworks, availableArtworks }
  } catch (error) {
    console.error("Error fetching artwork counts:", error)
    return { totalArtworks: 0, featuredArtworks: 0, availableArtworks: 0 }
  }
}

export async function getInquiriesCount() {
  try {
    const [totalInquiries, pendingInquiries] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({
        where: {
          status: "PENDING",
        },
      }),
    ])

    return { totalInquiries, pendingInquiries }
  } catch (error) {
    console.error("Error fetching inquiry counts:", error)
    return { totalInquiries: 0, pendingInquiries: 0 }
  }
}

export async function getRecentArtworks(limit = 5) {
  try {
    const artworks = await prisma.artwork.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        artist: true,
      },
    })

    return artworks
  } catch (error) {
    console.error("Error fetching recent artworks:", error)
    return []
  }
}
