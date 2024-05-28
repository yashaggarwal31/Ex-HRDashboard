// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(['/user(.*)', '/admin(.*)'])

// // const isLoginRoute = createRouteMatcher(['/signin'])

// export default clerkMiddleware((auth, req) => {

//   if (isProtectedRoute(req)) auth().protect()

//   // if (isLoginRoute(req)) {
//   //   const userId = auth()
//   //   if (userId == null) {
//   //     console.log(userId)
//   //     redirect('/user/ticket')
//   //   }
//   // }
// })

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
// }

export { default } from 'next-auth/middleware'

// export const config = { matcher: ['/dashboard'] }
