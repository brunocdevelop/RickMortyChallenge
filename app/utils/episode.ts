import { Episode } from "types/episode"

interface ApiEpisode {
  id: number
  name: string
  air_date: string
  episode: string
}

export function parseEpisode(raw: ApiEpisode): Episode {
  const match = raw.episode.match(/S(\d+)E(\d+)/)
  return {
    id: raw.id,
    name: raw.name,
    air_date: raw.air_date,
    season: match ? parseInt(match[1], 10) : 0,
    episode: match ? parseInt(match[2], 10) : 0,
    episodeCode: raw.episode,
  }
}
