'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

import Skeleton from '@/components/catalyst/skeleton'
import { Badge } from '@/components/catalyst/badge'
import { Subheading } from '@/components/catalyst/heading'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst/description-list'

import { GetLead } from '@/services/leads'
import type { Lead } from '@/services/leads/leads.props'
import { DollarSign, Coins, Percent, Package, Mail, Phone, MapPin, CalendarDays } from 'lucide-react'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const formatPhone = (value: string) =>
  value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')

const LeadDetailPage = () => {
  const params = useParams()
  const id = params?.id as string

  const { data, isFetching } = useQuery<Lead>(['lead', id], () => GetLead(id), { enabled: !!id })

  if (isFetching) return <Skeleton className="h-48 w-full" />
  if (!data) return null

  const Card = ({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={`bg-white rounded-lg ring-1 ring-gray-200 shadow-xs ${className}`}>{children}</div>
  )

  const Section = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Subheading>{title}</Subheading>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      {children}
    </div>
  )

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Lead {data.orderID}</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
              <MapPin className="h-3.5 w-3.5" /> {data.address?.city || 'Location'}
            </span>
            {data.productType && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
                <Package className="h-3.5 w-3.5" /> {data.productType}
              </span>
            )}
          </div>
        </div>
        <Badge color="blue" className="capitalize text-xs px-2.5 py-1 rounded-md">{data.status}</Badge>
      </div>

      {/* Extract layout: media left, data right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: media */}
        <div className="space-y-4 lg:sticky lg:top-20">
          <Card className="overflow-hidden">
            {data.property?.[0]?.image ? (
              <img src={data.property[0].image} alt="Property" className="w-full h-56 object-cover" />
            ) : (
              <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
            )}
            <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[11px] text-gray-500">Type</p>
                <p className="text-gray-900">{data.property?.[0]?.propertyType || '-'}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Living Area</p>
                <p className="text-gray-900">{data.property?.[0]?.livingAreaValue ?? '-'}</p>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="p-3 flex items-start gap-2 border-b border-gray-100">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-[11px] text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-900">{data.address?.formatedAddress}</p>
                <p className="text-[11px] text-gray-400">{data.address.latitude}, {data.address.longitude}</p>
              </div>
            </div>
            <iframe title="map" src={`https://maps.google.com/maps?q=${data.address.latitude},${data.address.longitude}&z=15&output=embed`} className="w-full h-52" loading="lazy" />
          </Card>
        </div>

        {/* Right: data */}
        <div className="lg:col-span-2 space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <Card className="p-3"><div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 ring-1 ring-gray-200"><DollarSign className="h-4 w-4 text-slate-600" /></span><div><p className="text-[11px] text-gray-500">Total</p><p className="text-base font-semibold text-gray-900">{formatCurrency(data.total)}</p></div></div></Card>
            <Card className="p-3"><div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 ring-1 ring-gray-200"><Coins className="h-4 w-4 text-slate-600" /></span><div><p className="text-[11px] text-gray-500">Initial</p><p className="text-base font-semibold text-gray-900">{data.initialValue !== undefined ? formatCurrency(data.initialValue) : '-'}</p></div></div></Card>
            <Card className="p-3"><div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 ring-1 ring-gray-200"><Percent className="h-4 w-4 text-slate-600" /></span><div><p className="text-[11px] text-gray-500">Discount</p><p className="text-base font-semibold text-gray-900">{data.discount !== undefined ? formatCurrency(data.discount) : '-'}</p></div></div></Card>
            <Card className="p-3"><div className="flex items-center gap-2"><span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-50 ring-1 ring-gray-200"><Package className="h-4 w-4 text-slate-600" /></span><div><p className="text-[11px] text-gray-500">Product</p><p className="text-base font-semibold text-gray-900">{data.productType || '-'}</p></div></div></Card>
          </div>

          {/* Client */}
          <Section title="Client">
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {data.name && (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-50 text-slate-700 ring-1 ring-gray-200 font-semibold">
                        {data.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-500">Name</p>
                        <p className="text-sm font-medium text-gray-900">{data.name}</p>
                      </div>
                    </div>
                  )}
                  {data.email && (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                        <Mail className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">{data.email}</p>
                      </div>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <Phone className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{formatPhone(data.phone)}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-50 text-gray-600 ring-1 ring-gray-200 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{data.address?.formatedAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Section>

          {/* Billing */}
          <Section title="Billing">
            <Card className="p-4">
              <DescriptionList>
                {data.invoiceStatus && (<><DescriptionTerm>Invoice Status</DescriptionTerm><DescriptionDetails>{data.invoiceStatus}</DescriptionDetails></>)}
                {data.statusPayment && (<><DescriptionTerm>Payment Status</DescriptionTerm><DescriptionDetails>{data.statusPayment}</DescriptionDetails></>)}
                {data.invoiceStartDate && (<><DescriptionTerm>Start Date</DescriptionTerm><DescriptionDetails className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4 text-gray-400" />{new Date(data.invoiceStartDate).toLocaleDateString('en-US')}</DescriptionDetails></>)}
                {data.invoiceDueDate && (<><DescriptionTerm>Due Date</DescriptionTerm><DescriptionDetails className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4 text-gray-400" />{new Date(data.invoiceDueDate).toLocaleDateString('en-US')}</DescriptionDetails></>)}
              </DescriptionList>
            </Card>
          </Section>

          {/* Items */}
          {data.items?.length ? (
            <Section title="Items">
              <Card className="overflow-hidden">
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-100 bg-white">
                    <thead className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                      <tr>
                        <th className="px-3 py-2 text-left">Title</th>
                        <th className="px-3 py-2 text-left">Label</th>
                        <th className="px-3 py-2 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                      {data.items.map((it) => (
                        <tr key={`${it.id}-${it.idItem}`} className="hover:bg-gray-50">
                          <td className="px-3 py-2">{it.title}</td>
                          <td className="px-3 py-2">{it.label}</td>
                          <td className="px-3 py-2">{it.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Section>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default LeadDetailPage
