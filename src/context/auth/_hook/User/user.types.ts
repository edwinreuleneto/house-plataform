import { UserSessionProps } from "@/services/users/users.props";

export interface HookUserSession {
  user: UserSessionProps;
  isLoadingUser: boolean;
}