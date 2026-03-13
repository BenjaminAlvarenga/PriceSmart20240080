import express from "express";
import productRoutes from "./src/routes/products.js";
import branchRoutes from "./src/routes/branches.js";

const app = express();

//Aceptar JSON en postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);

export default app;