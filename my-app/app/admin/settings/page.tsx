'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminSettings() {
  const [applicationDeadline, setApplicationDeadline] = useState('')
  const [questionTemplate, setQuestionTemplate] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setApplicationDeadline(data.applicationDeadline)
        setQuestionTemplate(data.questionTemplate)
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationDeadline, questionTemplate }),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      console.error('Error updating settings')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="applicationDeadline" className="block mb-1">Application Deadline</label>
          <input
            type="date"
            id="applicationDeadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="questionTemplate" className="block mb-1">Question Template</label>
          <textarea
            id="questionTemplate"
            value={questionTemplate}
            onChange={(e) => setQuestionTemplate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={10}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </form>
    </div>
  )
}

