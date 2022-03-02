import { Router } from "express";
const router = Router();

import * as productController from "../controllers/product.controllers.js";
import * as middleware from "../middlewares/verifyToken.js";

// Create single product
router.post(
  "/",
  middleware.verifyTokenAndAdmin,
  productController.createProduct
);

// Update single product
router.put(
  "/:id",
  middleware.verifyTokenAndAdmin,
  productController.updateProductById
);

// Delete single product
router.delete(
  "/:id",
  middleware.verifyTokenAndAdmin,
  productController.deleteProductById
);

// Get single product
router.get("/find/:id", productController.getProductById);

// Get all products
router.get("/", productController.getAllProducts);

export default router;
