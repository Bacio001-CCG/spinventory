import { db } from "@/database/connect";
import { notificationsTable } from "@/database/schema";
import { notificationSchema } from "@/validation/notification";
import { z } from "better-auth";
import { desc } from "drizzle-orm";

export async function getNotifications(): Promise<
    z.infer<typeof notificationSchema>[]
> {
    const notifications = await db
        .select()
        .from(notificationsTable)
        .orderBy(desc(notificationsTable.createdAt));
    return notifications;
}
