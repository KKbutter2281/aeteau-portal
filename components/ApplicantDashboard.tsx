'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ApplicantDashboard() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState([])
  const [financialAid, setFinancialAid] = useState(null)

  useEffect(() => {
    // Fetch applications for the current user
    const fetchApplications = async () => {
      const response = await fetch(`/api/applications?userId=${session?.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    }

    // Fetch financial aid application for the current user
    const fetchFinancialAid = async () => {
      const response = await fetch(`/api/financial-aid?userId=${session?.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setFinancialAid(data)
      }
    }

    if (session?.user.id) {
      fetchApplications()
      fetchFinancialAid()
    }
  }, [session?.user.id])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Applicant Dashboard</h1>
      <Link href="/application/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Start New Application
      </Link>
      <h2 className="text-xl font-semibold mt-8 mb-4">Your Applications</h2>
      {applications.length > 0 ? (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="border p-4 rounded">
              <h3 className="font-semibold">{app.program}</h3>
              <p>Status: {app.status}</p>
              <Link href={`/application/${app.id}`} className="text-blue-500">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't started any applications yet.</p>
      )}
      <h2 className="text-xl font-semibold mt-8 mb-4">Financial Aid</h2>
      {financialAid ? (
        <div className="border p-4 rounded">
          <p>Status: {financialAid.status}</p>
          {financialAid.status === 'approved' && (
            <p>Amount Awarded: ${financialAid.amountAwarded}</p>
          )}
          <Link href={`/financial-aid/${financialAid.id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      ) : (
        <div>
          <p>You haven't applied for financial aid yet.</p>
          <Link href="/financial-aid" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 inline-block">
            Apply for Financial Aid
          </Link>
        </div>
      )}
    </div>
  )
}

