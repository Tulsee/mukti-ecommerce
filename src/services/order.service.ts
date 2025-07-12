import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async placeOrder(productId: number, buyerId: number) {
    return this.orderRepository.createOrderInTransaction(productId, buyerId);
  }
}
