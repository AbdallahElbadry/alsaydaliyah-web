import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { EPISODES_QUERY } from "@/sanity/lib/queries";
import type { Episode } from "@/types";

/* ─── Mock data — used when Sanity has no episodes yet ─── */
const MOCK_EPISODES: Episode[] = [
  {
    _id: "mock-1",
    title: "The Future of Generic Drug Manufacturing in MENA",
    slug: { current: "future-generic-drug-mena" },
    publishedAt: "2025-03-15T10:00:00Z",
    guestName: "Dr. Ahmed Hassan",
    guestTitle: "VP of Operations, PharmaNile",
    youtubeVideoId: "dQw4w9WgXcQ",
    spotifyLink: "https://open.spotify.com",
  },
  {
    _id: "mock-2",
    title: "Supply Chain Resilience After COVID: What Changed?",
    slug: { current: "supply-chain-resilience" },
    publishedAt: "2025-03-08T10:00:00Z",
    guestName: "Eng. Sara El-Moghazy",
    guestTitle: "Chief Supply Chain Officer, MediGroup",
    youtubeVideoId: "jNQXAC9IVRw",
    spotifyLink: "https://open.spotify.com",
  },
  {
    _id: "mock-3",
    title: "Regulatory Frameworks: Egypt vs. Saudi Arabia vs. UAE",
    slug: { current: "regulatory-frameworks" },
    publishedAt: "2025-03-01T10:00:00Z",
    guestName: "Dr. Layla Mansour",
    guestTitle: "Director of Regulatory Affairs, GulfPharma",
    youtubeVideoId: "9bZkp7q19f0",
    spotifyLink: "https://open.spotify.com",
  },
  {
    _id: "mock-4",
    title: "Building a Pharma Startup from Scratch",
    slug: { current: "pharma-startup" },
    publishedAt: "2025-02-22T10:00:00Z",
    guestName: "Mohamed Tarek",
    guestTitle: "Founder & CEO, Nerhadou Pharma",
    youtubeVideoId: "kJQP7kiw5Fk",
    spotifyLink: "https://open.spotify.com",
  },
  {
    _id: "mock-5",
    title: "AI in Drug Discovery: Hype or Revolution?",
    slug: { current: "ai-drug-discovery" },
    publishedAt: "2025-02-15T10:00:00Z",
    guestName: "Dr. Nadia Karim",
    guestTitle: "Head of R&D, InnoPharm Labs",
    youtubeVideoId: "JGwWNGJdvx8",
    spotifyLink: "https://open.spotify.com",
  },
  {
    _id: "mock-6",
    title: "The Economics of Pharmacy Retail Chains",
    slug: { current: "pharmacy-retail-economics" },
    publishedAt: "2025-02-08T10:00:00Z",
    guestName: "Amr Youssef",
    guestTitle: "Deputy CEO, Al-Ezaby Pharmacy",
    youtubeVideoId: "RgKAFK5djSk",
    spotifyLink: "https://open.spotify.com",
  },
];

/* ─── Data fetching ─── */
async function getEpisodes(): Promise<Episode[]> {
  try {
    const episodes = await client.fetch<Episode[]>(EPISODES_QUERY);
    return episodes && episodes.length > 0 ? episodes : MOCK_EPISODES;
  } catch {
    return MOCK_EPISODES;
  }
}

/* ─── Page Component ─── */
export default async function Home() {
  const episodes = await getEpisodes();

  return (
    <>
      {/* ────── Navbar ────── */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3" id="nav-brand">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-amber-700 flex items-center justify-center">
              <span className="text-background font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Alsaydaliyah
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#episodes"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              id="nav-episodes"
            >
              Episodes
            </a>
            <a
              href="#about"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              id="nav-about"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              id="nav-contact"
            >
              Contact
            </a>
          </div>

          {/* CTA */}
          <a
            href="#episodes"
            className="btn-accent !py-2.5 !px-5 !text-sm"
            id="nav-listen-cta"
          >
            Listen Now
          </a>
        </div>
      </nav>

      {/* ────── Hero Section ────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        id="hero"
      >
        {/* Ambient gradient orbs */}
        <div className="gradient-orb gradient-orb-1" aria-hidden="true" />
        <div className="gradient-orb gradient-orb-2" aria-hidden="true" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Pill Badge */}
          <div className="animate-fade-in-up">
            <span className="pill-badge" id="hero-badge">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              Season 1 Now Streaming
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up animation-delay-100">
            Decoding the
            <br />
            <span className="text-gradient">Pharma Market.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            The premier B2B podcast bringing you inside the closed doors of top
            pharmaceutical management. Hosted by{" "}
            <span className="text-foreground font-medium">
              Dr. Mina Zakaria Fakhry
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <a href="#episodes" className="btn-accent" id="hero-listen-cta">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Listen to Season 1
            </a>
            <a href="#newsletter" className="btn-glass" id="hero-newsletter-cta">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Join the Newsletter
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-12 animate-fade-in-up animation-delay-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24+</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Episodes
              </div>
            </div>
            <div className="w-px h-10 bg-glass-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">50K+</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Listeners
              </div>
            </div>
            <div className="w-px h-10 bg-glass-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">18+</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Industry Guests
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ────── Episodes Section ────── */}
      <section className="relative py-24 px-6" id="episodes">
        <div className="gradient-orb gradient-orb-3" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Latest Episodes
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              Deep dives into the business of pharmaceuticals — strategy,
              regulation, and leadership.
            </p>
          </div>

          {/* Episode grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode, index) => (
              <article
                key={episode._id}
                className={`glass-card group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                id={`episode-card-${episode.slug.current}`}
              >
                {/* Thumbnail */}
                <div className="thumbnail-wrapper">
                  <Image
                    src={`https://img.youtube.com/vi/${episode.youtubeVideoId}/hqdefault.jpg`}
                    alt={episode.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Play overlay */}
                  <div className="play-overlay">
                    <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm">
                      <svg
                        className="w-6 h-6 text-background ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Date */}
                  <time
                    className="text-xs text-muted uppercase tracking-wider"
                    dateTime={episode.publishedAt}
                  >
                    {new Date(episode.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
                    {episode.title}
                  </h3>

                  {/* Guest */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-glass-border flex items-center justify-center text-xs font-medium text-muted">
                      {episode.guestName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {episode.guestName}
                      </div>
                      <div className="text-xs text-muted">
                        {episode.guestTitle}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between">
                    <a
                      href={`https://www.youtube.com/watch?v=${episode.youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      id={`watch-${episode.slug.current}`}
                    >
                      Watch Now
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>

                    {episode.spotifyLink && (
                      <a
                        href={episode.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-foreground transition-colors"
                        aria-label="Listen on Spotify"
                        id={`spotify-${episode.slug.current}`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────── Newsletter Section ────── */}
      <section className="py-24 px-6" id="newsletter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass-card p-12">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-muted max-w-md mx-auto">
              Get notified when new episodes drop. No spam — just pharma
              insights delivered to your inbox.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all text-sm"
                id="newsletter-email"
              />
              <button className="btn-accent !rounded-xl" id="newsletter-submit">
                Subscribe
              </button>
            </div>

            <p className="mt-4 text-xs text-muted/60">
              Join 2,000+ pharma professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ────── Footer ────── */}
      <footer className="border-t border-glass-border py-12 px-6" id="contact">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-amber-700 flex items-center justify-center">
                <span className="text-background font-bold text-xs">A</span>
              </div>
              <span className="font-semibold tracking-tight">
                Alsaydaliyah
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-muted">
              <a
                href="#episodes"
                className="hover:text-foreground transition-colors"
              >
                Episodes
              </a>
              <a
                href="#about"
                className="hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="mailto:hello@alsaydaliyah.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors"
                aria-label="YouTube"
                id="footer-youtube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors"
                aria-label="Spotify"
                id="footer-spotify"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
                id="footer-linkedin"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-glass-border text-center">
            <p className="text-sm text-muted/60">
              © {new Date().getFullYear()} Alsaydaliyah. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
