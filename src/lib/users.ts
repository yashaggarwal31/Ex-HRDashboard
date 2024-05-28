'use server'
import { notFound } from 'next/navigation'
import { dbConnect } from './renderDB'
import { Database } from '@/types/database.types'

export async function getUserFromDb (email, password) {
  const query = {
    text: `select u.id, u.username, u.email, r.rolename
        from users u
        left join userrole_mapping um
        on u.id = um.user_id
        left join roles r
        on um.role_id = r.id
        where u.email=$1 and password=$2;`,
    values: [email, password]
  }

  const client = await dbConnect()
  const data = await client.query(query)
  if (data.rowCount > 0) {
    return data.rows
  } else {
    notFound()
  }
}

export async function getAllUsers () {
  const query = `
    select users.id, users.username, users.email, roles.rolename, groups.groupname, category.categoryname, um.can_create_survey
    from userrole_mapping um
    left join users on users.id = um.user_id
    left join roles on roles.id = um.role_id
    left join groups on groups.id = um.group_id
    left join category on category.id = um.category_id
    where users.isActive = true;`

  const client = await dbConnect()

  const result = await client.query(query)
  if (result.rowCount > 0) {
    return result.rows
  } else {
    notFound()
  }
}

export async function getAllUsersToAssign () {
  const query = `select u.id, u.username, u.email from users u;`
  const client = await dbConnect()
  const data = await client.query(query)
  if (data.rowCount > 0) {
    return data.rows
  } else {
    notFound()
  }
}

export async function getUserById (id: number) {
  const query = {
    text: `
        select users.id, users.username, users.email, roles.rolename, groups.groupname, category.categoryname, um.can_create_survey
        from userrole_mapping um
        left join users on users.id = um.user_id
        left join roles on roles.id = um.role_id
        left join groups on groups.id = um.group_id
        left join category on category.id = um.category_id
        where users.isActive = true and users.id=$1`,
    values: [id]
  }

  const client = await dbConnect()

  const result = await client.query(query)
  if (result.rowCount > 0) {
    return result.rows
  } else {
    notFound()
  }
}

export async function updateUserRoleMapping (user) {
  const query = {
    text: `update userrole_mapping
    set role_id=$1, group_id=$2, category_id=$3,can_create_survey=$4
    where user_id=$5`,
    values: [
      user.role_id,
      user.group_id,
      user.category_id,
      user.can_create_survey,
      user.user_id
    ]
  }

  try {
    const client = await dbConnect()

    const result = await client.query(query)
  } catch (ex) {
    console.log(ex)
    notFound()
  }
}

export async function getUsersFormData () {
  const client = await dbConnect()

  const roles_query = `select * from roles`
  const roles = await client.query(roles_query)

  const groups_query = `select * from groups`
  const groups = await client.query(groups_query)

  const categories_query = `select * from category`
  const categories = await client.query(categories_query)

  return {
    roles: roles.rows,
    groups: groups.rows,
    categories: categories.rows
  }
}

export async function createUser (userData) {
  const client = await dbConnect()

  const query = {
    text: 'insert into users (username, email, password, isactive, clerk_id) values ($1, $2, $3, $4, $5)',
    values: [
      userData.username,
      userData.email,
      userData.password,
      userData.isactive,
      userData.clerk_id
    ]
  }
  const result = await client.query(query)
  // client.end()
  return result.rows
}

export async function checkUserExistence (userId) {
  const client = await dbConnect()

  const query = {
    text: 'select clerk_id from users where clerk_id=$1',
    values: [userId]
  }
  const result = await client.query(query)
  if (result.rows.length == 0) return false
  else {
    console.log('user already exists')
    return true
  }
}

async function createUserInDB (user) {
  if (!user) return
  const userObj = {
    username: `${user.name}`,
    email: `${user.email}`,
    password: 'google',
    isactive: true,
    clerk_id: user.id
  }
  console.log(userObj)
  createUser(userObj)
}

export async function userCreationFlow (user) {
  if (!user) {
    console.log('user does not exist')
  }
  const userExists = await checkUserExistence(user.id)
  if (!userExists) {
    createUserInDB(user)
    return 'creating user'
  }
}

export async function getUserIdFromClerkId (clerkId) {
  const client = await dbConnect()

  const query = {
    text: 'select id from "users" where clerk_id=$1',
    values: [clerkId]
  }

  const result = await client.query(query)

  if (result.rows[0].id == null) return 1

  return result.rows[0].id
}

export async function checkUserPermissionForSurvey (surveyID, userID) {
  if (userID == null) return notFound()
  const client = await dbConnect()
  const user_id = await getUserIdFromClerkId(userID)
  console.log('permission actual user id: ', user_id)
  const nullCheck = await client.query({
    text: `select category from surveys where id=$1`,
    values: [surveyID]
  })

  if (nullCheck.rows[0]?.category == null) return true

  const query = {
    text: `select urm.id 
    from userrole_mapping urm
    join surveys s on s.category = urm.group_id
    where urm.user_id = $1  and s.id = $2
    `,
    values: [user_id, surveyID]
  }

  const result = await client.query(query)
  console.log('***************this is result', result)
  if (result.rowCount > 0) {
    return true
  } else {
    return false
  }
}
