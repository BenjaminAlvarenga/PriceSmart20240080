import e from "express";
import registerEmployeeController from "../controllers/registerEmployeeController.js";

const router = e.Router();

router.route("/").post(registerEmployeeController.post)
router.route("/verifyEmailCode").post(registerEmployeeController.verifyCode)

export default router