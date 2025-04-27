import type React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import HubSidebar from "@/components/hub/hub-sidebar"
import HubHeader from "@/components/hub/hub-header"
import styles from "./layout.module.css"

export const metadata = {
  title: "ArtAfrik Hub - Admin Portal",
  description: "Manage your artworks and profile on ArtAfrik",
}

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className={styles.container}>
      <HubSidebar />

      <div className={styles.content}>
        <HubHeader />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
