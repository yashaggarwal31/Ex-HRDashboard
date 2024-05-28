// import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/signin',
//     signOut:'/signout'
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
      
//       return '/admin/dashboard';
//     },
//     authorized({ auth, request: { nextUrl } }) {
       

//       const isLoggedIn = !!auth?.user;
//       return true;
     
//         if(isLoggedIn) return Response.redirect(new URL('/admin/dashboard'));
      
      
//       //remove this customize for admin
//     console.log('middleware')
//       // const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/admin');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;



import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
  } from "next";
  import type { NextAuthOptions } from "next-auth";
  import { getServerSession } from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  
  // You'll need to import and pass this
  // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`

//   secret:  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjg5NjkwMCwiaWF0IjoxNzE2ODk2OTAwfQ.KVMlO5SLrh5idoHeoRaQWAtBzM_Ff9lMJA43UGE-2qE"
  export const config = {
        providers: [
      GoogleProvider({
        clientId:
          "1001501182863-um2t1v6rivrcoflb9b4n7bc2q1nc6lp0.apps.googleusercontent.com",
        clientSecret: "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",
      }),
    ],
    callbacks: {
      session: async ({ session, token }) => {
        console.log(token);
        if (session?.user) {
          session.user.id = token.sub;
          session.user.token = token;
        }
  
        return session;
      },
      jwt: async ({ user, token, account }) => {
        if (user) {
          token.jti = account?.access_token;
          token.uid = user.id;
        }
        return token;
      },
    },
    session: {
      strategy: "jwt",
    },
  } satisfies NextAuthOptions;
  
  // Use it in server contexts
  export function auth(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, config);
  }