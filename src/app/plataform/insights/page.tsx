"use client";

// Dependencies
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "lucide-react";

const insights = [
  {
    id: 1,
    title:
      "O time de vendas reduziu em 23% o tempo de resposta a clientes nas últimas 2 semanas.",
    date: "2025-07-28T09:00Z",
  },
  {
    id: 2,
    title:
      "Contrato da XYZ expira em 7 dias e ainda não há movimentação para renovação.",
    date: "2025-07-27T08:15Z",
  },
  {
    id: 3,
    title:
      "Baseado nos dados atuais, há 72% de chance de atraso no projeto “Nova Plataforma”.",
    date: "2025-07-26T15:30Z",
  },
];

export default function PageInsights() {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-medium">Insights</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Análises geradas automaticamente pela Houser
          </p>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100 bg-white table-auto text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              <th scope="col" className="px-6 py-4 text-left">
                Título
              </th>
              <th className="px-6 py-4 text-left">Data de criação</th>
              <th className="px-6 py-4 text-right w-14">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {insights.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-800 truncate">
                    {item.title}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <time className="text-slate-600" dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </td>
                <td className="px-6 py-4 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="text-gray-500 hover:text-gray-900">
                      <span className="sr-only">Abrir opções</span>
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Ver detalhes
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Excluir
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
