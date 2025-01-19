'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Application {
  id: string
  program: string
  status: string
}

interface FinancialAid {
  id: string
  status: string
  amountAwarded?: number
}

export function ApplicantDashboard() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [financialAid, setFinancialAid] = useState<FinancialAid | null>(null)

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
        </CardHeader>
        <CardContent>
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
            <p>You have not started any applications yet.</p>
          )}
          <Link href="/application/new">
            <Button className="mt-4">Start New Application</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Aid</CardTitle>
        </CardHeader>
        <CardContent>
          {financialAid ? (
            <div>
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
              <p>You have not applied for financial aid yet.</p>
              <Link href="/financial-aid">
                <Button className="mt-2">Apply for Financial Aid</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

