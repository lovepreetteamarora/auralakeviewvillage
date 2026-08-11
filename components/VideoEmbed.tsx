"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play facade for the Vimeo film.
 *
 * The iframe is not rendered until the visitor asks for it. An embedded player
 * costs several hundred kilobytes of third-party JavaScript and sets cookies on
 * load, which on a page whose whole job is the hero and the form is a bad trade
 * for something most visitors never press. A poster and a button cost one image
 * we already ship.
 *
 * `dnt=1` asks Vimeo not to track the session; it is honoured by their player
 * and costs nothing.
 */
export function VideoEmbed({
  vimeoId,
  title,
  poster,
  posterAlt,
}: {
  vimeoId: string;
  title: string;
  poster: string;
  posterAlt: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover opacity-70 transition group-hover:opacity-60"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-lime shadow-xl transition group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-ink">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span
            aria-hidden="true"
            className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-left"
          >
            <span className="eyebrow block text-lime">Watch the film</span>
            <span className="mt-1 block font-serif text-xl text-white sm:text-2xl">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
