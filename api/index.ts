import tmdbScrape from '../src/vidsrc.js';   // أو حسب مسارك

export default async function handler(req: any, res: any) {
  const { tmdbId, type, season, episode } = req.query;

  if (!tmdbId || !type) {
    return res.status(400).json({ error: "Missing tmdbId or type" });
  }

  try {
    const data = await tmdbScrape(
      tmdbId,
      type,
      season ? Number(season) : undefined,
      episode ? Number(episode) : undefined
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape" });
  }
}