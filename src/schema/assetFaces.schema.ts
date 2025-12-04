import { pgTable, uuid, integer, varchar, timestamp, doublePrecision } from "drizzle-orm/pg-core";

export const assetFaces = pgTable("asset_face", {
    id: uuid("id").defaultRandom().primaryKey(),
    assetId: uuid("assetId").notNull(),
    personId: uuid("personId"),
    imageWidth: integer("imageWidth").notNull().default(0),
    imageHeight: integer("imageHeight").notNull().default(0),
    boundingBoxX1: integer("boundingBoxX1").notNull().default(0),
    boundingBoxY1: integer("boundingBoxY1").notNull().default(0),
    boundingBoxX2: integer("boundingBoxX2").notNull().default(0),
    boundingBoxY2: integer("boundingBoxY2").notNull().default(0),
    sourceType: varchar("sourceType").default('machine-learning'), // 'machine-learning' | 'exif'
    deletedAt: timestamp("deletedAt", { withTimezone: true }),
});

export type AssetFace = typeof assetFaces.$inferSelect;
export type NewAssetFace = typeof assetFaces.$inferInsert;
