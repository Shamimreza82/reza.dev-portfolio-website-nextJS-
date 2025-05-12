// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { verifyToken } from "@/lib/auth"

// // Define which routes should be protected
// const protectedRoutes = ["/dashboard", "/profile", "/settings"]

// // Define which routes are public for authenticated users
// const authRoutes = ["/auth"]

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Get the token from the cookies
//   const token = request.cookies.get("auth-token")?.value

//   // Check if the user is authenticated
//   const isAuthenticated = token ? await verifyToken(token) : false

//   // If the route is protected and the user is not authenticated, redirect to login
//   if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
//     const url = new URL("/auth", request.url)
//     url.searchParams.set("callbackUrl", pathname)
//     return NextResponse.redirect(url)
//   }

//   // If the user is authenticated and trying to access auth pages, redirect to dashboard
//   if (authRoutes.some((route) => pathname.startsWith(route)) && isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }

//   return NextResponse.next()
// }

// // Configure the middleware to run on specific paths
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - api routes that don't need auth (like public API endpoints)
//      * - static files (like images, js, css)
//      * - favicon.ico
//      */
//     "/((?!api/public|_next/static|_next/image|favicon.ico).*)",
//   ],
// }
