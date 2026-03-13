import express from "express";
import branchController from "../controllers/branchesController.js";

const router = express.Router();

router.route("/")
.get(branchController.getBranches)
.post(branchController.postBranches)

router.route("/:id")
.put(branchController.putBranches)
.delete(branchController.deleteBranches)

export default router;