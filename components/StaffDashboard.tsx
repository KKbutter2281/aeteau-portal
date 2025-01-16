'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StaffDashboard() {
  const [applications, setApplications] = useState([])
  const [financialAidApplications, setFinancialAidApplications] = useState([])

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
      <h2 className="text-xl font-semibold mt-8 mb-4">All Applications</h2>
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
      <h2 className="text-xl font-semibold mt-8 mb-4">Financial Aid Applications</h2>
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
    </div>
  )
}

