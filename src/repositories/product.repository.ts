import { and, count, eq, gte, lte, SQL } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

export type NewProduct = typeof products.$inferInsert;

export interface ProductFilterOptions {
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: number;
}

export class ProductRepository {
  public async createProduct(newProduct: NewProduct) {
    const [createdProduct] = await db.insert(products).values(newProduct).returning();

    return createdProduct;
  }

  public async findAll(options: ProductFilterOptions) {
    const { page, limit, minPrice, maxPrice, sellerId } = options;

    const conditions: (SQL | undefined)[] = [
      minPrice !== undefined ? gte(products.price, minPrice) : undefined,
      maxPrice !== undefined ? lte(products.price, maxPrice) : undefined,
      sellerId !== undefined ? eq(products.sellerId, sellerId) : undefined,
    ];

    // Filter out any undefined conditions
    const whereClause = and(...conditions.filter((c): c is SQL => !!c));

    const foundProducts = await db.query.products.findMany({
      where: whereClause,
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: (products, { desc }) => [desc(products.createdAt)],
      with: {
        seller: {
          columns: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    const totalResult = await db.select({ count: count() }).from(products).where(whereClause);

    const total = totalResult[0]?.count ?? 0;

    return { products: foundProducts, total };
  }
}
