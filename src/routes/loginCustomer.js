import e from "express";
import loginCustomerController from "../controllers/loginCustomerController.js"

const router = e.Router();
router.route("/").post(loginCustomerController.login);

export default router;