const topics = [
  {
    name: "Renovação de contratos",
    description:
      "Conversas frequentes sobre vencimentos de contratos e alertas para início do processo de renovação com fornecedores e clientes.",
  },
  {
    name: "Férias e ausências",
    description:
      "Solicitações de férias, coberturas temporárias e dúvidas sobre políticas de ausência lideram os questionamentos.",
  },
  {
    name: "Follow-up de reuniões",
    description:
      "Acompanhamento de pautas discutidas em reuniões e envio de resumos automáticos têm sido temas recorrentes.",
  },
  {
    name: "Organização de arquivos",
    description:
      "Muitos usuários pediram ajuda para localizar documentos, centralizar versões e organizar pastas por projeto.",
  },
  {
    name: "Indicadores de performance",
    description:
      "Dúvidas e insights sobre metas, OKRs e KPIs demonstram interesse crescente em acompanhar a performance da equipe.",
  },
  {
    name: "Relatórios automáticos",
    description:
      "A geração e o agendamento de relatórios por e-mail ou WhatsApp foi um dos assuntos mais mencionados.",
  },
]

const PopularTopics = () => {
  return (
    <>
      <div className="lg:mx-0 text-left mx-auto">
        <h2 className="text-pretty text-3xl font-normal tracking-tight text-gray-900 sm:text-3xl">
          Assuntos mais falados
        </h2>
      </div>
      <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.name}>
            <dt className="font-semibold text-gray-900">{topic.name}</dt>
            <dd className="mt-1 text-gray-600">{topic.description}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default PopularTopics
