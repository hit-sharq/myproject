import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>ArtAfrik</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/artists">Artists</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.actions}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}
