import type { Inquiry } from "../types"
import { prisma } from "../db"

export async function createInquiry(data: {
  name: string
  email: string
  message: string
  artworkId?: string
}): Promise<Inquiry> {
  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        artworkId: data.artworkId,
        status: "PENDING",
      },
      include: {
        artwork: true,
      },
    })

    return inquiry
  } catch (error) {
    console.error("Error creating inquiry:", error)
    throw new Error("Failed to create inquiry")
  }
}

export async function getInquiries(options: {
  status?: "PENDING" | "RESPONDED" | "CLOSED"
  page?: number
  limit?: number
}): Promise<{ inquiries: Inquiry[]; total: number }> {
  const { status, page = 1, limit = 10 } = options

  try {
    const where: any = {}

    if (status) {
      where.status = status
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: {
          artwork: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.inquiry.count({ where }),
    ])

    return { inquiries, total }
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return { inquiries: [], total: 0 }
  }
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: {
        id,
      },
      include: {
        artwork: true,
      },
    })

    return inquiry
  } catch (error) {
    console.error(`Error fetching inquiry with id ${id}:`, error)
    return null
  }
}

export async function updateInquiryStatus(
  id: string,
  status: "PENDING" | "RESPONDED" | "CLOSED",
): Promise<Inquiry | null> {
  try {
    const inquiry = await prisma.inquiry.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        artwork: true,
      },
    })

    return inquiry
  } catch (error) {
    console.error(`Error updating inquiry status with id ${id}:`, error)
    return null
  }
}

export async function getRecentInquiries(limit = 5): Promise<Inquiry[]> {
  try {
    const inquiries = await prisma.inquiry.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        artwork: true,
      },
    })

    return inquiries
  } catch (error) {
    console.error("Error fetching recent inquiries:", error)
    return []
  }
}
