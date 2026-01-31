import pool from "../../config/db.js";
import { NotificationResponseDTO } from "./dtos/notifications-response.dto.js";
import * as notificationRepo from "./notifications.repository.js"

export const getNotifications = async (
    userId: string
): Promise<NotificationResponseDTO> => {
    const user_id = userId;
    const result = await notificationRepo.getNotifications(user_id);
    return result;
}

export const createNotification = async (
    userId: string,
    content: string
): Promise<void> => {
    const now: Date = new Date(Date.now());
    pool.query(
        `INSERT INTO notifications (user_id, content, created_at)
            VALUES ($1, $2, $3)`,
        [userId, content, now]
    );
}