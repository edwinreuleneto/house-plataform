"use client"

// Components
const Stats = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-neutral-800">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
        <p className="mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-100">0</p>
      </div>
    </div>
  )
}

export default Stats
