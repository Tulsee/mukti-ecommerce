import { Router } from "express";

import userRoutes from "./routes/user.routes";

const api: Router = Router();

api.use("/auth", userRoutes);

export default api;
