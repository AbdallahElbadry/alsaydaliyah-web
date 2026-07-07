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
      description: "The video ID from the YouTube URL (e.g. dQw4w9WgXcQ)",
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
