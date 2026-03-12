//Creo un array de metodos
const productController = {}

//Import del schema de la coleccion
import productsModel from "../models/products.js"

//Select
productController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}