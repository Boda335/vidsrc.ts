import type { VercelRequest, VercelResponse } from "@vercel/node";
import tmdbScrape from "../src/vidsrc.js";
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { tmdb, type, season, episode } = req.query;

    if (!tmdb || !type) {
      return res.status(400).json({ error: "tmdb and type required" });
    }

    const data = await tmdbScrape(
      tmdb as string,
      type as "movie" | "tv",
      season ? Number(season) : undefined,
      episode ? Number(episode) : undefined
    );

    return res.status(200).json(data); // 👈 مهم
  } catch (err) {
  console.error("ERROR:", err); // 👈 ضيف دي

  if (err instanceof Error) {
    return res.status(500).json({ error: err.message });
  } else {
    return res.status(500).json({ error: "Unknown error" });
  }
}
}