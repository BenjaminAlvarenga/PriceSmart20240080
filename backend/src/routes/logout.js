import e from "express";
import logoutController from "../controllers/logoutController.js";

const router = e.Router();

router.route("/").post(logoutController.logout);

export default router;