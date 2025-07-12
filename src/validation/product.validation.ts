import { NextFunction, Request, Response } from "express";

export const createProductValidation = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, description, stock } = req.body;

  const errors: { field: string; message: string }[] = [];

  if (!name) {
    errors.push({ field: "name", message: "Product name is required" });
  }

  if (price === undefined) {
    errors.push({ field: "price", message: "Price is required" });
  } else if (typeof price !== "number" || !Number.isInteger(price) || price <= 0) {
    errors.push({ field: "price", message: "Price must be a positive integer (in cents)" });
  }

  if (stock === undefined) {
    errors.push({ field: "stock", message: "Stock is required" });
  } else if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
    errors.push({ field: "stock", message: "Stock must be a non-negative integer" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};
