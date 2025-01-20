import { putBlobData, getBlobData } from '@/lib/blob-storage'
import { hashPassword } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function createUser(email: string, password: string, role: string) {
  try {
    const hashedPassword = await hashPassword(password)
    const userId = uuidv4()
    const user = { id: userId, email, password: hashedPassword, role }
    await putBlobData(`users/${userId}`, user)
    return user
  } catch (err) {
    console.error('Error creating user:', err)
    throw err
  }
}

export async function getUserByEmail(email: string) {
  try {
    const users = await getBlobData('users/')
    return users.find(user => user.email === email) || null
  } catch (err) {
    console.error('Error getting user by email:', err)
    throw err
  }
}

