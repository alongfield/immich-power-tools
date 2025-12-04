import { pgTable, uuid, vector, timestamp } from "drizzle-orm/pg-core";

export const faceSearch = pgTable("face_search", {
    faceId: uuid("faceId").notNull().primaryKey(),
    embedding: vector("embedding", {
      dimensions: 512,
    }).notNull(),
});

export type FaceSearch = typeof faceSearch.$inferSelect;
export type NewFaceSearch = typeof faceSearch.$inferInsert;

