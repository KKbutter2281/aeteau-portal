"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const statuses = ['Submitted', 'Under Review', 'Accepted', 'Rejected']

export default function UpdateApplicationStatus({ applicationId, currentStatus }: { applicationId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const { toast } = useToast()

  const handleStatusUpdate = async () => {
    const response = await fetch(`/api/applications/${applicationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Application status updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mt-4">
      <Select onValueChange={setStatus} defaultValue={status}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleStatusUpdate} className="mt-2">Update Status</Button>
    </div>
  )
}

