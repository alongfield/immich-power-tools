import { pgTable, uuid, varchar, timestamp, boolean, customType } from 'drizzle-orm/pg-core';

// Custom type for bytea columns
const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea';
  },
});

export const assets = pgTable('asset', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  deviceAssetId: varchar('deviceAssetId').notNull(),
  ownerId: uuid('ownerId').notNull(),
  deviceId: varchar('deviceId').notNull(),
  type: varchar('type').notNull(), // 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER'
  originalPath: varchar('originalPath').notNull(),
  fileCreatedAt: timestamp('fileCreatedAt', { withTimezone: true }).notNull(),
  fileModifiedAt: timestamp('fileModifiedAt', { withTimezone: true }).notNull(),
  isFavorite: boolean('isFavorite').default(false).notNull(),
  duration: varchar('duration'),
  encodedVideoPath: varchar('encodedVideoPath').default(''),
  checksum: bytea('checksum'),
  visibility: varchar('visibility').default('timeline').notNull(), // 'timeline' | 'hidden' | 'archive' | 'locked'
  livePhotoVideoId: uuid('livePhotoVideoId').references((): any => assets.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
  status: varchar('status').default('active').notNull(), // 'active' | 'trashed' | 'deleted'
  originalFileName: varchar('originalFileName').notNull(),
  sidecarPath: varchar('sidecarPath'),
  thumbhash: bytea('thumbhash'),
  isOffline: boolean('isOffline').default(false).notNull(),
  libraryId: uuid('libraryId'),
  isExternal: boolean('isExternal').default(false).notNull(),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
  localDateTime: timestamp('localDateTime', { withTimezone: true }).notNull(),
  stackId: uuid('stackId'),
  duplicateId: uuid('duplicateId'),
  updateId: uuid('updateId'),
  isArchived: boolean('isArchived').default(false).notNull(),
  hasMetadata: boolean('hasMetadata').default(true).notNull(),
});

export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

// // Note: You'll need to define these referenced tables as well
// export const users = pgTable('users', {
//   id: uuid('id').primaryKey(),
//   // ... other columns
// });

// export const libraries = pgTable('libraries', {
//   id: uuid('id').primaryKey(),
//   // ... other columns
// });

// export const assetStack = pgTable('asset_stack', {
//   id: uuid('id').primaryKey(),
//   // ... other columns
// });
