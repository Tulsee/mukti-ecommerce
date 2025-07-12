import { NextFunction, Request, Response } from "express";

export const placeOrderValidation = (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;
  const errors: { field: string; message: string }[] = [];

  if (!productId) {
    errors.push({ field: "productId", message: "Product ID is required" });
  } else if (typeof productId !== "number" || !Number.isInteger(productId)) {
    errors.push({ field: "productId", message: "Product ID must be a number" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};
