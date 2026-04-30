//Creo un array de metodos
const productController = {};

//Import del schema de la coleccion
import productsModel from "../models/products.js";

//Select
productController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

//Insert
productController.postProducts = async (req, res) => {
  //1# solicitar los datos
  const { name, description, price, stock } = req.body;

  const newProdcut = new productsModel({
    name,
    description,
    price,
    stock,
  });
  await newProdcut.save();
  res.status(201).json(newProdcut);
};

productController.deleteProducts = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.status(204).json();
};

//Update
productController.putProducts = async (req, res) => {
  //1# solicitar los datos
  const { name, description, price, stock } = req.body;

  await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );
  res.json({ message: "Producto actualizado" });
};

//Seleccionar por ID
productController.getProductsById = async (req, res) => {
  try {
    const products = await productsModel.findById(req.params.id);

    if (!products) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

//Buscar por nombre
productController.searchByName = async (req, res) => {
  try {
    //Solicitar datos
    const { name } = req.body;

    const products = await productsModel.find({
      name: { $regex: name, $options: "i" },
    });

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.json(200).json(products);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Productos con stock bajo
productController.getLowStock = async (req, res) => {
  try {
    const products = await productsModel.find({ stock: { lt: 5 } });

    if (!products) {
      return res.status(404).json({ message: "Not products with low stocks" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//FILTROS que el usuario coloque

productController.getProductsByPriceRange = async (req, res) => {
  try {
    // 1. Solicito los datos

    const { min, max } = req.body;

    const product = await productsModel.find({
      price: { $gte: min, $lte: max },
    });

    if (!product) {
      return res.status(404).json({ message: "Products not Found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

productController.countProducts = async (req, res) => {
  try {
    const count = await productsModel.countDocuments();

    return res.status(200).json(count);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default productController;
