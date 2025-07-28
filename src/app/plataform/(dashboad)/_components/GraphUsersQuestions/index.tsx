'use client'

// Dependencies
import React from 'react'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

// Components
import ListUserActive from './_components/ListUserActive'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const generateLast30Days = () => {
  return Array.from({ length: 30 }, (_, i) =>
    dayjs().subtract(29 - i, 'day').format('DD/MM')
  )
}

// Gera dados com leve tendência de crescimento + flutuação
const generateSmartData = () => {
  let base = 120
  return Array.from({ length: 30 }, () => {
    const variation = Math.floor(Math.random() * 30) - 10
    base += variation
    if (base < 10) base = 10
    if (base > 200) base = 200
    return base
  })
}

export const GraphUsersQuestion = () => {
  const categories = generateLast30Days()

  const series = [
    {
      name: 'Interações',
      data: generateSmartData()
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'area' as const,
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#e093c4']
    },
    grid: {
      show: false
    },
    xaxis: {
      type: 'category',
      categories,
      labels: {
        show: true,
        style: {
          colors: '#6B7280',
          fontSize: '11px'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: { format: 'dd/MM' },
    },
    legend: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: ['#daa7c7'],
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 3,
      colors: ['#c3579b'],
      strokeColors: '#fff',
      strokeWidth: 1,
      hover: { size: 6 }
    },
    colors: ['#f046b2'],
  }

  return (
    <div className="-mx-8">
      <div className='relative before:w-full '>
        <div className='relative z-1 min-h-[400px]'>
          <ReactApexChart options={options} series={series} type="area" height={400} />
        </div>
        <div className='absolute right-12 bottom-6 z-3'>
          <ListUserActive />
        </div>
      </div>
    </div>
  )
}

export default GraphUsersQuestion
