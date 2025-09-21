import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }).max(100),
  birthDate: z.string().min(8, { message: "Birth date must be at least 8 characters long" }).max(10, { message: "Birth date must be at most 10 characters long" }),
  description: z.string().max(500, { message: "Description must be at most 500 characters long" }).optional(),
  image: z.string().url(),
});

export type AuthorFormData = z.infer<typeof authorSchema>;