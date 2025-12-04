import { ASSET_PREVIEW_PATH, ASSET_SHARE_THUMBNAIL_PATH, ASSET_THUMBNAIL_PATH, ASSET_VIDEO_PATH, PERSON_THUBNAIL_PATH } from "@/config/routes"
import { IAsset } from "@/types/asset"

// Asset visibility constants matching Immich 2.3.0
export const AssetVisibility = {
  TIMELINE: 'timeline',
  HIDDEN: 'hidden', 
  ARCHIVE: 'archive',
  LOCKED: 'locked',
} as const;

// Asset status constants matching Immich 2.3.0
export const AssetStatus = {
  ACTIVE: 'active',
  TRASHED: 'trashed',
  DELETED: 'deleted',
} as const;

// Asset type constants matching Immich 2.3.0
export const AssetType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  OTHER: 'OTHER',
} as const;

export type AssetVisibilityType = (typeof AssetVisibility)[keyof typeof AssetVisibility];
export type AssetStatusType = (typeof AssetStatus)[keyof typeof AssetStatus];
export type AssetTypeType = (typeof AssetType)[keyof typeof AssetType];

export const cleanUpAsset = (asset: IAsset): IAsset => {
  return {
    ...asset,
    url: ASSET_THUMBNAIL_PATH(asset.id),
    previewUrl: ASSET_PREVIEW_PATH(asset.id),
    videoURL: ASSET_VIDEO_PATH(asset.id),
  }
}


export const cleanUpShareAsset = (asset: IAsset, token: string): IAsset => {
  return {
    ...asset,
    url: ASSET_SHARE_THUMBNAIL_PATH({ id: asset.id, size: "thumbnail", token, isPeople: false }),
    downloadUrl: ASSET_SHARE_THUMBNAIL_PATH({ id: asset.id, size: "original", token, isPeople: false }),
    previewUrl: ASSET_SHARE_THUMBNAIL_PATH({ id: asset.id, size: "preview", token, isPeople: false }),
    videoURL: ASSET_SHARE_THUMBNAIL_PATH({ id: asset.id, size: "video", token, isPeople: false }),
  }
}

export const cleanUpAssets = (assets: IAsset[]): IAsset[] => {
  return assets.map(cleanUpAsset);
}

function isRotated90CW(orientation: number) {
  return orientation === 5 || orientation === 6 || orientation === 90;
}

function isRotated270CW(orientation: number) {
  return orientation === 7 || orientation === 8 || orientation === -90;
}

export function isFlipped(orientation?: string | null) {
  const value = Number(orientation);
  return value && (isRotated270CW(value) || isRotated90CW(value));
}

// Helper to parse duration string (HH:MM:SS.mmm) to seconds
export function parseDurationToSeconds(duration: string | null | undefined): number {
  if (!duration) return 0;
  
  const parts = duration.split(':');
  if (parts.length !== 3) return 0;
  
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const secondsParts = parts[2].split('.');
  const seconds = parseInt(secondsParts[0], 10) || 0;
  const milliseconds = parseInt(secondsParts[1] || '0', 10) || 0;
  
  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

// Helper to check if an asset is visible based on visibility and status
export function isAssetVisible(asset: { visibility?: string; status?: string; deletedAt?: Date | null }): boolean {
  return (
    asset.visibility === AssetVisibility.TIMELINE &&
    asset.status === AssetStatus.ACTIVE &&
    !asset.deletedAt
  );
}
