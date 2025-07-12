import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { ProductController } from "../controllers/product.controller";
import { createProductValidation } from "../validation/product.validation";

const router: Router = Router();
const productcontroller = new ProductController();

router.post("/", authenticate, authorize(["Seller"]), createProductValidation, productcontroller.createproduct);

router.get("/", productcontroller.getProducts);

export default router;
