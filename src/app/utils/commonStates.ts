// import { currentUser } from "@clerk/nextjs/server";

let user_state = 'user'

export const setUser = () => {}

export const setUserState = (state: 'user' | 'admin') => {
  user_state = state
}

export const getUserState = () => user_state

export const getCurrentUserId = () => {}
