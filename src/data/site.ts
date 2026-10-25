// Site-wide data. `null` means "we don't have it yet": components show a visible placeholder.

export const site = {
  name: 'Shaun Nolanh',
  /** e.g. '/press-kit/shaun-nolanh-press-kit.pdf' (see public/press-kit/README.md) */
  pressKitUrl: null as string | null,
  /** Booking email. It's never printed in the HTML as plain text (see ObfuscatedEmail). */
  bookingEmail: null as string | null,
};

export type SocialLink = { name: string; url: string | null };

export const socials: SocialLink[] = [
  { name: 'SoundCloud', url: 'https://soundcloud.com/shaunnolanhmusic' },
  { name: 'Spotify', url: null },
  { name: 'Beatport', url: 'https://www.beatport.com/artist/shaun-nolanh/1291888' },
  { name: 'Instagram', url: null },
  { name: 'Resident Advisor', url: null },
  { name: 'Mixcloud', url: null },
];
