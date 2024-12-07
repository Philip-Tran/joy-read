import * as z from 'zod'

const addBookSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  audioUrlOnl: z.string().optional(),
})

export { addBookSchema }
