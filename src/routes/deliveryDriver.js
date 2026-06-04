import deliveryDriverController from "../controllers/deliveryDriverController.js";
import express from "express";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router()

router.route("/")
.get(deliveryDriverController.get)
.post(upload.single("image"), deliveryDriverController.post)

router.route("/:id")
.put(upload.single("image"), deliveryDriverController.put)
.delete(deliveryDriverController.delete)

export default router;