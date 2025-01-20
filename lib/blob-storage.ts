import { list, put, del } from '@vercel/blob'

export async function putBlobData(path: string, data: unknown) {
  try {
    const blob = await put(path, JSON.stringify(data), { access: 'private' })
    return blob
  } catch (err) {
    console.error(`Error putting blob data at ${path}:`, err)
    throw err
  }
}

export async function getBlobData(prefix: string) {
  try {
    const { blobs } = await list({ prefix })
    const data = []
    for (const blob of blobs) {
      const response = await fetch(blob.url)
      const json = await response.json()
      data.push(json)
    }
    return data
  } catch (err) {
    console.error(`Error getting blob data with prefix ${prefix}:`, err)
    throw err
  }
}

export async function deleteBlobData(path: string) {
  try {
    await del(path)
  } catch (err) {
    console.error(`Error deleting blob data at ${path}:`, err)
    throw err
  }
}

