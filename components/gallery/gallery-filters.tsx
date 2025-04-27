"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCategories } from "@/lib/api/categories"
import { getArtists } from "@/lib/api/artists"
import type { Category, Artist } from "@/lib/types"
import styles from "./gallery-filters.module.css"

interface GalleryFiltersProps {
  selectedCategory?: string
  selectedArtist?: string
  searchQuery?: string
}

export default function GalleryFilters({ selectedCategory, selectedArtist, searchQuery }: GalleryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [search, setSearch] = useState(searchQuery || "")
  const [isLoading, setIsLoading] = useState(true)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesData, artistsData] = await Promise.all([getCategories(), getArtists({ limit: 100 })])

        setCategories(categoriesData)
        setArtists(artistsData.artists)
      } catch (error) {
        console.error("Error loading filters:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilters()
  }, [])

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId === selectedCategory) {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    params.delete("page")
    router.push(`/gallery?${params.toString()}`)
  }

  const handleArtistChange = (artistId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (artistId === selectedArtist) {
      params.delete("artist")
    } else {
      params.set("artist", artistId)
    }

    params.delete("page")
    router.push(`/gallery?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (search) {
      params.set("search", search)
    } else {
      params.delete("search")
    }

    params.delete("page")
    router.push(`/gallery?${params.toString()}`)
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max])
  }

  const handleClearFilters = () => {
    router.push("/gallery")
    setSearch("")
    setPriceRange([0, 10000])
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading filters...</div>
  }

  return (
    <div className={styles.container}>
      <button className={styles.mobileFilterToggle} onClick={toggleFilters}>
        {isFiltersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`${styles.filters} ${isFiltersOpen ? styles.filtersOpen : ""}`}>
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search artworks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Categories</h3>
          <div className={styles.filterOptions}>
            {categories.map((category) => (
              <label key={category.id} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={category.id === selectedCategory}
                  onChange={() => handleCategoryChange(category.id)}
                  className={styles.filterCheckbox}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Artists</h3>
          <div className={`${styles.filterOptions} ${styles.scrollable}`}>
            {artists.map((artist) => (
              <label key={artist.id} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={artist.id === selectedArtist}
                  onChange={() => handleArtistChange(artist.id)}
                  className={styles.filterCheckbox}
                />
                <span>{artist.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleClearFilters} className={styles.clearButton}>
          Clear All Filters
        </button>
      </div>
    </div>
  )
}
