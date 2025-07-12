import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["Buyer", "Seller"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("Buyer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelationships = relations(users, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  stock: integer("stock").notNull().default(0),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  // Each product belongs to one seller
  seller: one(users, {
    fields: [products.sellerId],
    references: [users.id],
  }),
  orders: many(orders),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  buyerId: integer("buyer_id")
    .notNull()
    .references(() => users.id),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  // Each order is for one product
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  // Each order belongs to one buyer
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
  }),
}));
