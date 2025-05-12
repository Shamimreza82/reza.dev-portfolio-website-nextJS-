"use server"

  // Login function
  export const login = async (email: string, password: string) => {

    try {
      const response = await fetch("http://localhost:3000/api/vi/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log(response)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      throw error
    } finally {

    }
  }
