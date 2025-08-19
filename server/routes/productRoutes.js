import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.get("/getProducts", getProducts);
productRouter.get("/getProduct/:id", getProductById);
productRouter.post("/create", createProduct);

export default productRouter;
