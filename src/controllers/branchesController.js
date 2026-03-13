const branchesController = {}

import branchModel from "../models/branches.js"

branchesController.getBranches = async (req, res) => {
    const branches = await branchModel.find()
    res.json(branches)
}

branchesController.postBranches = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;

    const newBranch = new branchModel({
        name,
        address,
        schedule,
        isActive
    });

    await newBranch.save();
    res.status(201).json(newBranch);
};

branchesController.deleteBranches = async (req, res) => {
    await branchModel.findByIdAndDelete(req.params.id);
    res.status(204).json();
}

branchesController.putBranches = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;
    const updatedBranch = await branchModel.findByIdAndUpdate(req.params.id, {
        name,
        address,
        schedule,
        isActive
    }, { new: true });
    res.json(updatedBranch);
};

export default branchesController;