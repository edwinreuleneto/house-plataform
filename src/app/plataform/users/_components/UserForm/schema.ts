import * as z from 'zod'

const UserSchema = z.object({
  name: z.string().min(1, { message: 'Informe o nome' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres' }),
})

export default UserSchema

