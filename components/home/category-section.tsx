import Link from "next/link"
import Image from "next/image"
import styles from "./category-section.module.css"

// Mock data for categories
const categories = [
  {
    id: "1",
    name: "Paintings",
    description: "Traditional and contemporary paintings from across Africa",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    name: "Sculptures",
    description: "Handcrafted sculptures in wood, metal, and stone",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    name: "Textiles",
    description: "Traditional fabrics and contemporary textile art",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    name: "Photography",
    description: "Captivating images from African photographers",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export default function CategorySection() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore by Category</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link href={`/gallery?category=${category.id}`} key={category.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={300}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
