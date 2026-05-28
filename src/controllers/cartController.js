import cart from "../models/cart.js";
import cartModel from "../models/cart.js";
import productsModel from "../models/products.js";

const cartController = {}

cartController.get = async (req, res) =>{
    try {
        const carts = await cartModel.find().populate("customerId", "name email").populate("Products.productsId", "name price")

        return res.status(200).json(carts)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

cartController.getCartById = async (req, res) => {
    try {
        const cart = cartModel.findById(req.params.id).populate("customerId", "name email").populate("Products.productsId", "name price")

        return res.status(200).json(cart)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

cartController.post = async (req, res) => {
    try {
        const {customerId, products, status} = req.body;

        //Calcular total y subtotal

        let total = 0

        //Array de productos
        let newProducts = []

        for(let i = 0; i < products.length; i++){
            //Buscamos el producto en la db
            const productFound = await productsModel.findById(products[i].productId)

            const subtotal = productFound.price * products[i].quantity

            total += subtotal

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total,
            status
        })

        await newCart.save()

        return res.status(200).json({message:"Cart saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
};

cartController.put = async (req, res) => {
    try {
        //Solicitamos los datos que actualizaremos

        const {customerId, products, status} = req.body

        let total = 0

        let newProducts = []

        for(let i = 0; i < products.length; i++){
            const productFound = await productsModel.findById(products[i].productId)

            const subtotal = productFound.price * products[i].quantity

            total += subtotal

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id,{customerId,
            products: newProducts,
            status
        },
    {new:true})
    } catch (error) {
        
    }
}

cartController.delete = async(req, res) => {
    try {
        const deleteCart = await cartModel.findByIdAndDelete(req.params.id)

        if(!deleteCart){
            return res.status(404).json({message:"Cart not found"})
        }

        return res.status(200).json({message:"Cart deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export default cartController;