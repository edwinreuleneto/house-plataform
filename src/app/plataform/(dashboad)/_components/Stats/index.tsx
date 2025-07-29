import { ArrowDown, ArrowUp } from "lucide-react";

const stats = [
  {
    name: 'Orçamentos solicitados',
    stat: '432',
    previousStat: '389',
    change: '11.1%',
    changeType: 'increase',
  },
  {
    name: 'Orçamentos aprovados',
    stat: '289',
    previousStat: '301',
    change: '4.0%',
    changeType: 'decrease',
  },
  {
    name: 'Valor total aprovado',
    stat: 'R$ 128.450',
    previousStat: 'R$ 112.300',
    change: '14.4%',
    changeType: 'increase',
  },
  {
    name: 'Tempo médio de resposta',
    stat: '1h 27min',
    previousStat: '1h 35min',
    change: '8.4%',
    changeType: 'decrease',
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