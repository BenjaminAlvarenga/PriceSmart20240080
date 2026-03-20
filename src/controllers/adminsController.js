const adminsController = {};

import adminModel from "../models/admins.js";

adminsController.getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();
    return res.status(200).json(admins);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

adminsController.postAdmin = async (req, res) => {
  try {
    let { name, email, password, isVerified } = req.body;

    name = name?.trim();
    password = password?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (!email.includes("@")) {
        console.log(email)
      console.log("llega")
      return res.status(400).json({ message: "email must be real" });
    }

    if (password.length < 10) {
      return res.status(400).json({ message: "password too short" });
    }


    const newBrand = new adminModel({ name, email, password, isVerified });
    await newBrand.save();

    return res.status(201).json({ message: "Admin saved" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

adminsController.deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

adminsController.putAdmin = async (req, res) => {
  try {
    let { name, email, password, isVerified } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    if (name?.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "email must be real" });
    }

    if (pasword.length < 10) {
      return res.status(400).json({ message: "password too short" });
    }

    const updatedAdmin = await brandModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password, isVerified },
      {
        new: true,
      },
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({ message: "Brand Updated" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default adminsController;
