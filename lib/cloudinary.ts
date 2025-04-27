import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
})

/**
 * Upload an image to Cloudinary
 * @param file The file to upload
 * @returns The URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  try {
    // Convert file to base64 data URI
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString("base64")
    const dataURI = `data:${file.type};base64,${base64Data}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "artafrik",
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    })

    return result.secure_url
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

/**
 * Delete an image from Cloudinary
 * @param url The URL of the image to delete
 * @returns Whether the deletion was successful
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extract the public ID from the Cloudinary URL
    const urlParts = url.split("/")
    const filename = urlParts[urlParts.length - 1]
    const publicId = `artafrik/${filename.split(".")[0]}`

    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error)
    return false
  }
}
