// Turns whatever gets pasted into `link` (src/data/music.ts) into a player the facade can load:
// a normal SoundCloud / Spotify / Mixcloud link, the iframe `src`, or the whole `<iframe …>` embed code.
// Runs at build time: an unknown or short link stops the build with a clear message.

export type Provider = 'soundcloud' | 'spotify' | 'mixcloud';

export type Player = {
  provider: Provider;
  /** Display name, for the "Loads the player from …" note */
  name: string;
  /** iframe src (autoplay is added on click, in Embed.astro) */
  src: string;
  /** iframe height in px, reserved by the facade so nothing jumps */
  height: number;
};

const SHORT_LINKS = ['on.soundcloud.com', 'spotify.link', 'm.mixcloud.com'];

export function toEmbed(input: string): Player {
  const raw = extractUrl(input.trim());
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`[embed] Not a link: "${input}". Paste the track/set link (Share → Copy link) or the embed code.`);
  }
  const host = url.hostname.replace(/^www\./, '');

  if (SHORT_LINKS.includes(host)) {
    throw new Error(
      `[embed] Short link "${raw}" can't be resolved at build time. Open it in the browser and paste the long URL instead.`,
    );
  }

  // SoundCloud: the widget URL as is, or a track/set page wrapped in the widget
  if (host === 'w.soundcloud.com') return { provider: 'soundcloud', name: 'SoundCloud', src: url.href, height: 166 };
  if (host === 'soundcloud.com' || host === 'm.soundcloud.com') {
    const page = `https://soundcloud.com${url.pathname.replace(/\/$/, '')}`;
    const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(page)}&visual=false&show_comments=false`;
    return { provider: 'soundcloud', name: 'SoundCloud', src, height: 166 };
  }

  // Spotify: open.spotify.com/(intl-xx/)(embed/)<type>/<id>
  if (host === 'open.spotify.com') {
    const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
    if (match) {
      const [, type, id] = match;
      const compact = type === 'track' || type === 'episode';
      return { provider: 'spotify', name: 'Spotify', src: `https://open.spotify.com/embed/${type}/${id}`, height: compact ? 152 : 352 };
    }
  }

  // Mixcloud: the widget URL as is, or a show page (/<user>/<show>/) as the widget feed
  if (host === 'player-widget.mixcloud.com') return { provider: 'mixcloud', name: 'Mixcloud', src: url.href, height: 120 };
  if (host === 'mixcloud.com') {
    const feed = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    const src = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=${encodeURIComponent(feed)}`;
    return { provider: 'mixcloud', name: 'Mixcloud', src, height: 120 };
  }

  throw new Error(`[embed] Unsupported link "${raw}". Use a SoundCloud, Spotify or Mixcloud link.`);
}

/** Accepts a bare URL or a pasted `<iframe src="…">` and returns the URL. */
function extractUrl(input: string): string {
  const src = input.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? input;
  return src.replace(/&amp;/g, '&');
}
