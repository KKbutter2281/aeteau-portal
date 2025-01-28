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
  annualIncome: z.number().min(0),
  householdSize: z.number().min(1),
  otherAid: z.number().min(0),
  specialCircumstances: z.string().optional(),
})

export default function FinancialAidForm() {
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
      const response = await fetch("/api/financial-aid/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Financial aid application submitted",
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
      <h1 className="text-2xl font-bold mb-4">Financial Aid Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="annualIncome">Annual Household Income</Label>
          <Input type="number" {...register("annualIncome", { valueAsNumber: true })} />
          {errors.annualIncome && <p className="text-red-500">{errors.annualIncome.message}</p>}
        </div>
        <div>
          <Label htmlFor="householdSize">Household Size</Label>
          <Input type="number" {...register("householdSize", { valueAsNumber: true })} />
          {errors.householdSize && <p className="text-red-500">{errors.householdSize.message}</p>}
        </div>
        <div>
          <Label htmlFor="otherAid">Other Financial Aid or Scholarships</Label>
          <Input type="number" {...register("otherAid", { valueAsNumber: true })} />
          {errors.otherAid && <p className="text-red-500">{errors.otherAid.message}</p>}
        </div>
        <div>
          <Label htmlFor="specialCircumstances">Special Circumstances (optional)</Label>
          <Textarea {...register("specialCircumstances")} />
          {errors.specialCircumstances && <p className="text-red-500">{errors.specialCircumstances.message}</p>}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Financial Aid Application"}
        </Button>
      </form>
    </div>
  )
}

