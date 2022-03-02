import { Router } from "express";
const router = Router();

import * as usersController from "../controllers/user.controllers.js";
import * as middleware from "../middlewares/verifyToken.js";

// Update single user
router.put(
  "/:id",
  middleware.verifyTokenAndAuthorization,
  usersController.updateUserById
);

// Delete single user
router.delete(
  "/:id",
  middleware.verifyTokenAndAuthorization,
  usersController.deleteUserById
);

// Get single user
router.get(
  "/find/:id",
  middleware.verifyTokenAndAdmin,
  usersController.getUserById
);

// Get all users
router.get("/", middleware.verifyTokenAndAdmin, usersController.getAllUsers);

export default router;
