/* eslint-disable @typescript-eslint/no-explicit-any */
// app/form/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react'

const fields = [
  { name: 'নাম', label: 'নাম', type: 'text' },
  { name: 'name', label: '', type: 'text' },
  { name: 'পিতা/স্বামী', label: 'Monthly Income', type: 'text' },
  { name: 'মাতা', label: 'Desired Loan Amount', type: 'text' },
  { name: 'dateOfBirth', label: 'Date of birth', type: 'number' },
  { name: 'nid', label: 'Nid No', type: 'number' },
]

type FormData = {
  [key: string]: string | number ;
};

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({})




  
  const askAI = async () => {

    const res = await fetch('http://localhost:4002/public/form-fill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInput: 'I am Reza, I earn 40000 monthly and need a loan of 2 lakh.',
        context: 'Loan form with fields: fullName, income, loanAmount'
      })
    });

    const data = await res.json();
    if (data.success) {
      console.log(data)
      setFormData(prev => ({ ...prev, ...data.data.result }));
    }
  };



  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="p-6 max-w-xl mx-auto pt-24">
      <h1 className="text-xl mb-4">Loan Application</h1>
      <form onSubmit={submitData} className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              value={formData[field.name] ?? ''} 
              name={field.name}
              onChange={handleChange}
              className="w-full border rounded p-2 text-black"
            />
          </div>
        ))}
        <Button type='submit'>Submit</Button>
      </form>
      <Button onClick={askAI}>Ask Ai</Button>
    </div>
  )
}
