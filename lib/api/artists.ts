import type { Artist } from "../types"
import { prisma } from "../db"

export async function getFeaturedArtists(): Promise<Artist[]> {
  try {
    const artists = await prisma.artist.findMany({
      where: {
        featured: true,
      },
      take: 3,
      orderBy: {
        name: "asc",
      },
    })

    return artists
  } catch (error) {
    console.error("Error fetching featured artists:", error)
    return []
  }
}

export async function getArtistById(id: string): Promise<Artist | null> {
  try {
    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    })

    return artist
  } catch (error) {
    console.error(`Error fetching artist with id ${id}:`, error)
    return null
  }
}

export async function getArtists(options: {
  search?: string
  page?: number
  limit?: number
}): Promise<{ artists: Artist[]; total: number }> {
  const { search, page = 1, limit = 12 } = options

  try {
    const where: any = {}

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          shortBio: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          fullBio: {
            contains: search,
            mode: "insensitive",
          },
        },
      ]
    }

    const [artists, total] = await Promise.all([
      prisma.artist.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          name: "asc",
        },
      }),
      prisma.artist.count({ where }),
    ])

    return { artists, total }
  } catch (error) {
    console.error("Error fetching artists:", error)
    return { artists: [], total: 0 }
  }
}

export async function createArtist(data: Omit<Artist, "id" | "createdAt" | "updatedAt">): Promise<Artist | null> {
  try {
    const artist = await prisma.artist.create({
      data,
    })

    return artist
  } catch (error) {
    console.error("Error creating artist:", error)
    return null
  }
}

export async function updateArtist(
  id: string,
  data: Partial<Omit<Artist, "id" | "createdAt" | "updatedAt">>,
): Promise<Artist | null> {
  try {
    const artist = await prisma.artist.update({
      where: {
        id,
      },
      data,
    })

    return artist
  } catch (error) {
    console.error(`Error updating artist with id ${id}:`, error)
    return null
  }
}

export async function deleteArtist(id: string): Promise<boolean> {
  try {
    await prisma.artist.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    console.error(`Error deleting artist with id ${id}:`, error)
    return false
  }
}
