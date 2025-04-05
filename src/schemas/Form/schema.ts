import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email().max(50).trim(),
  password: z.string().min(8),
});
