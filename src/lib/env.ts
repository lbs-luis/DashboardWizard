import { z } from 'zod'

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.coerce.number(),
})

export const env = envSchema.parse(import.meta.env)
