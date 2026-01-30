import { Request, Response } from "express";
import * as groupService from "./groups.service.js"
import { AuthRequest } from "../../middleware/auth.middleware.js";

export const createGroup = async (req: AuthRequest, res: Response) => {
    try {
        const result = await groupService.createGroup(req.body, req.user);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export const getGroupById = async (req: AuthRequest, res: Response) => {
    try {
        const result = await groupService.getGroupById(req.params.group_id.toString());
        res.status(200).json(result);
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
}