import z from 'zod'

export const promptSchema = z.object({
    prompt : z.string().min(5, "Roadmap prompt must be atleast 5 characters long").max(200, "Roadmap prompt must not exceed 200 characters"),
    duration : z.number().min(1,"Roadmap time must be atleast one month").max(12, "Roadmap time must not be greater than 12 months"),
    title : z.string().min(5, "Title must be 5 characters long").max(16, "Title must not be longer than 16 characters")
});