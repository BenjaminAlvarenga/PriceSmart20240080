import e from "express";
import employeeController from "../controllers/employeeController.js";

const router = e.Router();

router
.route("/")
.get(employeeController.getEmployees)
.post(employeeController.insertEmployees)

router
.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee)

export default router;