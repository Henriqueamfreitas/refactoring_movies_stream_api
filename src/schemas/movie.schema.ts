import { z } from "zod"

const movieSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(50),
    description: z.string().optional(),
    duration: z.number().positive().int(),
    price: z.number().positive().int(),
})


const movieCreateSchema = movieSchema.omit({ id: true })
const userLoginSchema = movieSchema.omit({ id: true, name: true, admin: true })

export { movieSchema, movieCreateSchema }
