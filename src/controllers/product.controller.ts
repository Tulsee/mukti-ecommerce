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
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string, 10) : undefined;
      const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string, 10) : undefined;
      const sellerId = req.query.sellerId ? parseInt(req.query.sellerId as string, 10) : undefined;

      const products = await this.productService.getAllProducts({ page, limit, minPrice, maxPrice, sellerId });

      res.status(200).json({ products });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
  };
}
