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
}

export default function TimeSeriesChart({
  categories,
  series,
  height = 300,
  themeMode = 'light',
  curve = 'smooth',
  id = 'timeseries',
}: TimeSeriesChartProps) {
  const options = {
    chart: {
      id,
      toolbar: { show: false },
    },
    stroke: {
      curve,
    },
    xaxis: {
      categories,
    },
    theme: {
      mode: themeMode,
    },
  } satisfies ApexOptions

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
      <Chart type="line" options={options} series={series} height={height} />
    </div>
  )
}
