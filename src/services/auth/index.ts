// Dependencies
import { api } from '../api'

// Types
import type { AuthFirebaseToken, SignUpDTO, ValidateTokenDTO } from './auth.props'

// Services
const AuthUserToken = (token: AuthFirebaseToken) =>
  api(`/auth`, {
    method: 'POST',
    body: token,
  })

const AuthUserTokenMicrosoft = (token: AuthFirebaseToken) =>
  api(`/auth/microsoft`, {
    method: 'POST',
    body: token,
  })

const SignUpUser = (data: SignUpDTO) =>
  api('/auth/signup', {
    method: 'POST',
    body: data,
  })

const ValidateUserToken = (token: ValidateTokenDTO) =>
  api('/auth/validate', {
    method: 'POST',
    body: token,
  })

const LoginUser = (token: AuthFirebaseToken) =>
  api('/auth/login', {
    method: 'POST',
    body: token,
  })

export {
  AuthUserToken,
  AuthUserTokenMicrosoft,
  SignUpUser,
  ValidateUserToken,
  LoginUser,
}
