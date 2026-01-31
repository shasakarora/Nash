import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import * as controller from "./transactions.controller.js"

const router = Router();

router.get('/bet/:bet_id', authenticate, controller.getBetTransactions);

export default router;