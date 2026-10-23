// Music data. Don't invent anything: if a field isn't confirmed, leave it `null`
// and the site shows a placeholder.

export type Provider = 'soundcloud' | 'spotify';

export type Embed = {
  provider: Provider;
  /** Full iframe `src` copied from the platform's "Share → Embed" dialog. */
  src: string | null;
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

export const featured: Embed = { provider: 'soundcloud', src: null, title: null };

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
  { provider: 'soundcloud', src: null, title: null, date: null, venue: null },
  { provider: 'soundcloud', src: null, title: null, date: null, venue: null },
  { provider: 'soundcloud', src: null, title: null, date: null, venue: null },
];
