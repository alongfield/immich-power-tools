import { pgEnum } from 'drizzle-orm/pg-core';

// Asset visibility enum matching Immich 2.3.0
export const assetVisibilityEnum = pgEnum('asset_visibility_enum', [
  'timeline',
  'hidden',
  'archive',
  'locked',
]);

// Asset status enum matching Immich 2.3.0
export const assetStatusEnum = pgEnum('asset_status_enum', [
  'active',
  'trashed',
  'deleted',
]);

// Asset type enum
export const assetTypeEnum = pgEnum('asset_type_enum', [
  'IMAGE',
  'VIDEO',
  'AUDIO',
  'OTHER',
]);

// Source type enum for asset faces
export const sourceTypeEnum = pgEnum('sourcetype', [
  'machine-learning',
  'exif',
]);

// User status enum
export const userStatusEnum = pgEnum('user_status_enum', [
  'active',
  'removing',
  'deleted',
]);

// Album order enum
export const albumOrderEnum = pgEnum('album_order_enum', [
  'asc',
  'desc',
]);

// Export type helpers
export type AssetVisibility = (typeof assetVisibilityEnum.enumValues)[number];
export type AssetStatus = (typeof assetStatusEnum.enumValues)[number];
export type AssetType = (typeof assetTypeEnum.enumValues)[number];
export type SourceType = (typeof sourceTypeEnum.enumValues)[number];
export type UserStatus = (typeof userStatusEnum.enumValues)[number];
export type AlbumOrder = (typeof albumOrderEnum.enumValues)[number];
