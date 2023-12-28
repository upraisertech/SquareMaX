import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .refine((username: string) => /^[a-zA-Z0-9_-]+$/.test(username), {
      message:
        "Username must contain only letters, numbers, underscores, or hyphens.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().refine((username) => /^[a-zA-Z0-9_-]+$/.test(username), {
    message:
      "Username must contain only letters, numbers, underscores, or hyphens.",
  }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 characters" }),
  // file: z.optional(z.custom<File[]>()),
  file: z.custom<File[]>(),
  location: z.string(),
  tags: z.string(),
});
