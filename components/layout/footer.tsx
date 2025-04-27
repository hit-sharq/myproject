import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>ArtAfrik</h3>
            <p className={styles.description}>
              Celebrating African creativity worldwide, connecting artists with art lovers.
            </p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Explore</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/artists">Artists</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Connect</h3>
            <ul className={styles.links}>
              <li>
                <a href="https://instagram.com/artafrik" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/artafrik" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com/artafrik" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Subscribe</h3>
            <p className={styles.description}>
              Join our newsletter to receive updates on new artworks and exhibitions.
            </p>
            <form className={styles.form}>
              <input type="email" placeholder="Your email" className={styles.input} required />
              <button type="submit" className={styles.button}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; {currentYear} ArtAfrik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
