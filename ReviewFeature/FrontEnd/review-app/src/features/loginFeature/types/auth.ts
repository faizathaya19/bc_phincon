export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  fullname: string
  username: string
  email: string
  password: string
  phone_number: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
