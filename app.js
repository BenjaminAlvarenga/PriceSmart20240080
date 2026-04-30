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
import cookieParser from "cookie-parser";
import limiter from "./src/middlewares/rateLimiter.js";

const app = express();
app.use(cookieParser());
app.use(limiter);

//Aceptar JSON en postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/brands", brandRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/registerCustomers", registerCustomerRoutes)
app.use("/api/loginCustomer", loginCustomerRoutes)
app.use("/api/logout", logoutRoutes)

export default app;