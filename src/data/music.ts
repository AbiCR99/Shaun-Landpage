// Music data. Don't invent anything: if a field isn't confirmed, leave it `null`
// and the site shows a placeholder.
//
// CÓMO CARGAR UN TRACK O UN SET (featured y sets):
//   En SoundCloud, Spotify o Mixcloud: Compartir → Copiar link, y pegalo en `link`, entre comillas.
//   También sirve pegar el código <iframe …> de "Embed" completo. La plataforma se detecta sola.
//   Ejemplo: link: 'https://soundcloud.com/shaunnolanhmusic/nombre-del-track',
//   No uses links cortos (on.soundcloud.com, spotify.link): abrilos en el navegador y copiá la URL larga.
//   Si el link no se reconoce, `npm run build` frena y explica qué falta (ver src/data/embed.ts).

export type Embed = {
  /** Track/set link, iframe src or full <iframe> code. `null` = pending. */
  link: string | null;
  /** Shown on the play button. `null` = generic "Play". */
  title: string | null;
};

export type Release = {
  title: string | null;
  artists: string | null;
  label: string | null;
  year: number | null;
  type: 'original' | 'remix';
  upcoming?: boolean;
  url?: string | null;
};

// ─── Carousel (Music): Shaun's own tracks and collaborations, no remixes ───────────────────────
// CÓMO SUMAR UN TEMA: agregalo acá con su link de Spotify (Compartir → Copiar link del tema) y el de
// Beatport si existe, corré `npm run spotify:sync` (baja la portada a src/assets/covers/ y completa
// src/data/spotify-tracks.json) y commiteá todo. Artistas, sello y año van a mano (oEmbed no los da).
export type Track = {
  title: string;
  artists: string;
  label: string | null;
  year: number | null;
  /** open.spotify.com/track/… link. `null` = pending (the player shows "Spotify pending"). */
  spotify: string | null;
  /** beatport.com/track/… link, if any */
  beatport: string | null;
  /** true = keep it out of the carousel */
  hide?: boolean;
};

// Order = carousel order (newest first). Artists/label/year: the artist's Beatport list, Spotify's public
// track pages and the team (2026-10-27): the Hibiki EP (Dublucid) and Sky Burns Gold (independent) aren't on Beatport.
export const tracks: Track[] = [
  {
    title: 'Hibiki',
    artists: 'Shaun Nolanh',
    label: 'Dublucid',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/43rpPSVBGXSS1scP0jHWKz?si=54783f8a7f57467d',
    beatport: null,
  },
  {
    title: 'Hyōka',
    artists: 'Shaun Nolanh',
    label: 'Dublucid',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/5niBezsERwlfrd9w421ZdX?si=611019c185754050',
    beatport: null,
  },
  {
    title: 'Kasumi',
    artists: 'Shaun Nolanh',
    label: 'Dublucid',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/7AlO2k2KmtC6pmjkp8QKbX?si=238f9dd0c5594c9d',
    beatport: null,
  },
  {
    title: 'Sky Burns Gold',
    artists: 'Shaun Nolanh',
    label: 'Independent',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/6mQ9MUjChsWguS0CQNRqEJ?si=7b7ac38699024580',
    beatport: null,
  },
  {
    title: 'Ultimate Desire',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/5n0dnHkn5EGkn94bTcSPb9?si=396b59c2c3074ac4',
    beatport: null,
  },
  {
    title: 'Case 701',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/00zcWZKX4Wf691ySTqK9tK?si=ef60861a82db486d',
    beatport: 'https://www.beatport.com/track/case-701/30654526',
  },
  {
    title: 'I Drove All Night to Feel This',
    artists: 'Shaun Nolanh',
    label: 'BBop Music',
    year: 2026,
    spotify: 'https://open.spotify.com/intl-es/track/5Xd1cOtJfvpVCzQig19BhB?si=f56e0b6b06814488',
    beatport: null,
  },
  {
    title: 'Chrome Butterflies',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/0mkoBLHcXAdSfyoMpBQkSf?si=b9ac0c0c52024960',
    beatport: null,
  },
  {
    title: 'Magnetic Bloom',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/7JiOIgYYJkbn6vboNKhk33?si=6cc37983bd3240e3',
    beatport: null,
  },
  {
    title: 'Through the Loss',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/6cgNUmAWqONB6UKGfObRUe?si=13dfb5c2df294ac1',
    beatport: 'https://www.beatport.com/track/through-the-loss/22465564',
  },
  {
    title: '300 Mg',
    artists: 'Shaun Nolanh',
    label: 'Mustache Crew Records',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/7tHv1n8k9h7ZLupRcJTeq6?si=117ebc8225034d47',
    beatport: null,
  },
  {
    title: 'Innocent Spt',
    artists: 'Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/0Y1UkChFJECfD3NpKSQVBU?si=678361d3fa3f49c6',
    beatport: 'https://www.beatport.com/track/innocent-spt/30470069',
  },
  {
    title: 'Groove You Wish You Made',
    artists: 'Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    spotify: 'https://open.spotify.com/intl-es/track/7Max98kkWKi1h9PQTTh8Lh?si=a428123d030a43de',
    beatport: null,
  },
];

/** The carousel starts on this title. */
export const initialTrack = 'Case 701';

/** File name for a track's cover in src/assets/covers/ (shared by the sync script and the carousel). */
export const coverSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Featured tracks, in the artist's order. The first one holds Music's light (the hand's ember passes to it).
// Embed codes pasted by the team from each Beatport track page (Share → Embed).
export const featured: Embed[] = [
  {
    link: '<iframe src="https://embed.beatport.com/?id=30654526&type=track" width="100%" height="162" frameborder="0" scrolling="no" style="max-width:600px;"></iframe>',
    title: 'Case 701',
  },
  {
    link: '<iframe src="https://embed.beatport.com/?id=29208623&type=track" width="100%" height="162" frameborder="0" scrolling="no" style="max-width:600px;"></iframe>',
    title: 'Through the Loss',
  },
  {
    link: '<iframe src="https://embed.beatport.com/?id=30470069&type=track" width="100%" height="162" frameborder="0" scrolling="no" style="max-width:600px;"></iframe>',
    title: 'Innocent Spt',
  },
];

// From the artist's Beatport track list (pasted by the team, 2026-10-25): one row per song,
// with the label and year of its FIRST release (reissues and compilations left out). Newest first.
// `url` only where the Beatport track id is known; everything else links via the artist profile below the list.
export const beatportProfile = 'https://www.beatport.com/artist/shaun-nolanh/1291888';

export const releases: Release[] = [
  // Upcoming (not on Beatport yet)
  { title: 'Neverl3vel (Shaun Nolanh Remix)', artists: 'Roberto Caceres & Jose Tabarez', label: null, year: null, type: 'remix', upcoming: true },
  { title: null, artists: 'Shaun Nolanh & Praneeth.D', label: null, year: null, type: 'original', upcoming: true },
  // Released
  { title: 'Ultimate Desire', artists: 'Stan Seba, Shaun Nolanh', label: '3rd Avenue', year: 2026, type: 'original' },
  {
    title: 'Case 701',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2026,
    type: 'original',
    url: 'https://www.beatport.com/track/case-701/30654526',
  },
  { title: "Paul's Tape (Shaun Nolanh Remix)", artists: 'Valentín Ciancio', label: '3rd Avenue', year: 2026, type: 'remix' },
  { title: 'I Drove All Night to Feel This', artists: 'Shaun Nolanh', label: 'BBop Music', year: 2026, type: 'original' },
  { title: 'Chrome Butterflies', artists: 'Stan Seba, Shaun Nolanh', label: '3rd Avenue', year: 2025, type: 'original' },
  { title: 'Magnetic Bloom', artists: 'Stan Seba, Shaun Nolanh', label: '3rd Avenue', year: 2025, type: 'original' },
  {
    title: 'Through the Loss',
    artists: 'Stan Seba, Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    type: 'original',
    url: 'https://www.beatport.com/track/through-the-loss/22465564',
  },
  { title: '300 Mg', artists: 'Shaun Nolanh', label: 'Mustache Crew Records', year: 2025, type: 'original' },
  {
    title: 'Innocent Spt',
    artists: 'Shaun Nolanh',
    label: '3rd Avenue',
    year: 2025,
    type: 'original',
    url: 'https://www.beatport.com/track/innocent-spt/30470069',
  },
  { title: 'Groove You Wish You Made', artists: 'Shaun Nolanh', label: '3rd Avenue', year: 2025, type: 'original' },
];

export type DjSet = Embed & { date: string | null; venue: string | null };

// Radio Silence: 2–3 featured sets. The first one is the section's "light source".
export const sets: DjSet[] = [
  {
    // Embed code pasted by the team (SoundCloud → Share → Embed); toEmbed restyles it in the site's palette.
    link: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2407457895&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
    title: 'Radio Silence – Best Warm Up',
    date: null,
    venue: null,
  },
  { link: null, title: null, date: null, venue: null },
  { link: null, title: null, date: null, venue: null },
];
