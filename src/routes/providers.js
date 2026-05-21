import express from "express";
import providersController from "../controllers/providersController.js";
import upload from "../utils/CloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(providersController.get)
.post(upload.single("image"), providersController.post)

router.route("/:id")
.put(upload.single("image"), providersController.put)
.delete(providersController.delete)

export default router;