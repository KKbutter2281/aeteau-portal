'use client'

import { useSession } from 'next-auth/react'
import ApplicantDashboard from '../components/ApplicantDashboard'
import StaffDashboard from '../components/StaffDashboard'
import AdminDashboard from '../components/AdminDashboard'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please log in to access the dashboard.</div>
  }

  switch (session.user.role) {
    case 'applicant':
      return <ApplicantDashboard />
    case 'staff':
      return <StaffDashboard />
    case 'admin':
      return <AdminDashboard />
    default:
      return <div>Invalid user role.</div>
  }
}

