// Dependencies
import { api } from '../api'

// DTOs
import {
  overviewSchema,
  timeseriesSchema,
  tagListSchema,
  authorListSchema,
  estimateTimeseriesSchema,
  readsTimeseriesSchema,
  totalReadsSchema,
  accessLast30Schema,
  topReadSchema,
  type DashboardOverview,
  type DashboardTimeSeriesResponse,
  type DashboardTag,
  type DashboardAuthor,
  type EstimateTimeSeriesResponse,
  type ReadsTimeSeriesResponse,
  type TotalReadsResponse,
  type AccessLast30Response,
  type TopReadItem,
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

const GetEstimateTimeseries = async (params: { range?: string; interval?: 'day' | 'week' | 'month' }): Promise<EstimateTimeSeriesResponse> => {
  const search = new URLSearchParams()
  if (params?.range) search.append('range', params.range)
  if (params?.interval) search.append('interval', params.interval)
  const query = search.size ? `?${search.toString()}` : ''
  const res = await api(`/dashboard/estimates/timeseries${query}`, { method: 'GET' })
  return estimateTimeseriesSchema.parse(res)
}

const GetDashboardReadsTimeseries = async (params: { range?: string; interval?: 'day' | 'week' | 'month' }): Promise<ReadsTimeSeriesResponse> => {
  const search = new URLSearchParams()
  if (params?.range) search.append('range', params.range)
  if (params?.interval) search.append('interval', params.interval)
  const query = search.size ? `?${search.toString()}` : ''
  const res = await api(`/dashboard/reads/timeseries${query}`, { method: 'GET' })
  return readsTimeseriesSchema.parse(res)
}

const GetDashboardTotalReads = async (): Promise<TotalReadsResponse> => {
  const res = await api(`/dashboard/reads`, { method: 'GET' })
  return totalReadsSchema.parse(res)
}

const GetDashboardAccessLast30 = async (): Promise<AccessLast30Response> => {
  const res = await api(`/dashboard/access/last-30`, { method: 'GET' })
  return accessLast30Schema.parse(res)
}

const GetDashboardTopRead = async (params?: { limit?: number; range?: string }): Promise<TopReadItem[]> => {
  const search = new URLSearchParams()
  if (params?.limit) search.append('limit', String(params.limit))
  if (params?.range) search.append('range', params.range)
  const query = search.size ? `?${search.toString()}` : ''
  const res = await api(`/dashboard/top-read${query}`, { method: 'GET' })
  return topReadSchema.parse(res)
}

export {
  GetDashboardOverview,
  GetDashboardTimeseries,
  GetDashboardTopTags,
  GetDashboardTopAuthors,
  GetEstimateTimeseries,
  GetDashboardReadsTimeseries,
  GetDashboardTotalReads,
  GetDashboardAccessLast30,
  GetDashboardTopRead,
}
