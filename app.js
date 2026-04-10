import express from "express";
import productRoutes from "./src/routes/products.js";
import branchRoutes from "./src/routes/branches.js";
import employeeRoutes from "./src/routes/employees.js"
import brandRoutes from "./src/routes/brands.js"
import adminRoutes from "./src/routes/admins.js"
import customerRoutes from "./src/routes/customers.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

//Aceptar JSON en postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/brands", brandRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/registerCustomers", registerCustomerRoutes)

export default app;