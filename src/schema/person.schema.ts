import { pgTable, uuid, varchar, timestamp, boolean, date, text, jsonb } from "drizzle-orm/pg-core";


export const person = pgTable("person", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
  ownerId: uuid("ownerId").notNull(),
  name: varchar("name").notNull().default(''),
  thumbnailPath: varchar("thumbnailPath").notNull().default(''),
  isHidden: boolean("isHidden").notNull().default(false),
  birthDate: date("birthDate", { mode: "date" }),
  faceAssetId: uuid("faceAssetId"),
  isFavorite: boolean("isFavorite").notNull().default(false),
  color: varchar("color"),
  updateId: uuid("updateId"),
});

export type Person = typeof person.$inferSelect;
export type NewPerson = typeof person.$inferInsert;
