import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.loginUser(email, password);
      res.status(200).json({ message: "Login successful", token: result.token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
}
