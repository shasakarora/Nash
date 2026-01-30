import { Router } from "express";
import * as controller from "./groups.controller.js"
import { validate } from "../../middleware/validate.middleware.js";
import { CreateGroupSchema } from "./dtos/create-group.dto.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("group/create",authenticate,validate(CreateGroupSchema),controller.createGroup);
router.get("group/:group_id",authenticate,controller.getGroupById);

export default router;