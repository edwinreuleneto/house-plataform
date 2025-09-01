"use client"

// Dependencies
import dynamic from "next/dynamic"

// DTOs
import type { DashboardTimeSeriesResponse } from "@/services/dashboard/dashboard.dto"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface TimeSeriesChartProps {
  data: DashboardTimeSeriesResponse
}

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  const categories = data.created.map(p => p.t)
  const series = [
    { name: "Created", data: data.created.map(p => p.c) },
    { name: "Published", data: data.published.map(p => p.c) },
  ]

  const options = {
    chart: { toolbar: { show: false }, id: "dashboard-timeseries" },
    stroke: { curve: "smooth" },
    xaxis: { categories },
    theme: { mode: 'light' },
  }

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <Chart type="line" options={options} series={series} height={300} />
    </div>
  )
}

export default TimeSeriesChart
