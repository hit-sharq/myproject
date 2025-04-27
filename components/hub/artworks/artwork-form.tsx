"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createArtwork, updateArtwork } from "@/lib/api/artworks"
import { uploadImage } from "@/lib/cloudinary"
import type { Artwork, Category } from "@/lib/types"
import styles from "./artwork-form.module.css"

interface ArtworkFormProps {
  artwork?: Artwork
  categories: Category[]
  artistId?: string
}

export default function ArtworkForm({ artwork, categories, artistId }: ArtworkFormProps) {
  const router = useRouter()
  const isEditing = Boolean(artwork)

  const [formData, setFormData] = useState({
    title: artwork?.title || "",
    description: artwork?.description || "",
    price: artwork?.price || 0,
    medium: artwork?.medium || "",
    year: artwork?.year || new Date().getFullYear(),
    categoryId: artwork?.categoryId || (categories.length > 0 ? categories[0].id : ""),
    available: artwork?.available ?? true,
    featured: artwork?.featured ?? false,
    heightCm: artwork?.dimensions?.height || 0,
    widthCm: artwork?.dimensions?.width || 0,
    depthCm: artwork?.dimensions?.depth || 0,
  })

  const [mainImage, setMainImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [mainImagePreview, setMainImagePreview] = useState<string>(artwork?.imageUrl || "")
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>(artwork?.additionalImages || [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number.parseFloat(value) || 0,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMainImage(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setMainImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setAdditionalImages((prev) => [...prev, ...files])

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setAdditionalImagePreviews((prev) => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (!artistId) {
        throw new Error("Artist ID is required")
      }

      // Upload main image if changed
      let imageUrl = artwork?.imageUrl || ""
      if (mainImage) {
        imageUrl = await uploadImage(mainImage)
      }

      // Upload additional images if any
      const additionalImageUrls = [...(artwork?.additionalImages || [])]
      for (const file of additionalImages) {
        const uploadedImage = await uploadImage(file)
        additionalImageUrls.push(uploadedImage)
      }

      const artworkData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        medium: formData.medium,
        year: formData.year,
        categoryId: formData.categoryId,
        available: formData.available,
        featured: formData.featured,
        imageUrl,
        additionalImages: additionalImageUrls,
        dimensions: {
          height: formData.heightCm,
          width: formData.widthCm,
          depth: formData.depthCm,
          unit: "cm",
        },
      }

      if (isEditing && artwork) {
        await updateArtwork(artwork.id, artworkData)
      } else {
        await createArtwork({
          ...artworkData,
          artistId,
        })
      }

      router.push("/hub/artworks")
      router.refresh()
    } catch (err) {
      console.error("Error submitting artwork:", err)
      setError("There was an error saving the artwork. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGrid}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Artwork Information</h2>

          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="medium" className={styles.label}>
              Medium *
            </label>
            <input
              id="medium"
              name="medium"
              type="text"
              value={formData.medium}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="e.g. Oil on canvas, Mixed media"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                Price ($) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="year" className={styles.label}>
                Year *
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="categoryId" className={styles.label}>
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className={styles.select}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <h3 className={styles.subsectionTitle}>Dimensions</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="heightCm" className={styles.label}>
                Height (cm) *
              </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                step="0.1"
                min="0"
                value={formData.heightCm}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="widthCm" className={styles.label}>
                Width (cm) *
              </label>
              <input
                id="widthCm"
                name="widthCm"
                type="number"
                step="0.1"
                min="0"
                value={formData.widthCm}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="depthCm" className={styles.label}>
              Depth (cm) (optional)
            </label>
            <input
              id="depthCm"
              name="depthCm"
              type="number"
              step="0.1"
              min="0"
              value={formData.depthCm}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Images</h2>

          <div className={styles.formGroup}>
            <label htmlFor="mainImage" className={styles.label}>
              Main Image *
            </label>
            <div className={styles.imageUploadContainer}>
              {mainImagePreview ? (
                <div className={styles.imagePreview}>
                  <Image
                    src={mainImagePreview || "/placeholder.svg"}
                    alt="Main artwork preview"
                    className={styles.previewImage}
                    width={400}
                    height={300}
                  />
                </div>
              ) : (
                <div className={styles.imageDropzone}>
                  <p>Drag and drop an image or click to select</p>
                </div>
              )}
              <input
                id="mainImage"
                name="mainImage"
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className={styles.fileInput}
                required={!isEditing}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="additionalImages" className={styles.label}>
              Additional Images (optional)
            </label>
            <div className={styles.imageUploadContainer}>
              <div className={styles.additionalImagesGrid}>
                {additionalImagePreviews.map((src, index) => (
                  <div key={index} className={styles.additionalImagePreview}>
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Additional artwork preview ${index}`}
                      className={styles.previewImage}
                      width={150}
                      height={150}
                    />
                    <button
                      type="button"
                      className={styles.removeImageButton}
                      onClick={() => removeAdditionalImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className={styles.additionalImageDropzone}>
                  <input
                    id="additionalImages"
                    name="additionalImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className={styles.fileInput}
                  />
                  <p>+ Add more images</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Available for sale
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Feature on homepage and gallery
            </label>
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={() => router.back()} className={styles.cancelButton} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Artwork" : "Create Artwork"}
        </button>
      </div>
    </form>
  )
}
