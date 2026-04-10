import e from "express";
import registerCustomersController from "../controllers/registerCustomersController.js";

const router = e.Router();

router.route("/").post(registerCustomersController.post)
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCode)

export default router