import { db } from "../db";
import { products } from "../db/schema";

export type NewProduct = typeof products.$inferInsert;

export class ProductRepository {
  public async createProduct(newProduct: NewProduct) {
    const [createdProduct] = await db.insert(products).values(newProduct).returning();

    return createdProduct;
  }

  public async findAll() {
    const allProducts = await db.query.products.findMany({
      with: {
        seller: {
          columns: {
            fullName: true,
            email: true,
          },
        },
      },
    });
    return allProducts;
  }
}
