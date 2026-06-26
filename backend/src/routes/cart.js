import express from "express";
import cartController from "../controllers/cartController.js"

const router = express.Router();

router.route("/")
.get(cartController.get)
.post(cartController.post)

router.route("/:id")
.put(cartController.put)
.delete(cartController.delete)
.get(cartController.getCartById)

export default router;