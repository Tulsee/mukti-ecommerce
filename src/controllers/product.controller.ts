import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public createproduct = async (req: Request, res: Response) => {
    try {
      const sellerId = req.user!.id;
      const product = await this.productService.createProduct(req.body, sellerId);
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create product", error: error.message });
    }
  };

  public getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
  };
}
