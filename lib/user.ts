import { put, get } from '@vercel/blob';

export async function putBlobData(path: string, data: any, options = { access: 'private' }) {
  // Upload data to Vercel Blob
  const response = await put(`https://blob-service-url/${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, access: options.access }),
  });

  if (!response.ok) {
    throw new Error(`Failed to upload data to ${path}`);
  }

  return response.json();
}

export async function getBlobData(path: string) {
  // Retrieve data from Vercel Blob
  const response = await get(`https://blob-service-url/${path}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${path}`);
  }

  return response.json();
}

export async function createUser(email: string, password: string, role: string) {
  // Implementation for creating a user
  const userServiceUrl = 'https://your-valid-service-url';
  const response = await fetch(`${userServiceUrl}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}
