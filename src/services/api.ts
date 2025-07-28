// Dependencies
import { getCookie } from "cookies-next"

interface RequestOptions {
  method: string
  headers?: Record<string, string>
  body?: object | FormData
}

// ✅ Header fixo do tenant
const TENANT_ID_HEADER = 'TLrj0Tbegk07pWt5ew8k';

const buildApiHeaders = (): Record<string, string> => {
  const accessToken = getCookie(`${process.env.TAG_COOKIE_TOKEN}`)
  const accessUser = getCookie(`${process.env.TAG_COOKIE_USER}`)

  const headers: Record<string, string> = {
    'x-tenant-id': TENANT_ID_HEADER,
  }

  if (accessToken && accessUser) {
    const tokenStr = typeof accessToken === "string" ? accessToken : String(accessToken)
    const userStr = typeof accessUser === "string" ? accessUser : String(accessUser)

    try {
      const user = JSON.parse(userStr)
      headers['Authorization'] = `Bearer ${tokenStr}`
      if (user && user.id) {
        headers[`${process.env.TAG_COOKIE_USER}`] = user.id
      }
    } catch (error) {
      console.error("Erro ao interpretar cookie do usuário:", error)
    }
  }

  return headers
}

const api = async (url: string, options: RequestOptions) => {
  const { method = "GET", headers: customHeaders, body } = options

  const headers: Record<string, string> = {
    ...buildApiHeaders(),
    ...(customHeaders || {}),
  }

  let requestBody: string | FormData | undefined

  if (body instanceof FormData) {
    headers['X-Requested-With'] = 'XMLHttpRequest'
    // Não setamos Content-Type pois o navegador define para FormData
    requestBody = body
  } else if (body) {
    headers['Content-Type'] = 'application/json'
    requestBody = JSON.stringify(body)
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    body: requestBody,
    next: { revalidate: 3600 },
  }

  try {
    const response = await fetch(`${process.env.API_URL}${url}`, requestOptions)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}

export { api }
