import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { placeOrderValidation } from "../validation/order.validation";

const router: Router = Router();
const orderController = new OrderController();

router.post("/", authenticate, authorize(["Buyer"]), placeOrderValidation, orderController.placeOrder);

export default router;
