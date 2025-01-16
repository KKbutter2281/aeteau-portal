import { put, get } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

export async function createUser(email: string, password: string, role: string) {
  const hashedPassword = await hashPassword(password)
  const userId = uuidv4()
  const user = { id: userId, email, password: hashedPassword, role }
  await put(`users/${userId}`, JSON.stringify(user), { access: 'private' })
  return user
}

export async function getUserByEmail(email: string) {
  const { blobs } = await list({ prefix: 'users/' })
  for (const blob of blobs) {
    const user = JSON.parse(await get(blob.url))
    if (user.email === email) {
      return user
    }
  }
  return null
}

