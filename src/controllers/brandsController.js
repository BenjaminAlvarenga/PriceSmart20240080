const brandController = {};

import brandModel from "../models/brands.js";

brandController.getBrands = async (req, res) => {
  try {
    const brands = await brandModel.find();
    return res.status(200).json(brands);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

brandController.postBrand = async (req, res) => {
  try {
    let { name, slogan, address, isActive } = req.body;

    name = name?.trim();
    slogan = slogan?.trim();
    address = address?.trim();

    if (!name || !slogan || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (address.length > 100) {
      return res.status(400).json({ message: "address too long" });
    }

    const newBrand = new brandModel({ name, slogan, address, isActive });
    await newBrand.save();

    return res.status(201).json({ message: "Brand saved" });
  } catch (error) {
    console.log("Error" + error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

brandController.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(req.params.id);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({ message: "Brand deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

brandController.putBrand = async (req, res) => {
  try {
    let { name, slogan, address, isActive } = req.body;

    name = name?.trim();
    slogan = slogan?.trim();
    address = address?.trim();

    if (name?.length < 3) {
      return res.status(400).json({ message: "name too short" });
    }

    if (address?.length > 100) {
      return res.status(400).json({ message: "address too long" });
    }

    const updatedBrands = await brandModel.findByIdAndUpdate(
      req.params.id,
      { name, slogan, address, isActive },
      {
        new: true,
      },
    );

    if(!updatedBrands){
        return res.status(404).json({message:"Brand not found"})
    }

    return res.status(200).json({message:"Brand Updated"})
  } catch (error) {
    console.log("Error" + error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

export default brandController;