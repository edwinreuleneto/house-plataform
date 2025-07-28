export interface AuthFirebaseToken {
  token: string;
}

export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
  phone: string;
  threadId: string;
  provider: 'local' | 'microsoft';
  msToken?: string;
}

export interface ValidateTokenDTO {
  token: string;
}
