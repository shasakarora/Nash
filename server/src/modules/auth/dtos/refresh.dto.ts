import z from "zod";

export const refreshSchema = z.object({
  refreshToken: z.base64(),
});

export type RefreshRequestDTO = z.infer<typeof refreshSchema>;
