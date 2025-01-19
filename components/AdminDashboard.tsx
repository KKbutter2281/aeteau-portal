'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Stats {
  totalApplications: number
  approvedApplications: number
  rejectedApplications: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/admin/settings">
            <Button>Manage Settings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

