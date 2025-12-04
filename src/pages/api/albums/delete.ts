import { ENV } from "@/config/environment";
import { getCurrentUser } from "@/handlers/serverUtils/user.utils";
import { NextApiResponse } from "next";

import { NextApiRequest } from "next";

const deleteSingleAlbum = async (albumId: string, authHeaders: Record<string, string>) => {
  const url = ENV.IMMICH_URL + "/api/albums/" + albumId;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: authHeaders
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to delete album ${albumId}: ${response.status} ${JSON.stringify(errorData)}`);
  }
  
  return { success: true, albumId };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const currentUser = await getCurrentUser(req);
  
  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Build auth headers based on whether using API key or access token
  const authHeaders: Record<string, string> = currentUser.isUsingAPIKey
    ? { 'x-api-key': currentUser.apiKey }
    : { 'Authorization': `Bearer ${currentUser.accessToken}` };

  const { albumIds } = req.body as { albumIds: string[] };
  if (!albumIds || !Array.isArray(albumIds) || albumIds.length === 0) {  
    return res.status(400).json({ error: 'albumIds is required and must be a non-empty array' });
  }

  try {
    const deleteResults = await Promise.all(albumIds.map(async (albumId) => {
      return deleteSingleAlbum(albumId, authHeaders);
    }));
    return res.status(200).json(deleteResults);
  } catch (error: any) {
    console.error('Failed to delete albums:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete albums' });
  }
}
