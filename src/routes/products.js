import express from "express";
import productController from "../controllers/productsController.js";

const router = express.Router();

router.route("/")
.get(productController.getProducts)
.post(productController.postProducts)

router.route("/:id")
.put(productController.putProducts)
.delete(productController.deleteProducts)

export default router;