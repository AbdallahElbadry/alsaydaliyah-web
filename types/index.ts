export interface Episode {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  guestName: string;
  guestTitle: string;
  youtubeVideoId: string;
  spotifyLink?: string;
}
