"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { applicationQuestions } from "@/lib/application-questions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewApplication() {
  const { data: session } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user.id) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          ...formData,
        }),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        console.error("Error submitting application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {applicationQuestions.map((question) => (
          <div key={question.id}>
            <label htmlFor={question.id} className="block mb-1">
              {question.label}
            </label>
            {question.type === "text" || question.type === "email" || question.type === "date" ? (
              <Input
                type={question.type}
                id={question.id}
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required={question.required}
              />
            ) : question.type === "textarea" ? (
              <Textarea
                id={question.id}
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                required={question.required}
              />
            ) : question.type === "select" ? (
              <Select
                value={formData[question.id] || ""}
                onValueChange={(value) => handleInputChange(question.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}

