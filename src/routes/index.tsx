import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EzioCloud — Hyper-Engine" },
      { name: "description", content: "Start the EzioCloud Hyper-Engine and proceed." },
      { property: "og:title", content: "EzioCloud — Hyper-Engine" },
      { property: "og:description", content: "Start the EzioCloud Hyper-Engine and proceed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Phase = "idle" | "spinning" | "active";

function Windmill() {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    let angle = 0, speed = 0.5, raf = 0;
    const tick = () => {
      speed = Math.min(speed * 1.02 + 0.05, 40);
      angle = (angle + speed) % 360;
      ref.current?.setAttribute("transform", `rotate(${angle} 100 100)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg viewBox="0 0 200 260" className="windmill-glow h-64 w-52" aria-label="Windmill">
      <polygon points="92,100 108,100 125,255 75,255" className="fill-muted-foreground" />
      <g ref={ref}>
        {[0, 90, 180, 270].map((r) => (
          <path key={r} d="M100 100 L92 20 Q100 8 108 20 Z" transform={`rotate(${r} 100 100)`} className="fill-primary" />
        ))}
        <circle cx="100" cy="100" r="9" className="fill-foreground" />
      </g>
    </svg>
  );
}

function Index() {
  const [phase, setPhase] = useState<Phase>("idle");
  useEffect(() => {
    if (phase !== "spinning") return;
    const t = setTimeout(() => setPhase("active"), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <main className="hero-bg flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
      <div>
        <h1 className="text-6xl font-black tracking-tight glow-text text-foreground md:text-8xl">
          Ezio<span className="text-primary">Cloud</span>
        </h1>
        <p className="mt-4 text-muted-foreground">Powered by the Hyper-Engine</p>
      </div>

      {phase === "idle" && (
        <button onClick={() => setPhase("spinning")} className="engine-btn rounded-full bg-primary px-10 py-5 text-lg font-bold uppercase tracking-widest text-primary-foreground">
          Start EzioCloud Hyper-Engine
        </button>
      )}

      {phase !== "idle" && (
        <div className="flex flex-col items-center gap-6">
          <Windmill />
          {phase === "spinning" ? (
            <p className="animate-pulse font-semibold text-primary">Spinning up Hyper-Engine…</p>
          ) : (
            <>
              <p className="font-semibold text-foreground">Hyper-Engine active ✓</p>
              <button className="engine-btn rounded-full bg-primary px-10 py-4 font-bold uppercase tracking-widest text-primary-foreground">
                Proceed →
              </button>
            </>
          )}
        </div>
      )}
    </main>
  );
}
