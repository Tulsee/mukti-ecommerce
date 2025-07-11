import { Request, Response, NextFunction } from "express";

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, password, role } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordErrorMessage =
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const errors: { field: string; message: string }[] = [];

  if (!fullName) {
    errors.push({ field: "fullName", message: "Full name is required" });
  } else if (fullName.length < 3) {
    errors.push({ field: "fullName", message: "Full name must be at least 3 characters long" });
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: "Invalid email address" });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (!passwordRegex.test(password)) {
    errors.push({ field: "password", message: passwordErrorMessage });
  }

  if (role && !["Buyer", "Seller"].includes(role)) {
    errors.push({ field: "role", message: 'Role must be either "Buyer" or "Seller"' });
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }
  next();
};
