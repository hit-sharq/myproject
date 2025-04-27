export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "ARTIST" | "USER"
  createdAt: Date
  updatedAt: Date
}

export interface Artist {
  id: string
  userId: string
  name: string
  profileImageUrl: string
  location: string
  shortBio: string
  fullBio: string
  featured: boolean
  socialLinks: {
    website?: string
    instagram?: string
    twitter?: string
    facebook?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface Artwork {
  id: string
  title: string
  description: string
  artistId: string
  artist: Artist
  imageUrl: string
  additionalImages: string[]
  price: number
  dimensions: {
    height: number
    width: number
    depth?: number
    unit: "cm" | "in"
  }
  medium: string
  categoryId: string
  category: Category
  year: number
  available: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Inquiry {
  id: string
  name: string
  email: string
  message: string
  artworkId?: string
  artwork?: Artwork
  status: "PENDING" | "RESPONDED" | "CLOSED"
  createdAt: Date
  updatedAt: Date
}
