import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const apiSettings = pgTable("api_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  openaiApiKey: text("openai_api_key").notNull(),
  anthropicApiKey: text("anthropic_api_key").notNull(),
  geminiApiKey: text("gemini_api_key").notNull(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// API settings schemas
export const insertApiSettingsSchema = createInsertSchema(apiSettings);
export const selectApiSettingsSchema = createSelectSchema(apiSettings);
export type InsertApiSettings = typeof apiSettings.$inferInsert;
export type SelectApiSettings = typeof apiSettings.$inferSelect;