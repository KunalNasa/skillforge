import z from 'zod';

// Enum for current status
const StatusEnum = z.enum(["Beginner", "Intermediate", "Advanced"]);

export const userProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(16, { message: "Username must not exceed 16 characters." })
    .refine((value) => !/\s/.test(value), {
      message: "Username must not contain spaces.",
    })
    .transform((value) => value.toLowerCase()),
  
  other_details: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long." })
    .max(200, { message: "Bio must not exceed 200 characters." }),

  goal: z
    .string()
    .min(4, { message: "Goal must be at least 4 characters long." })
    .max(20, { message: "Goal must not exceed 20 characters." }),

  current_status: StatusEnum.default("Beginner"), // Default set to "beginner"
});
