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
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="glass-card w-full max-w-md rounded-3xl p-6 text-white sm:max-w-lg sm:p-10">
          {!submitted ? (
            <>
              <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
                Lumos AI
              </h1>
              <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/80 sm:text-base">
                Your personal AI creation studio. Bring your own API keys. Generate images and
                videos with ready-made templates. One-time purchase, no subscriptions.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="glass-input w-full rounded-xl px-4 py-3 text-base text-white"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="glass-input w-full rounded-xl px-4 py-3 text-base text-white"
                />

                {error && (
                  <p className="text-center text-sm text-red-200/90">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="glow-button mt-2 w-full rounded-xl px-6 py-3 text-base font-semibold tracking-wide"
                >
                  {submitting ? "Sending…" : "Get Early Access"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-white/50">
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
