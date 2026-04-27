import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import animeFieldVideo from "@/assets/anime-field.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Lumos AI — Your personal AI creation studio" },
      {
        name: "description",
        content:
          "Bring your own API keys. Generate images and videos with ready-made templates. One-time purchase, no subscriptions.",
      },
      { property: "og:title", content: "Lumos AI — Your personal AI creation studio" },
      {
        property: "og:description",
        content:
          "Bring your own API keys. Generate images and videos with ready-made templates. One-time purchase, no subscriptions.",
      },
    ],
  }),
});

// AI-generated anime-style green field with wind and animals
const VIDEO_SRC = animeFieldVideo.url;

function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setSubmitting(true);
    // Frontend-only for now. Wire to a server route + Google Sheets later.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >

        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Soft dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-end justify-center px-4 pb-8 pt-6 sm:items-center sm:px-6 sm:py-10">
        <div className="glass-card mx-auto w-full max-w-[22rem] rounded-2xl p-5 text-white sm:max-w-lg sm:rounded-3xl sm:p-10">
          {!submitted ? (
            <>
              <h1 className="font-display text-center text-3xl tracking-tight sm:text-5xl">
                Lumos AI
              </h1>
              <p className="mx-auto mt-2 max-w-md text-center text-[13px] font-light leading-relaxed text-white/80 sm:mt-4 sm:text-base">
                Your personal AI creation studio. Bring your own API keys. Generate images and
                videos with ready-made templates. One-time purchase, no subscriptions.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="glass-input w-full rounded-lg px-3.5 py-2.5 text-sm text-white sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="glass-input w-full rounded-lg px-3.5 py-2.5 text-sm text-white sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                />

                {error && (
                  <p className="text-center text-xs text-red-200/90 sm:text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="glow-button mt-1 w-full rounded-lg px-5 py-2.5 text-sm font-medium tracking-wide sm:mt-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
                >
                  {submitting ? "Sending…" : "Get Early Access"}
                </button>
              </form>

              <p className="mt-3 text-center text-[11px] font-light text-white/50 sm:mt-5 sm:text-xs">
                No spam. We'll only email you when Lumos is ready.
              </p>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                <svg
                  className="h-7 w-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold sm:text-3xl">You're on the list</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">
                Thanks, {name.split(" ")[0]}. We'll reach out at{" "}
                <span className="text-white">{email}</span> as soon as early access opens.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
