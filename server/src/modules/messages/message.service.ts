import * as messageRepo from "./message.repository.js";
import * as roomRepo from "../chat-room/chat-room.repository.js";
import { MessageResponseDTO } from "./dtos/message-response.dto.js";

export const sendMessage = async (
  roomID: string,
  senderID: string,
  content: string,
): Promise<MessageResponseDTO> => {
  // 1️⃣ Validate membership (business rule)
  if (!(await roomRepo.isMember(senderID, roomID)))
    throw new Error("User is not a member of this room");

  // 2️⃣ Persist message
  const message = await messageRepo.createMessage(roomID, senderID, content);

  // 3️⃣ Return safe DTO
  return {
    id: message.id,
    roomID: message.roomID,
    senderID: message.senderID,
    content: message.content,
    createdAt: message.createdAt,
  };
};
