import e from "express";
import registerAdminController from "../controllers/registerAdminController.js";

const router = e.Router();

router.route("/").post(registerAdminController.post)
router.route("/verifyCodeEmail").post(registerAdminController.verifyCode)

export default router