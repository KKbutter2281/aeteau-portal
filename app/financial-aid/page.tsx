'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function FinancialAidApplication() {
  const { data: session } = useSession()
  const router = useRouter()
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user.id) return

    const response = await fetch('/api/financial-aid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, income, expenses, additionalInfo }),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      console.error('Error submitting financial aid application')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Financial Aid Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="income" className="block mb-1">Annual Income</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="expenses" className="block mb-1">Annual Expenses</label>
          <input
            type="number"
            id="expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="additionalInfo" className="block mb-1">Additional Information</label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={5}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Financial Aid Application
        </button>
      </form>
    </div>
  )
}

