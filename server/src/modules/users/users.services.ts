import { Group } from "../groups/groups.model.js";
import { CheckInResponseDTO } from "./dtos/check-in-response.dto.js";
import { DifferentUserDTO as DifferentUserResponseDTO } from "./dtos/different-user.dto.js";
import { SameUserDTO as SameUserResponseDTO } from "./dtos/same-user.dto.js";
import { toDifferentUserResponse, toSameUserResponse } from "./users.mapper.js";
import * as userRepository from "./users.repository.js";

export const getCurrentUser = async (
  authUserID: string,
): Promise<SameUserResponseDTO> => {
  const user = await userRepository.getUserFromDB(authUserID);
  return toSameUserResponse(user);
};

export const getUser = async (
  authUserID: string,
  requestedUserID: string,
): Promise<SameUserResponseDTO | DifferentUserResponseDTO> => {
  const user = await userRepository.getUserFromDB(requestedUserID);
  if (authUserID === requestedUserID) {
    return toSameUserResponse(user);
  } else {
    return toDifferentUserResponse(user);
  }
};

export const dailyCheckIn = async (
  authUserID: string,
): Promise<CheckInResponseDTO> => {
  const response = await userRepository.performDailyCheckIn(authUserID);
  return response;
};

export const getGroups = async (authUserID: string): Promise<Group[]> => {
  const response = await userRepository.getGroupMembers(authUserID);
  const groupIds = response.map((group) => group.group_id);
  const groups = await userRepository.getGroups(groupIds);
  return groups;
};
