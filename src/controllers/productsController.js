//Creo un array de metodos
const productController = {}

//Import del schema de la coleccion
import productsModel from "../models/products.js"

//Select
productController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//Insert
productController.postProducts = async (req, res) => {
    //1# solicitar los datos
    const { name,description, price, stock } = req.body;

    const newProdcut = new productsModel({
        name,
        description,
        price,
        stock
    })
    await newProdcut.save()
    res.status(201).json(newProdcut)
}

productController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.status(204).json()
}

//Update
productController.putProducts = async (req, res) => {
    //1# solicitar los datos
    const { name,description, price, stock } = req.body;

    await productsModel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        stock
    }, {new: true})
    res.json({message: "Producto actualizado"})
}

export default productController