import type { Artwork } from "../types"
import { prisma } from "../db"

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  try {
    const artworks = await prisma.artwork.findMany({
      where: {
        featured: true,
      },
      include: {
        artist: true,
        category: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    })

    return artworks
  } catch (error) {
    console.error("Error fetching featured artworks:", error)
    return []
  }
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        category: true,
      },
    })

    return artwork
  } catch (error) {
    console.error(`Error fetching artwork with id ${id}:`, error)
    return null
  }
}

export async function getArtworks(options: {
  categoryId?: string
  artistId?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ artworks: Artwork[]; total: number }> {
  const { categoryId, artistId, search, page = 1, limit = 12 } = options

  try {
    const where: any = {
      available: true,
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (artistId) {
      where.artistId = artistId
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ]
    }

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          artist: true,
          category: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.artwork.count({ where }),
    ])

    return { artworks, total }
  } catch (error) {
    console.error("Error fetching artworks:", error)
    return { artworks: [], total: 0 }
  }
}

export async function createArtwork(
  data: Omit<Artwork, "id" | "createdAt" | "updatedAt" | "artist" | "category">,
): Promise<Artwork | null> {
  try {
    const artwork = await prisma.artwork.create({
      data,
      include: {
        artist: true,
        category: true,
      },
    })

    return artwork
  } catch (error) {
    console.error("Error creating artwork:", error)
    return null
  }
}

export async function updateArtwork(
  id: string,
  data: Partial<Omit<Artwork, "id" | "createdAt" | "updatedAt" | "artist" | "category">>,
): Promise<Artwork | null> {
  try {
    const artwork = await prisma.artwork.update({
      where: {
        id,
      },
      data,
      include: {
        artist: true,
        category: true,
      },
    })

    return artwork
  } catch (error) {
    console.error(`Error updating artwork with id ${id}:`, error)
    return null
  }
}

export async function deleteArtwork(id: string): Promise<boolean> {
  try {
    await prisma.artwork.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    console.error(`Error deleting artwork with id ${id}:`, error)
    return false
  }
}
