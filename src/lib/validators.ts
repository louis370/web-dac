import * as z from 'zod'

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const LoginFormSchema = z.object({
    email: z.email({error:"Veillez entrer une adresse email valide"}).trim(),
    password: z.string().min(6).max(100)
})