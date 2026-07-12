import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { EPISODES_QUERY } from "@/sanity/lib/queries";
import type { Episode } from "@/types";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import Navbar from "./components/Navbar";

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
    youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    spotifyLink: "https://open.spotify.com",
    applePodcastLink: "https://podcasts.apple.com",
    status: "published"
  },
  {
    _id: "mock-2",
    title: "Supply Chain Resilience After COVID: What Changed?",
    slug: { current: "supply-chain-resilience" },
    publishedAt: "2025-03-08T10:00:00Z",
    guestName: "Eng. Sara El-Moghazy",
    guestTitle: "Chief Supply Chain Officer, MediGroup",
    youtubeVideoId: "jNQXAC9IVRw",
    youtubeLink: "https://youtube.com/watch?v=jNQXAC9IVRw",
    spotifyLink: "https://open.spotify.com",
    applePodcastLink: "https://podcasts.apple.com",
    status: "upcoming",
    airDate: "2025-12-01T10:00:00Z"
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
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const episodes = await getEpisodes();

  return (
    <>
      {/* ────── Navbar ────── */}
      <Navbar lang={lang as Locale} dict={dict.nav} />

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
              {dict.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.2] animate-fade-in-up animation-delay-100">
            {dict.hero.headlineTop}
            <br />
            <span className="text-gradient">{dict.hero.headlineBottom}</span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            {dict.hero.subtitle}{" "}
            <span className="text-foreground font-medium">
              {dict.hero.hostName}
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
              {dict.hero.ctaListen}
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
              {dict.hero.ctaNewsletter}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 animate-fade-in-up animation-delay-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{dict.hero.statEpisodes}</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                {dict.hero.statEpisodesLabel}
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-glass-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{dict.hero.statListeners}</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                {dict.hero.statListenersLabel}
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-glass-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{dict.hero.statGuests}</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                {dict.hero.statGuestsLabel}
              </div>
            </div>
          </div>

          {/* Promo Video */}
          <div className="mt-16 animate-fade-in-up animation-delay-500 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden glass-card p-2 shadow-2xl relative z-20" id="hero-promo-video">
            <div className="relative pt-[56.25%] w-full h-0 rounded-xl overflow-hidden bg-black/50">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/X1hdO7TOrS4?autoplay=0"
                title="Podcast Promo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
              {dict.episodes.title}
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              {dict.episodes.subtitle}
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
                    src={episode.thumbnail || (episode.youtubeVideoId ? `https://img.youtube.com/vi/${episode.youtubeVideoId}/hqdefault.jpg` : "/dr-mina.jpg")}
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
                  {/* Date / Air Date */}
                  <time
                    className="text-xs text-muted uppercase tracking-wider flex items-center gap-1.5"
                    dateTime={episode.status === "upcoming" && episode.airDate ? episode.airDate : episode.publishedAt}
                  >
                    {episode.status === "upcoming" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {dict.episodes.airDateLabel}
                      </span>
                    )}
                    {new Date(episode.status === "upcoming" && episode.airDate ? episode.airDate : episode.publishedAt).toLocaleDateString(dict.episodes.dateLocale, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  {/* Title */}
                  <h3 className="mt-3 text-lg font-semibold leading-snug line-clamp-2 group-hover:text-foreground/80 transition-colors duration-200">
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
                    {episode.youtubeLink || episode.youtubeVideoId ? (
                      <a
                        href={episode.youtubeLink || `https://www.youtube.com/watch?v=${episode.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted transition-colors"
                        id={`watch-${episode.slug.current}`}
                      >
                        {dict.episodes.watchNow}
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
                    ) : (
                      <div className="text-sm font-medium text-muted">{episode.status === 'upcoming' ? 'Coming Soon' : ''}</div>
                    )}

                    <div className="flex items-center gap-3">
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
                      {episode.applePodcastLink && (
                        <a
                          href={episode.applePodcastLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground transition-colors"
                          aria-label="Listen on Apple Podcasts"
                          id={`apple-${episode.slug.current}`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.15 1.56c-.22-.05-.44-.06-.66-.02-.85.15-1.68.6-2.3 1.26-.6.64-1.05 1.48-1.15 2.37-.02.2-.01.4.03.6.86-.06 1.7-.51 2.32-1.18.63-.67 1.04-1.54 1.13-2.45.02-.2.01-.4-.03-.58zm-2.73 4.28c-1.33.02-2.57.73-3.23 1.86-.98 1.68-.82 3.8.38 5.37.58.77 1.25 1.46 2 2.05.6.48 1.23.95 1.95.96.65 0 1.27-.27 1.84-.46.54-.18 1.06-.35 1.55-.35.5 0 1.02.17 1.56.35.56.19 1.18.45 1.82.46.72.01 1.34-.48 1.94-.96.76-.59 1.43-1.28 2.02-2.05.41-.54.76-1.14 1.04-1.78-.96-.4-1.77-1.14-2.22-2.06-.51-1.05-.56-2.27-.12-3.34.42-.98 1.18-1.76 2.1-2.2-1.02-1.3-2.5-2.08-4.08-2.06-1.2.02-2.36.43-3.4 1.02-.4.23-.77.46-1.1.46-.35 0-.7-.22-1.1-.45-1-.58-2.14-1-3.33-1.03h-.01zM12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────── About Section ────── */}
      <section className="py-24 px-6" id="about">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {dict.about.title}
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto">
              {dict.about.subtitle}
            </p>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Portrait */}
              <div className="lg:col-span-2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[560px]">
                <Image
                  src="/dr-mina.jpg"
                  alt="Dr. Mina Zakaria Fakhry"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Gradient overlay on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0a]/80" />
              </div>

              {/* Bio content */}
              <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                {/* Title pill */}
                <span className="pill-badge w-fit mb-6">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {dict.about.badgeTitle}
                </span>

                {/* Name */}
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  {dict.about.hostName}
                </h3>

                {/* Role */}
                <p className="mt-2 text-foreground/80 font-medium text-lg">
                  {dict.about.hostRole}
                </p>

                {/* Credentials */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-xs font-medium text-muted">
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                    </svg>
                    {dict.about.credDBA}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-xs font-medium text-muted">
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                    </svg>
                    {dict.about.credMBA}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-xs font-medium text-muted">
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    {dict.about.credRole}
                  </span>
                </div>

                {/* Bio paragraphs */}
                <div className="mt-6 space-y-4 text-muted leading-relaxed text-[15px]">
                  <p dangerouslySetInnerHTML={{ __html: dict.about.bio1 }} />
                  <p dangerouslySetInnerHTML={{ __html: dict.about.bio2 }} />
                  <p>
                    <span dangerouslySetInnerHTML={{ __html: dict.about.bio3prefix }} />{" "}
                    <span className="text-foreground font-medium" dangerouslySetInnerHTML={{ __html: dict.about.bio3highlight }} />{" "}
                    <span dangerouslySetInnerHTML={{ __html: dict.about.bio3suffix }} />
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#episodes" className="btn-accent !text-sm !py-3 !px-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    {dict.about.ctaListen}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mina-zakaria-fakhry-head-of-marketing-dba-ama-google-udacity-pharma-industry-leader/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass !text-sm !py-3 !px-6"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {dict.about.ctaLinkedIn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────── Newsletter Section ────── */}
      <section className="py-24 px-6" id="newsletter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass-card p-12">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight">
              {dict.newsletter.title}
            </h2>
            <p className="mt-4 text-muted max-w-md mx-auto">
              {dict.newsletter.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={dict.newsletter.placeholder}
                className="flex-1 px-5 py-3.5 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/15 transition-all text-sm"
                id="newsletter-email"
              />
              <button className="btn-accent !rounded-xl" id="newsletter-submit">
                {dict.newsletter.subscribe}
              </button>
            </div>

            <p className="mt-4 text-xs text-muted/60">
              {dict.newsletter.note}
            </p>
          </div>
        </div>
      </section>

      {/* ────── Footer ────── */}
      <footer className="border-t border-glass-border py-12 px-6" id="contact">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <Image
                src="/logo-transparent.png"
                alt={lang === "ar" ? "الصيدلية بودكاست" : "Alsaydaliyah"}
                width={120}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-muted">
              <a
                href="#episodes"
                className="hover:text-foreground transition-colors"
              >
              {dict.footer.episodes}
              </a>
              <a
                href="#about"
                className="hover:text-foreground transition-colors"
              >
              {dict.footer.about}
              </a>
              <a
                href="mailto:hello@alsaydaliyah.com"
                className="hover:text-foreground transition-colors"
              >
              {dict.footer.contact}
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted hover:text-foreground transition-colors"
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
                className="text-muted hover:text-foreground transition-colors"
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
                href="https://www.linkedin.com/in/mina-zakaria-fakhry-head-of-marketing-dba-ama-google-udacity-pharma-industry-leader/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
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
              © {new Date().getFullYear()} {dict.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
