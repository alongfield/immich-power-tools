import { pgTable, uuid, varchar, timestamp, boolean, bigint } from 'drizzle-orm/pg-core';
import { assets } from './assets.schema';

// Asset files table matching Immich 2.3.0
// This replaces the direct path columns on assets for more flexible file management
export const assetFiles = pgTable('asset_files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  assetId: uuid('assetId').notNull().references(() => assets.id, { onDelete: 'cascade' }),
  type: varchar('type').notNull(), // 'original' | 'preview' | 'thumbnail' | 'encoded_video' | 'sidecar'
  path: varchar('path').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow().notNull(),
});

export type AssetFile = typeof assetFiles.$inferSelect;
export type NewAssetFile = typeof assetFiles.$inferInsert;
