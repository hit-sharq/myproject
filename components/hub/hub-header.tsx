"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import styles from "./hub-header.module.css"

export default function HubHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getPageTitle = () => {
    if (pathname === "/hub") return "Dashboard"
    if (pathname.startsWith("/hub/artworks")) return "Artworks"
    if (pathname.startsWith("/hub/inquiries")) return "Inquiries"
    if (pathname.startsWith("/hub/profile")) return "Profile"
    return "ArtAfrik Hub"
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{getPageTitle()}</h1>

        <div className={styles.mobileMenu}>
          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={styles.menuIcon}></span>
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <ul className={styles.navList}>
              <li>
                <Link href="/hub" className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/hub/artworks" className={styles.navLink}>
                  Artworks
                </Link>
              </li>
              <li>
                <Link href="/hub/inquiries" className={styles.navLink}>
                  Inquiries
                </Link>
              </li>
              <li>
                <Link href="/hub/profile" className={styles.navLink}>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/" className={styles.navLink}>
                  Back to Gallery
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.actions}>
          <Link href="/hub/artworks/new" className="btn btn-primary">
            Add Artwork
          </Link>
          <div className={styles.userButton}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  )
}
