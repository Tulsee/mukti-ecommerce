import { NewUser, UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type UserRegistrationPayload = Omit<NewUser, "password"> & { password?: string };

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async registerUser(payload: UserRegistrationPayload) {
    const { fullName, email, password: plainPassword, role } = payload;

    if (!fullName) {
      throw new Error("Full name is required.");
    }
    if (!email) {
      throw new Error("Email is required.");
    }
    if (!plainPassword) {
      throw new Error("Password is required.");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(plainPassword)) {
      throw new Error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    if (!payload.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser: NewUser = {
      ...payload,
      password: hashedPassword,
      role: payload.role || "Buyer",
    };

    const createdUser = await this.userRepository.createUser(newUser);

    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  public async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return { token };
  }
}
