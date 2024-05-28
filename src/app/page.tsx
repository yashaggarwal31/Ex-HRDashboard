
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
// import { SignUp, useUser } from "@clerk/nextjs";
import { getServerSession } from 'next-auth';
import { config } from '@/auth.config';
// import { create } from '@/lib/setUserId';
// import { setUserId } from '@/lib/setUserId';

async function getGoogleUserId(){
  const session = await getServerSession(config);
  if(!session) return null;
  const user_id = session.user.token.sub
  console.log(user_id)

  return user_id;
}



export default async function page() {
  // const router = useRouter();
  // const session = useSession();
  // console.log(session)
  'use server'


  const session = await getServerSession(config);

  const user_id = session.user.token.sub
  console.log('ss',session)
  // await create(user_id);
  // const cookieStore = cookies();
  // cookies().set('user_id', user_id)

  
    
  //  useEffect(()=>{
  //   if (!user) {
  //     router.push('/signup')
  //   }
  //   else router.push('/user/ticket')
  //  },[])
    
  

  return <div>Welcome!</div>;
}

