import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    imageUrl: z.string(),
    name: z.string().min(1, "Category name is required"),
});
