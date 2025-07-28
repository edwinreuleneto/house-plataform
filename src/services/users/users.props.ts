export interface CreateUserDTO {
  id?: string
  name: string
  email: string
  password: string
  phone: string
  active: boolean
  externalActive: boolean
  birthday: string
  id_access_level: string
  thumb: string;
  access_token: string;
  thumbnail?: UserThumbnailProps
  access_level: UserAccessLevel,
}

export interface UserSessionProps {
  user: UserSimpleProps,
  access_level: UserAccessLevel,
  access_token: string,
  role: string;
}

export interface UserSimpleProps {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export interface AccessLevelConfig {
  key: string;
  active: boolean;
}

export interface UserAccessLevel {
  id: string;
  name: string;
  config?: AccessLevelConfig[];
}

export interface UserThumbnailProps {
  url: string;
}
export interface User {
  id: string
  email: string | null
  firebaseUid: string
  name: string
  givenName: string
  surname: string
  userPrincipalName: string
  externalActive: boolean
  department: string
  officeLocation: string
  phone: string
  threadId: string
  firstAccess: boolean
  departament: string
  provider: string
  active: boolean
  jobTitle?: string | null
  photo?: UserThumbnailProps | null
}

export interface GetUsersFilters {
  email?: string
  active?: boolean
  page?: number
  limit?: number
}

export interface GetUsersResponse {
  data: User[]
  page: number
  totalPages: number
}

