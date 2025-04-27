import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "./db"
import type { Artist } from "./types"

/**
 * Get the current authenticated user's ID
 * @returns The user ID or null if not authenticated
 */
export function getCurrentUserId(): string | null {
  const { userId } = auth()
  return userId
}

/**
 * Get the current authenticated user's artist profile
 * @returns The artist profile or null if not found
 */
export async function getCurrentArtist(): Promise<Artist | null> {
  const user = await currentUser()

  if (!user) {
    return null
  }

  try {
    const artist = await prisma.artist.findFirst({
      where: {
        user: {
          clerkId: user.id,
        },
      },
    })

    return artist
  } catch (error) {
    console.error("Error fetching artist:", error)
    return null
  }
}

/**
 * Check if the current user is an admin
 * @returns Whether the user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await currentUser()

  if (!user) {
    return false
  }

  // Check if user ID is in the admin list
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || []
  if (adminUserIds.includes(user.id)) {
    return true
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    return dbUser?.role === "ADMIN"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}
