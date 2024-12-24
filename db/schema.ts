import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
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

export const collaborationSessions = pgTable("collaboration_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
});

export const sessionParticipants = pgTable("session_participants", {
  id: serial("id").primaryKey(),
  sessionId: uuid("session_id").notNull().references(() => collaborationSessions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at"),
});

export const sharedResponses = pgTable("shared_responses", {
  id: serial("id").primaryKey(),
  sessionId: uuid("session_id").notNull().references(() => collaborationSessions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  provider: text("provider").notNull(), // 'openai', 'claude', or 'gemini'
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Collaboration schemas
export const insertSessionSchema = createInsertSchema(collaborationSessions);
export const selectSessionSchema = createSelectSchema(collaborationSessions);
export type InsertSession = typeof collaborationSessions.$inferInsert;
export type SelectSession = typeof collaborationSessions.$inferSelect;

export const insertParticipantSchema = createInsertSchema(sessionParticipants);
export const selectParticipantSchema = createSelectSchema(sessionParticipants);
export type InsertParticipant = typeof sessionParticipants.$inferInsert;
export type SelectParticipant = typeof sessionParticipants.$inferSelect;

export const insertSharedResponseSchema = createInsertSchema(sharedResponses);
export const selectSharedResponseSchema = createSelectSchema(sharedResponses);
export type InsertSharedResponse = typeof sharedResponses.$inferInsert;
export type SelectSharedResponse = typeof sharedResponses.$inferSelect;