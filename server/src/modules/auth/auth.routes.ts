import { Router } from "express";
import * as controller from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { registerSchema } from "./dtos/register.dto.js";
import { loginSchema } from "./dtos/login.dto.js";
import { refreshSchema } from "./dtos/refresh.dto.js";
import { logoutSchema } from "./dtos/logout.dto.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post(
  "/refresh",
  authenticate,
  validate(refreshSchema),
  controller.refresh,
);
router.post("/logout", validate(logoutSchema), controller.logout);

export default router;
