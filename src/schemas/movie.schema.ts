import { z } from "zod"

const userSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(50),
    description: z.string(),
    duration: z.number().positive().int(),
    price: z.number().positive().int(),
})


const userCreateSchema = userSchema.omit({ id: true })
const userLoginSchema = userSchema.omit({ id: true, name: true, admin: true })
