'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Application {
  id: string
  program: string
  status: string
}

interface FinancialAidApplication {
  id: string
  status: string
}

export function StaffDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [financialAidApplications, setFinancialAidApplications] = useState<FinancialAidApplication[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/api/applications/all')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    }

    const fetchFinancialAidApplications = async () => {
      const response = await fetch('/api/financial-aid/all')
      if (response.ok) {
        const data = await response.json()
        setFinancialAidApplications(data)
      }
    }

    fetchApplications()
    fetchFinancialAidApplications()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length > 0 ? (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li key={app.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{app.program}</h3>
                  <p>Status: {app.status}</p>
                  <Link href={`/application/${app.id}/review`} className="text-blue-500">
                    Review Application
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications to review.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Aid Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {financialAidApplications.length > 0 ? (
            <ul className="space-y-4">
              {financialAidApplications.map((app) => (
                <li key={app.id} className="border p-4 rounded">
                  <h3 className="font-semibold">Financial Aid Application</h3>
                  <p>Status: {app.status}</p>
                  <Link href={`/financial-aid/${app.id}/review`} className="text-blue-500">
                    Review Financial Aid Application
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No financial aid applications to review.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

