'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

import Skeleton from '@/components/catalyst/skeleton'
import { Badge } from '@/components/catalyst/badge'
import { Subheading } from '@/components/catalyst/heading'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst/description-list'

import { GetLead } from '@/services/leads'
import type { Lead } from '@/services/leads/leads.props'

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

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
            Lead {data.orderID}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Complete lead details
          </p>
        </div>
        <Badge color="blue" className="capitalize text-sm px-3 py-1 rounded-md">
          {data.status}
        </Badge>
      </div>

      {/* Client Info */}
      <div className="space-y-4">
        <Subheading>Client Information</Subheading>
        <div className="bg-white shadow-md ring-1 ring-gray-100 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {data.name && (
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{data.name}</p>
              </div>
            )}
            {data.email && (
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{data.email}</p>
              </div>
            )}
            {data.phone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {formatPhone(data.phone)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-900">{data.address.formatedAddress}</p>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Subheading>Financial</Subheading>
          <DescriptionList className="bg-white rounded-md shadow-sm ring-1 ring-gray-200 p-6">
            {data.productType && (
              <>
                <DescriptionTerm>Product</DescriptionTerm>
                <DescriptionDetails>{data.productType}</DescriptionDetails>
              </>
            )}
            {data.initialValue !== undefined && (
              <>
                <DescriptionTerm>Initial Value</DescriptionTerm>
                <DescriptionDetails>{formatCurrency(data.initialValue)}</DescriptionDetails>
              </>
            )}
            <DescriptionTerm>Total</DescriptionTerm>
            <DescriptionDetails>{formatCurrency(data.total)}</DescriptionDetails>
            {data.discount !== undefined && (
              <>
                <DescriptionTerm>Discount</DescriptionTerm>
                <DescriptionDetails>{formatCurrency(data.discount)}</DescriptionDetails>
              </>
            )}
          </DescriptionList>
        </div>

        <div className="space-y-4">
          <Subheading>Billing</Subheading>
          <DescriptionList className="bg-white rounded-md shadow-sm ring-1 ring-gray-200 p-6">
            {data.invoiceStatus && (
              <>
                <DescriptionTerm>Invoice Status</DescriptionTerm>
                <DescriptionDetails>{data.invoiceStatus}</DescriptionDetails>
              </>
            )}
            {data.statusPayment && (
              <>
                <DescriptionTerm>Payment Status</DescriptionTerm>
                <DescriptionDetails>{data.statusPayment}</DescriptionDetails>
              </>
            )}
            {data.invoiceStartDate && (
              <>
                <DescriptionTerm>Start Date</DescriptionTerm>
                <DescriptionDetails>
                  {new Date(data.invoiceStartDate).toLocaleDateString('en-US')}
                </DescriptionDetails>
              </>
            )}
            {data.invoiceDueDate && (
              <>
                <DescriptionTerm>Due Date</DescriptionTerm>
                <DescriptionDetails>
                  {new Date(data.invoiceDueDate).toLocaleDateString('en-US')}
                </DescriptionDetails>
              </>
            )}
          </DescriptionList>
        </div>
      </div>

      {/* Property Image */}
      {data.property?.[0]?.image && (
        <div className="space-y-2">
          <Subheading>Property Image</Subheading>
          <img
            src={data.property[0].image}
            alt="Property"
            className="w-full max-h-96 object-cover rounded-md border border-gray-200"
          />
        </div>
      )}

      {/* Map */}
      <div className="space-y-2">
        <Subheading>Map Location</Subheading>
        <iframe
          title="map"
          src={`https://maps.google.com/maps?q=${data.address.latitude},${data.address.longitude}&z=15&output=embed`}
          className="w-full h-72 rounded-md border border-gray-200"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default LeadDetailPage
