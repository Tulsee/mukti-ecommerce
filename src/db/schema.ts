import { pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["Buyer", "Seller"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("Buyer"),
});
