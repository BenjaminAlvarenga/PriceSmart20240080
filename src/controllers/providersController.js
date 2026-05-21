import providerModel from "../models/providers.js";

import { v2 as cloudinary } from "cloudinary";

const providersController = {}

providersController.get = async (req, res) => {
    try {
        const providers = providerModel.find()
        return res.status(200).json(providers)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json("Internal Server Error")
    }
}

providersController.post = async (req, res) => {
    try {
        const {
            name,
            phone
        } = req.body

        const newProvider = new providerModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        });

        await newProvider.save()

        return res.status(201).json({message:"Provider saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json("Internal Server Error")
    }
}

providersController.delete = async (req, res) => {
    try {
        const providerFound = await providerModel.findById(req.params.id)

        await cloudinary.uploader.destroy(providerFound.public_id)

        await providerModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message:"Provider Deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

providersController.put = async (req, res) => {
    try {
        const {name, phone} = req.body

        const providerFound = await providerModel.findById(req.params.id);

        const updateData = {
            name,
            phone
        }

        if(req.file){
            await cloudinarry.uploaded.destroy(providerFound.public_id)

            updateData.image = req.file.path;
            updateData.public_id = req.file.filename
        }

        await providerModel.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        })

        return res.status(200).json("Provider updated")
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export default providersController;