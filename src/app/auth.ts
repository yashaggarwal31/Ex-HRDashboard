// // 'use server'
// import NextAuth from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'
// // import { authConfig } from '@/auth.config'
// import { z } from 'zod'
// // import prisma from '@/prisma/db'
// // import { getUserFromDb } from '@/lib/users'

// // import { sql } from '@vercel/postgres';
// // import type { User } from '@/app/lib/definitions';
// // import bcrypt from 'bcrypt';

// async function getUser (email: any, password: any): Promise<any | undefined> {
//   // try {
//   //   const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
//   //   return user.rows[0]
//   // } catch (error) {
//   //   console.error('Failed to fetch user:', error)
//   //   throw new Error('Failed to fetch user.')

//   // const user = await prisma.users.findFirst({
//   //   where: {
//   //     email: email,
//   //     password: password
//   //   }
//   // })

//   console.log('Prisma User**********')
//   // console.log(user)
//   // }

//   return {
//     name: 'Yash',
//     email: 'yashaggarwal@gmail.com'
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   session: { strategy: 'jwt' },
//   pages: {
//     signIn: '/login',
//     signOut: '/signout'
//   },
//   callbacks: {
//     async signIn ({ user, account, profile, email, credentials }) {
//       return '/admin/dashboard'
//     },
//     async session ({ session, token }) {
//       // session?.user?.id = token.id;
//       return session
//     },
//     async jwt ({ token, user }) {
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },

//     authorized ({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user
//       return true

//       if (isLoggedIn) return Response.redirect(new URL('/admin/dashboard'))

//       //remove this customize for admin
//       console.log('middleware')
//       // const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/admin')
//       if (isOnDashboard) {
//         if (isLoggedIn) return true
//         return false // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl))
//       }
//       return true
//     }
//   },
//   providers: [
//     Credentials({
//       async authorize (credentials) {
//         console.log('Credentials', credentials)

//         return {
//           name: 'Yash',
//           email: 'yashaggarwal@gmail.com',
//           id: '1111'
//         }
//         ;('use server')

//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials)

//         if (parsedCredentials.success) {
//           console.log(parsedCredentials)

//           const { email, password } = credentials
//           console.log(email)
//           const user = await getUser(email, password)
//           if (!user) return null

//           console.log('Invalid Credentials')

//           return null
//         }
//       }
//     })
//   ]
// })
