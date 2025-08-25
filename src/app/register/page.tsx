import { RegisterForm } from "@/components/auth/register-form"
import type { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm">Register to get started</p>
        </div>

        <div className="mt-8 rounded-xl bg-zinc-800  p-6 shadow-lg sm:p-8">
          <RegisterForm />

          <div className="mt-6 text-center text-sm">
            <p >
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
