import type { VercelRequest, VercelResponse } from '@vercel/node';
import tmdbScrape from '../src/vidsrc.js';   // غير المسار لو لازم

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { tmdbId, type = "movie", season, episode } = req.query;

  if (!tmdbId) {
    return res.status(400).json({ 
      error: "tmdbId is required",
      example: "/api/scrape?tmdbId=603692&type=movie"
    });
  }

  try {
    const result = await tmdbScrape(
      String(tmdbId),
      type as "movie" | "tv",
      season ? Number(season) : undefined,
      episode ? Number(episode) : undefined
    );

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ 
      error: "Failed to scrape vidsrc",
      message: error?.message || "Unknown error"
    });
  }
}