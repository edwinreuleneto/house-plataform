import { ArrowDown, ArrowUp } from "lucide-react";

const stats = [
  {
    name: 'Novos usuários',
    stat: '1.284',
    previousStat: '1.102',
    change: '16.5%',
    changeType: 'increase',
  },
  {
    name: 'Questionamentos',
    stat: '6.734',
    previousStat: '6.915',
    change: '2.6%',
    changeType: 'decrease',
  },
  {
    name: 'Documentos processados',
    stat: '3.981',
    previousStat: '3.127',
    change: '27.3%',
    changeType: 'increase',
  },
  {
    name: 'Emails lidos',
    stat: '2.142',
    previousStat: '1.993',
    change: '7.5%',
    changeType: 'increase',
  },
]

const Stats = () =>  {
  return (
    <div className="z-2 -mt-6 relative">
      <dl className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6 bg-white rounded-xl ring-1 ring-gray-100 shadow-xs">
            <dt className="text-sm font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-bold text-neutral-800">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">de {item.previousStat}</span>
              </div>

              <div
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-normal items-center md:mt-2 lg:mt-0 ${item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUp aria-hidden="true" className="-ml-1 mr-0.5 size-5 shrink-0 self-center text-green-300" />
                ) : (
                  <ArrowDown aria-hidden="true" className="-ml-1 mr-0.5 size-5 shrink-0 self-center text-red-300" />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Stats;