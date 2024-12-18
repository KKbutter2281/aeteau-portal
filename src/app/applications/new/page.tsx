"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { schools } from '@/data/schools'

export default function NewApplication() {
  const [formData, setFormData] = useState({
    school: '',
    program: '',
    personalStatement: '',
  })
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      toast({
        title: "Error",
        description: "You must be signed in to submit an application.",
        variant: "destructive",
      })
      return
    }

    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userId: session.user.id,
      }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Your application has been submitted.",
      })
      router.push('/applications')
    } else {
      toast({
        title: "Error",
        description: "An error occurred while submitting your application.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="school">School</Label>
          <select
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a school</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>{school.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="program">Program</Label>
          <Input
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="personalStatement">Personal Statement</Label>
          <Textarea
            id="personalStatement"
            name="personalStatement"
            value={formData.personalStatement}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Submit Application</Button>
      </form>
    </div>
  )
}

