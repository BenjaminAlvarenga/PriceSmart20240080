import e from "express";
import brandsController from "../controllers/brandsController.js"

const router = e.Router();

router.route("/")
.get(brandsController.getBrands)
.post(brandsController.postBrand)

router.route("/:id")
.put(brandsController.putBrand)
.delete(brandsController.deleteBrand)

export default router