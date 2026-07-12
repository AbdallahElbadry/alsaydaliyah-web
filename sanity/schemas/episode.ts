import { defineField, defineType } from "sanity";

export const episode = defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guestName",
      title: "Guest Name",
      type: "string",
    }),
    defineField({
      name: "guestTitle",
      title: "Guest Title",
      type: "string",
      description: 'e.g. "Deputy CEO, Nerhadou"',
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube Video ID",
      type: "string",
      description: "The video ID from the YouTube URL (e.g. dQw4w9WgXcQ) - used for auto-generated thumbnails if no custom thumbnail is provided",
    }),
    defineField({
      name: "youtubeLink",
      title: "YouTube Link",
      type: "url",
    }),
    defineField({
      name: "spotifyLink",
      title: "Spotify Link",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "applePodcastLink",
      title: "Apple Podcasts Link",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload a custom thumbnail for the episode (falls back to YouTube thumbnail if not provided)",
    }),
    defineField({
      name: "status",
      title: "Episode Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Upcoming", value: "upcoming" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
    defineField({
      name: "airDate",
      title: "Air Date (for upcoming episodes)",
      type: "datetime",
      hidden: ({ document }) => document?.status !== "upcoming",
    }),
    defineField({
      name: "showNotes",
      title: "Show Notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "guestName",
    },
  },
});
