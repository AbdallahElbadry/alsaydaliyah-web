"use client";

import { useState } from "react";

interface Props {
  subscribe: string;
  thankYou: string;
  thankYouNote: string;
}

export default function NewsletterForm({ subscribe, thankYou, thankYouNote }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate a short delay then show thank-you
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
          <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-foreground">{thankYou}</p>
        <p className="text-sm text-muted/70">{thankYouNote}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      noValidate
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-3.5 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/15 transition-all text-sm"
        id="newsletter-email"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-accent !rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        id="newsletter-submit"
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          subscribe
        )}
      </button>
    </form>
  );
}
