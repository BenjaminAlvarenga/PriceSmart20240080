import express from "express";
import productController from "../controllers/productsController.js";

const router = express.Router();

router.route("/")
.get(productController.getProducts)
.post(productController.postProducts)

router.route("/getByName")
.post(productController.searchByName)

router.route("/lowStock")
.get(productController.getLowStock)

router.route("/priceRange")
.post(productController.getProductsByPriceRange)

router.route("/count")
.get(productController.countProducts)

router.route("/:id")
.get(productController.getProductsById)
.put(productController.putProducts)
.delete(productController.deleteProducts)

export default router;