CREATE TYPE "public"."user_role" AS ENUM('Buyer', 'Seller');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'Buyer' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
