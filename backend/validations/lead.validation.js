import { z } from "zod";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "../models/Lead.js";
import mongoose from "mongoose";

export const LEAD_SOURCES = [
    "Website",
    "Referral",
    "Cold Outreach",
    "Social",
    "Event",
    "Other"
];

export const createLeadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Lead name is required")
        .max(100, "Lead name cannot exceed 100 characters"),

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

    status: z
        .enum(LEAD_STATUSES)
        .optional(),

    priority: z
        .enum(LEAD_PRIORITIES)
        .optional(),

    source: z
        .enum(LEAD_SOURCES)
        .optional(),

    value: z
        .number()
        .min(0, "Value cannot be negative")
        .optional(),

    notes: z
        .string()
        .max(5000, "Notes are too long")
        .optional(),

    tags: z
        .array(z.string().trim().min(1))
        .optional()
});

export const leadSchema = z.object({
      status: z
        .enum(LEAD_STATUSES)
        .optional(),
    priority: z
        .enum(LEAD_PRIORITIES)
        .optional(),
    source: z
        .enum(LEAD_SOURCES)
        .optional(),
    search:z.string().optional()
})

export const updateLeadSchema = createLeadSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "Please provide at least one field to update"
    );

export const objectId = z.string().refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    {
        message: "Invalid ID"
    }
);