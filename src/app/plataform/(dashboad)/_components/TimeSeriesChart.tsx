'use client'

import dynamic from 'next/dynamic'
import type { ApexOptions } from 'apexcharts'
import React from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Series = { name: string; data: number[] }[]
type CurveSingle = 'smooth' | 'straight' | 'stepline' | 'linestep' | 'monotoneCubic'
type StrokeCurve = CurveSingle | CurveSingle[]

interface TimeSeriesChartProps {
  categories: string[]
  series: Series
  height?: number
  themeMode?: 'light' | 'dark'
  curve?: StrokeCurve
  id?: string
  type?: 'line' | 'area' | 'bar'
  colors?: string[]
}

export default function TimeSeriesChart({
  categories,
  series,
  height = 300,
  themeMode = 'light',
  curve = 'smooth',
  id = 'timeseries',
  type = 'area',
  colors,
}: TimeSeriesChartProps) {
  const options = {
    chart: {
      id,
      toolbar: { show: false },
    },
    stroke: {
      curve,
      width: 2,
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      labels: { rotateAlways: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${Math.round(val)}`,
      },
    },
    fill: type === 'area' ? {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    } : undefined,
    legend: { show: true },
    tooltip: { shared: true },
    theme: {
      mode: themeMode,
    },
    colors,
  } satisfies ApexOptions

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <Chart type={type} options={options} series={series} height={height} />
    </div>
  )
}
