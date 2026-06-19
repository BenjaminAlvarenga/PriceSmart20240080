import express from "express";
import productRoutes from "./src/routes/products.js";
import branchRoutes from "./src/routes/branches.js";
import employeeRoutes from "./src/routes/employees.js"
import brandRoutes from "./src/routes/brands.js"
import adminRoutes from "./src/routes/admins.js"
import customerRoutes from "./src/routes/customers.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js";
import logoutRoutes from "./src/routes/logout.js"
import ProviderRoutes from "./src/routes/providers.js"
import cartRoutes from "./src/routes/cart.js"
import cookieParser from "cookie-parser";
import wompiRoutes from "./src/routes/wompi.js"
import deliveryDriverRoutes from "./src/routes/deliveryDriver.js";
import limiter from "./src/middlewares/rateLimiter.js";
import { validateAuthCookie } from "./src/middlewares/authMiddleware.js";
import loginAdminRoutes from "./src/routes/loginAdmin.js";
import registerAdminRoutes from "./src/routes/registerAdmin.js";

const app = express();
app.use(cookieParser());
app.use(limiter);

//Aceptar JSON en postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/employees", validateAuthCookie(["admin"]), employeeRoutes);
app.use("/api/brands", brandRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/registerCustomers", registerCustomerRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/loginCustomer", loginCustomerRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/providers", ProviderRoutes)
app.use("/api/cart", validateAuthCookie(["admin", "customer"]) ,cartRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveryDrivers", deliveryDriverRoutes)

export default app;