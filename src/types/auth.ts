export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface AuthPayload {
  id: string
  name: string
  email: string
  iat?: number
  exp?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user?: Omit<User, "password">
  token?: string
}
