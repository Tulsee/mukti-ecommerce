import { Router } from "express";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const api: Router = Router();

api.use("/auth", userRoutes);
api.use("/products", productRoutes);

export default api;
