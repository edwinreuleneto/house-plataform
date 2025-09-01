// Dependencies
import { api } from '../api'

// DTOs
import {
  overviewSchema,
  timeseriesSchema,
  tagListSchema,
  authorListSchema,
  type DashboardOverview,
  type DashboardTimeSeriesResponse,
  type DashboardTag,
  type DashboardAuthor,
} from './dashboard.dto'

// Services
const GetDashboardOverview = async (): Promise<DashboardOverview> => {
  const res = await api('/dashboard/overview', { method: 'GET' })
  return overviewSchema.parse(res)
}

const GetDashboardTimeseries = async (params: { range?: string; interval?: 'day' | 'week' | 'month' }): Promise<DashboardTimeSeriesResponse> => {
  const search = new URLSearchParams()
  if (params?.range) search.append('range', params.range)
  if (params?.interval) search.append('interval', params.interval)
  const query = search.size ? `?${search.toString()}` : ''
  const res = await api(`/dashboard/timeseries${query}`, { method: 'GET' })
  return timeseriesSchema.parse(res)
}

const GetDashboardTopTags = async (limit?: number): Promise<DashboardTag[]> => {
  const query = limit ? `?limit=${limit}` : ''
  const res = await api(`/dashboard/top-tags${query}`, { method: 'GET' })
  return tagListSchema.parse(res)
}

const GetDashboardTopAuthors = async (limit?: number): Promise<DashboardAuthor[]> => {
  const query = limit ? `?limit=${limit}` : ''
  const res = await api(`/dashboard/top-authors${query}`, { method: 'GET' })
  return authorListSchema.parse(res)
}

export {
  GetDashboardOverview,
  GetDashboardTimeseries,
  GetDashboardTopTags,
  GetDashboardTopAuthors,
}
