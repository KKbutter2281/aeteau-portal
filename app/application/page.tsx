"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dateOfBirth: z.string(),
  address: z.string().min(5),
  highSchool: z.string().min(2),
  gpa: z.number().min(0).max(4),
  satScore: z.number().min(400).max(1600).optional(),
  actScore: z.number().min(1).max(36).optional(),
  essay: z.string().min(100).max(1000),
})

export default function ApplicationForm() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Application submitted",
          description: "Your application has been successfully submitted",
        })
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">College Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input {...register("firstName")} />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input {...register("lastName")} />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea {...register("address")} />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>
        <div>
          <Label htmlFor="highSchool">High School</Label>
          <Input {...register("highSchool")} />
          {errors.highSchool && <p className="text-red-500">{errors.highSchool.message}</p>}
        </div>
        <div>
          <Label htmlFor="gpa">GPA</Label>
          <Input type="number" step="0.01" {...register("gpa", { valueAsNumber: true })} />
          {errors.gpa && <p className="text-red-500">{errors.gpa.message}</p>}
        </div>
        <div>
          <Label htmlFor="satScore">SAT Score (optional)</Label>
          <Input type="number" {...register("satScore", { valueAsNumber: true })} />
          {errors.satScore && <p className="text-red-500">{errors.satScore.message}</p>}
        </div>
        <div>
          <Label htmlFor="actScore">ACT Score (optional)</Label>
          <Input type="number" {...register("actScore", { valueAsNumber: true })} />
          {errors.actScore && <p className="text-red-500">{errors.actScore.message}</p>}
        </div>
        <div>
          <Label htmlFor="essay">Personal Essay</Label>
          <Textarea {...register("essay")} />
          {errors.essay && <p className="text-red-500">{errors.essay.message}</p>}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}

