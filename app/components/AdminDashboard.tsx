'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    }

    fetchStats()
  }, [])

  if (!stats) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Applications</h2>
          <p className="text-3xl font-bold">{stats.totalApplications}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Approved Applications</h2>
          <p className="text-3xl font-bold">{stats.approvedApplications}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Rejected Applications</h2>
          <p className="text-3xl font-bold">{stats.rejectedApplications}</p>
        </div>
      </div>
      <Link href="/admin/settings" className="bg-blue-500 text-white px-4 py-2 rounded">
        Manage Settings
      </Link>
    </div>
  )
}

