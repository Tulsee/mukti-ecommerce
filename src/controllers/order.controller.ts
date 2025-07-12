import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public placeOrder = async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const buyerId = req.user!.id;

      const order = await this.orderService.placeOrder(productId, buyerId);

      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };
}
