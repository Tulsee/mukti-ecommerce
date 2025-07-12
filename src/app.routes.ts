import { Router } from "express";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";

const api: Router = Router();

api.use("/auth", userRoutes);
api.use("/products", productRoutes);
api.use("/orders", orderRoutes);

export default api;
