export interface AuthFirebaseToken {
  token: string;
}

export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
}

export interface ValidateTokenDTO {
  token: string;
}
