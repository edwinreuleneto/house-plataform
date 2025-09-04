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

  const API_URL = String(process.env.API_URL || '').replace(/\/$/, '')
  const API_PREFIX = String(process.env.API_PREFIX || '')
    .replace(/^\/*/, '/')
    .replace(/\/$/, '')

  const path = url.startsWith('/') ? url : `/${url}`
  const base = `${API_URL}${API_PREFIX}`

  const tryFetch = async (fullPath: string) => {
    const fullUrl = `${base}${fullPath}`
    const res = await fetch(fullUrl, requestOptions)
    return { res, fullUrl }
  }

  try {
    // 1ª tentativa: caminho informado
    let { res, fullUrl } = await tryFetch(path)

    // Fallback automático: se 404 e não tem prefixo '/api', tenta novamente com '/api'
    if (res.status === 404 && !path.startsWith('/api/')) {
      const fallbackPath = `/api${path}`
      const fallback = await tryFetch(fallbackPath)
      if (fallback.res.ok) {
        return fallback.res.json()
      }
      // Se o fallback também falhar, lança erro incluindo as duas URLs testadas
      throw new Error(
        `Erro 404 nas URLs: ${fullUrl} e ${fallback.fullUrl}. Verifique se o prefixo global da API está correto (ex.: API_PREFIX=/api).`
      )
    }

    if (!res.ok) {
      throw new Error(`Erro na requisição (${res.status}): ${res.statusText} — URL: ${fullUrl}`)
    }

    return res.json()
  } catch (error) {
    throw error
  }
}

export { api }
