import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { registerValidation } from "../validation/user.validation";

const router: Router = Router();
const userController = new UserController();

router.post("/register", registerValidation, userController.registerUser);
router.post("/login", userController.login);

export default router;
