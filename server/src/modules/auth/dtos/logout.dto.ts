import z from "zod";

export const logoutSchema = z.object({
  refreshToken: z.base64(),
});

export type LogoutRequestDTO = z.infer<typeof logoutSchema>;
