import { Request, Response } from "express";
import * as authService from "./auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const result = await authService.refresh(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logout(req.body);
    res.status(204).json({});
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
