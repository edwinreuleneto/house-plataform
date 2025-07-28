import { useAuth } from "../.."
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Types
import { HookUserSession } from "./user.types"
import { UserSessionProps } from "@/services/users/users.props"

export const useAuthenticatedUser = (): HookUserSession => {
  const { user, isLoadingUser } = useAuth()
  const router = useRouter()

  const [safeUser, setSafeUser] = useState<UserSessionProps | null>(null)

  useEffect(() => {
    if (!isLoadingUser) {
      if (!user) {
        router.replace('/')
      } else {
        setSafeUser(user)
      }
    }
  }, [user, isLoadingUser, router])

  if (isLoadingUser || !safeUser) {
    return {
      user: {} as UserSessionProps,
      isLoadingUser: true,
    }
  }

  return {
    user: safeUser,
    isLoadingUser: false,
  }
}
