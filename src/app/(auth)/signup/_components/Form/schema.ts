import * as z from 'zod'

const SignUpSchema = z.object({
  name: z.string().min(1, { message: 'Informe seu nome' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres' }),
})

export default SignUpSchema
