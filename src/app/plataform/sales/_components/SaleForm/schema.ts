import * as z from 'zod'

const SaleSchema = z.object({
  address: z.string().min(1, { message: 'Required' }),
  lat: z.number().optional(),
  long: z.number().optional(),
  responsibleName: z.string().min(1, { message: 'Required' }),
  phone: z.string().optional(),
})

export default SaleSchema
