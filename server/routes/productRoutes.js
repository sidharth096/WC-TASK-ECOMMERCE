import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/getProducts",protect, getProducts);
productRouter.get("/getProduct/:id",protect, getProductById);
productRouter.post("/create",protect, createProduct);

export default productRouter;
