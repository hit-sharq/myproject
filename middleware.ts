import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/gallery",
    "/gallery/(.*)",
    "/artists",
    "/artists/(.*)",
    "/about",
    "/contact",
    "/api/webhooks/(.*)",
    "/api/artworks",
    "/api/artists",
    "/api/categories",
  ],
  // Routes that can be accessed by unauthenticated users
  ignoredRoutes: ["/api/public/(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
