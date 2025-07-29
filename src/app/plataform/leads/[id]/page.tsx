'use client'

// Dependencies
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

// Components
import Skeleton from '@/components/catalyst/skeleton'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst/description-list'

// Services
import { GetLead } from '@/services/leads'

// Types
import type { Lead } from '@/services/leads/leads.props'

const LeadDetailPage = () => {
  const params = useParams()
  const id = params?.id as string

  const { data, isFetching } = useQuery<Lead>(['lead', id], () => GetLead(id), { enabled: !!id })

  if (isFetching) return <Skeleton className="h-48 w-full" />
  if (!data) return null

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Lead {data.orderID}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">Detalhes completos do lead</p>
      </div>

      <DescriptionList className="bg-white rounded-md border border-gray-100 p-6">
        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>{data.status}</DescriptionDetails>
        {data.initialValue !== undefined && (
          <>
            <DescriptionTerm>Initial Value</DescriptionTerm>
            <DescriptionDetails>{data.initialValue.toFixed(2)}</DescriptionDetails>
          </>
        )}
        <DescriptionTerm>Total</DescriptionTerm>
        <DescriptionDetails>${data.total.toFixed(2)}</DescriptionDetails>
        {data.discount !== undefined && (
          <>
            <DescriptionTerm>Discount</DescriptionTerm>
            <DescriptionDetails>{data.discount.toFixed(2)}</DescriptionDetails>
          </>
        )}
        <DescriptionTerm>Product</DescriptionTerm>
        <DescriptionDetails>{data.productType}</DescriptionDetails>
        {data.name && (
          <>
            <DescriptionTerm>Name</DescriptionTerm>
            <DescriptionDetails>{data.name}</DescriptionDetails>
          </>
        )}
        {data.email && (
          <>
            <DescriptionTerm>Email</DescriptionTerm>
            <DescriptionDetails>{data.email}</DescriptionDetails>
          </>
        )}
        {data.phone && (
          <>
            <DescriptionTerm>Phone</DescriptionTerm>
            <DescriptionDetails>{data.phone}</DescriptionDetails>
          </>
        )}
        <DescriptionTerm>Address</DescriptionTerm>
        <DescriptionDetails>{data.address.formatedAddress}</DescriptionDetails>
        {data.invoiceStatus && (
          <>
            <DescriptionTerm>Invoice Status</DescriptionTerm>
            <DescriptionDetails>{data.invoiceStatus}</DescriptionDetails>
          </>
        )}
        {data.statusPayment && (
          <>
            <DescriptionTerm>Status Payment</DescriptionTerm>
            <DescriptionDetails>{data.statusPayment}</DescriptionDetails>
          </>
        )}
        {data.invoiceStartDate && (
          <>
            <DescriptionTerm>Invoice Start Date</DescriptionTerm>
            <DescriptionDetails>
              {new Date(data.invoiceStartDate).toLocaleDateString()}
            </DescriptionDetails>
          </>
        )}
        {data.invoiceDueDate && (
          <>
            <DescriptionTerm>Invoice Due Date</DescriptionTerm>
            <DescriptionDetails>
              {new Date(data.invoiceDueDate).toLocaleDateString()}
            </DescriptionDetails>
          </>
        )}
      </DescriptionList>

      {data.property?.[0]?.image && (
        <img
          src={data.property[0].image}
          alt="Property"
          className="rounded-md border border-gray-200"
        />
      )}

      <iframe
        title="map"
        src={`https://maps.google.com/maps?q=${data.address.latitude},${data.address.longitude}&z=15&output=embed`}
        className="w-full h-60 rounded-md border border-gray-200"
        loading="lazy"
      />
    </section>
  )
}

export default LeadDetailPage
