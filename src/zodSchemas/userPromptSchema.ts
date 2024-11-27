import z from 'zod'

export const promptSchema = z.object({
    prompt : z.string().min(5, "Roadmap prompt must be atleast 5 characters long").max(200, "Roadmap prompt must not exceed 200 characters")
});