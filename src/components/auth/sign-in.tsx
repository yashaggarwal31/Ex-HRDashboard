// import { signIn } from '@/app/auth'
// import { AuthError } from 'next-auth'
// import Image from 'next/image'

// export function SignIn () {
//   return (
  
//      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
//           <div className="flex-1">
//             <div className="text-center">
//               <div className="flex justify-center mx-auto">
//                 <Image
//                   width={100}
//                   height={100}
//                   className="w-auto h-7 sm:h-8"
//                   src="https://merakiui.com/images/logo.svg"
//                   alt=""
//                 />
//               </div>

//               <p className="mt-3 text-gray-500 dark:text-gray-300">
//                 Sign in to access your account
//               </p>
//             </div>

//             <div className="mt-8">
//             <form action={async formData => {
                  
//                   'use server'
//                   // formData.append('callbackUrl','/user/ticket')
//                   try{
//                     await signIn('credentials',formData)
//                   }
//                   catch(error){

//                     if(error instanceof AuthError){
//                       switch(error.type){
//                         case "CredentialsSignin":
//                           return {error: 'Invalid Credentials'}
//                           break;
//                         default:
//                           return {error:"Something went wrong"}
//                       }
//                     }

//                     throw error;
                     
//                   }

//                   // redirect('/admin/dashboard');


//                   // await signIn('credentials', , formData);

                  
//                 }}
//               >
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     placeholder="example@example.com"
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
//                   />
//                 </div>

//                 <div className="mt-6">
//                   <div className="flex justify-between mb-2">
//                     <label
//                       htmlFor="password"
//                       className="text-sm text-gray-600 dark:text-gray-200"
//                     >
//                       Password
//                     </label>
//                     <a
//                       href="#"
//                       className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
//                     >
//                       Forgot password?
//                     </a>
//                   </div>

//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="Your Password"
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
//                   />
//                 </div>

//                 <div className="mt-6">
//                   <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
//                     Sign in
//                   </button>
//                 </div>

//                 {/* Hidden Input tag for callback */}
//                 {/* <input type="callbackUrl" name='callbackUrl' id='callbackUrl' value='/user/ticket' /> */}
//               </form>

//               <p className="mt-6 text-sm text-center text-gray-400">
//                 Don&#x27;t have an account yet?{" "}
//                 <a
//                   href="#"
//                   className="text-blue-500 focus:outline-none focus:underline hover:underline"
//                 >
//                   Sign up
//                 </a>
//                 .
//               </p>
//             </div>
//           </div>
//       </div>
    
//   )
// }




