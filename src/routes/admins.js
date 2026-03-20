import e from "express"
import adminsController from "../controllers/adminsController.js"

const router = e.Router();

router.route("/")
.get(adminsController.getAdmins)
.post(adminsController.postAdmin)

router.route("/:id")
.put(adminsController.putAdmin)
.delete(adminsController.deleteAdmin)

export default router