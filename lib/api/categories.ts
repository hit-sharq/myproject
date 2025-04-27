import type { Category } from "../types"
import { prisma } from "../db"

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error)
    return null
  }
}

export async function createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category | null> {
  try {
    const category = await prisma.category.create({
      data,
    })

    return category
  } catch (error) {
    console.error("Error creating category:", error)
    return null
  }
}

export async function updateCategory(
  id: string,
  data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>,
): Promise<Category | null> {
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    })

    return category
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error)
    return null
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    })

    return true
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error)
    return false
  }
}
