import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export type NewUser = typeof users.$inferInsert;

export class UserRepository {
  public async findByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  }

  public async createUser(newUser: NewUser) {
    const [createdUser] = await db.insert(users).values(newUser).returning();
    return createdUser;
  }
}
