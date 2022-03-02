import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controllers.js";
import * as middleware from "../middlewares/verifySignup.js";

// Register user
router.post(
  "/register",
  middleware.checkDuplicateSignInfo,
  authController.registerUser
);

// Login user
router.post("/login", authController.login);

export default router;
