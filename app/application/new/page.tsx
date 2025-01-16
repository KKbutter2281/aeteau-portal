'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function NewApplication() {
  const { data: session } = useSession()
  const router = useRouter()
  const [program, setProgram] = useState('')
  const [personalStatement, setPersonalStatement] = useState('')
  const [transcript, setTranscript] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user.id) return

    const formData = new FormData()
    formData.append('userId', session.user.id)
    formData.append('program', program)
    formData.append('personalStatement', personalStatement)
    if (transcript) {
      formData.append('transcript', transcript)
    }

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      console.error('Error submitting application')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="program" className="block mb-1">Program</label>
          <input
            type="text"
            id="program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="personalStatement" className="block mb-1">Personal Statement</label>
          <textarea
            id="personalStatement"
            value={personalStatement}
            onChange={(e) => setPersonalStatement(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="transcript" className="block mb-1">Transcript</label>
          <input
            type="file"
            id="transcript"
            onChange={(e) => setTranscript(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx"
            className="w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  )
}

