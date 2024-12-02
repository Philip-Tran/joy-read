import * as z from 'zod'

const bookSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'Title must be at least 4 characters long.' })
    .max(50, { message: 'Title cannot exceed 50 characters.' })
    .required({ message: 'Title is required' }),
  content: z
    .string()
    .min(50, { message: 'Content must be at least 50 characters long.' })
    .required({ message: 'Content is required' }),
  audioUrlOnl: z
    .string()
    .min(4, { message: 'Audio URL must be at least 4 characters long.' })
    .optional(),
})

export { bookSchema }
