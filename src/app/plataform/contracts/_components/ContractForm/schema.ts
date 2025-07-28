import * as z from 'zod'

const ContractSchema = z.object({
  companyName: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  website: z.string().url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  startDate: z.string().min(1, { message: 'Required' }),
  endDate: z.string().min(1, { message: 'Required' }),
  attachmentIds: z.array(z.string()).optional(),
})

export default ContractSchema
