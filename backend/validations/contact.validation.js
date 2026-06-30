import z from "zod";


export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Contact name is required")
    .max(100, "Contact name cannot exceed 100 characters"),

  email: z
    .email("Please provide a valid email")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional(),

  company: z
    .string()
    .trim()
    .max(100, "Company name is too long")
    .optional(),

  title: z
    .string()
    .trim()
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  tags: z
    .array(
      z.string().trim().min(1, "Tag cannot be empty")
    )
    .optional(),

  notes: z
    .string()
    .max(5000, "Notes are too long")
    .optional(),

  favorite: z
    .boolean()
    .optional(),
});

export const updateContactSchema = createContactSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "Please provide at least one field to update",
    }
  );