import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    company: z.string().optional(),
    avatar: z.string().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Please provide at least one field to update"
  );