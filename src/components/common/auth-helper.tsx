import React from 'react'
import { getServerSession } from 'next-auth';
import { config } from '@/auth.config';
import { userCreationFlow } from "@/lib/users";


export default async function AuthHelper() {

    console.log('auth helper is called')

  const session = await getServerSession(config);
  if(!session) return;
  
  const user = session.user;


  async function checkDBforUser(){
    const userObj = {
      username:`${user.name}`,
      email:`${user.email}`,
      password:'google',
      isactive:true,
      clerk_id:user.id
    }
    console.log()
    console.log('user id: ', user)
    userCreationFlow(user);

  }
  

    //check if user exist in db
    //else create user in db
    
    checkDBforUser()
  
  return (
    <></>
  )
}
