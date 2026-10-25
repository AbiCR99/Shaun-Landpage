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

export const featured: Embed = { link: null, title: null };

export const releases: Release[] = [
  // TO CONFIRM with the artist: title of the remix, label and year.
  {
    title: 'Neverl3vel (Shaun Nolanh Remix)',
    artists: 'Roberto Caceres & Jose Tabarez',
    label: null,
    year: null,
    type: 'remix',
  },
  // TO CONFIRM: upcoming collaborations mentioned in the brief.
  { title: null, artists: 'Shaun Nolanh & Praneeth.D', label: null, year: null, type: 'original', upcoming: true },
  { title: null, artists: 'Shaun Nolanh & Stan Seba', label: null, year: null, type: 'original', upcoming: true },
];

export type DjSet = Embed & { date: string | null; venue: string | null };

// Radio Silence: 2–3 featured sets. The first one is the section's "light source".
export const sets: DjSet[] = [
  { link: null, title: null, date: null, venue: null },
  { link: null, title: null, date: null, venue: null },
  { link: null, title: null, date: null, venue: null },
];
