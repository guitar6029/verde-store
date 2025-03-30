import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().min(8),
});
