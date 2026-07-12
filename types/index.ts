export interface Episode {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  guestName: string;
  guestTitle: string;
  youtubeVideoId?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  applePodcastLink?: string;
  thumbnail?: string;
  status?: "published" | "upcoming";
  airDate?: string;
}
