import { eq } from "drizzle-orm";
import { db } from "../db";
import { orders, products } from "../db/schema";

export type NewOrder = typeof orders.$inferInsert;

export class OrderRepository {
  public async createOrderInTransaction(productId: number, buyerId: number) {
    return db.transaction(async (trx) => {
      const [product] = await trx.select().from(products).where(eq(products.id, productId)).for("update");

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.sellerId === buyerId) {
        throw new Error("Buyer cannot be the seller of the product");
      }

      if (product.stock <= 0) {
        throw new Error("Product is out of stock");
      }

      const [updatedProduct] = await trx
        .update(products)
        .set({ stock: product.stock - 1 })
        .where(eq(products.id, productId))
        .returning();

      const newOrder: NewOrder = {
        productId,
        buyerId,
        totalPrice: product.price,
      };

      const [createdOrder] = await trx.insert(orders).values(newOrder).returning();

      return createdOrder;
    });
  }
}
