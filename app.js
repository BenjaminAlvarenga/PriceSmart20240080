import express from "express";
import productRoutes from "./src/routes/products.js";
import branchRoutes from "./src/routes/branches.js";
import employeeRoutes from "./src/routes/employees.js"
import brandRoutes from "./src/routes/brands.js"
import adminRoutes from "./src/routes/admins.js"

const app = express();

//Aceptar JSON en postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/brands", brandRoutes)
app.use("/api/admins", adminRoutes)

export default app;