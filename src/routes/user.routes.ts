import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router: Router = Router();
const userController = new UserController();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

export default router;
