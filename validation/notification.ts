import { z } from "zod";

export const notificationSchema = z.object({
    id: z.number(),
    provider: z.string(),
    content: z.string(),
});
