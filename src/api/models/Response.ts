import { z } from "zod";

export const backendResponseSchema = z.object({
  success: z.boolean(),
  message: z.string()
});

export type BackendResponse = z.infer<typeof backendResponseSchema>;