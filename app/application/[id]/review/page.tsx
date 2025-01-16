'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ReviewApplication({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState(null)
  const [decision, setDecision] = useState('')
  const [comment, setComment] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchApplication = async () => {
      const response = await fetch(`/api/applications/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setApplication(data)
      }
    }

    fetchApplication()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/applications/${params.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, comment }),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      console.error('Error submitting review')
    }
  }

  if (!application) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Review Application</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{application.program}</h2>
        <p><strong>Personal Statement:</strong></p>
        <p className="mt-2">{application.personalStatement}</p>
        {application.transcriptUrl && (
          <a href={application.transcriptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">
            View Transcript
          </a>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="decision" className="block mb-1">Decision</label>
          <select
            id="decision"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a decision</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="more_info">Request More Information</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-1">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={5}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  )
}

