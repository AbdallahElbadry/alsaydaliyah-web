import { defineQuery } from "next-sanity";

export const EPISODES_QUERY = defineQuery(
  `*[_type == "episode"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    publishedAt,
    guestName,
    guestTitle,
    youtubeVideoId,
    spotifyLink
  }`
);
