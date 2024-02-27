import { AxiosError } from 'axios'

export interface SuccessResponse {
  statusCode: number
  message: string
}

export interface TokenResponse {
  statusCode: number
  token: string
}

export const handleSignUpErrors = (e: unknown) => {
  if (e instanceof AxiosError) {
    return e.response?.data.message ?? []
  }
  return ['Internal Server Error']
}

export const handleSignInErrors = (e: unknown) => {
  if (e instanceof AxiosError) {
    if (e.response?.status === 401) {
      return ['Invalid Username or Password']
    }
  }
  return ['Internal Server Error']
}

// export default handleServerErrors
