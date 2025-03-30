import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8),
});
