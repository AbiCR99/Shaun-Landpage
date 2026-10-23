// English copy (primary language). Every key here must also exist in es.ts.
// Anything marked "TO CONFIRM" comes from the brief and must be checked with the artist before launch.

export const en = {
  meta: {
    title: 'Shaun Nolanh — Progressive house producer & DJ',
    description:
      'Progressive house producer and DJ from Córdoba, Argentina. Music, Radio Silence sets, booking and collaborations.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main',
    music: 'Music',
    sets: 'Sets',
    about: 'About',
    booking: 'Booking',
    collabs: 'Collabs',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
  },
  hero: {
    tagline: 'Progressive house · Tribal undercurrents · Argentina',
    listen: 'Listen',
    booking: 'Booking',
  },
  music: {
    title: 'Music',
    lead: 'The latest release first. Releases and remixes below.',
    featured: 'Featured',
    releases: 'Releases & remixes',
    remix: 'Remix',
    upcoming: 'Upcoming',
  },
  embed: {
    play: 'Play',
    loadNotice: 'Loads the player from',
  },
  sets: {
    title: 'Radio Silence',
    kicker: 'DJ set series',
    lead: 'A series of DJ sets: [DESCRIPCIÓN PENDIENTE].',
  },
  about: {
    title: 'About',
    // TO CONFIRM: support, upcoming releases and Native Producciones.
    short:
      'Shaun Nolanh is a progressive house producer and DJ from La Falda, in the hills of Córdoba, Argentina. His music takes its time: deep, hypnotic grooves with a tribal pulse underneath, built for the long arc of a night. A trained sound engineer and founder of Native Producciones, he hears every mix with a technician’s ear. His DJ series, Radio Silence, follows that search set by set. Supported by Gai Barone, with upcoming releases alongside Praneeth.D and Stan Seba.',
    more: 'Read full bio',
    long: [
      '[BIO LARGA PENDIENTE]',
      // TO CONFIRM
      'Beyond his own releases, he remixed “Neverl3vel” by Roberto Caceres & Jose Tabarez, and works in mixing, sound design and mentoring other producers.',
    ],
  },
  booking: {
    title: 'Booking',
    lead: 'For club dates, festivals and showcases. Download the press kit or send the details of your event.',
    pressKit: 'Download press kit',
    pressKitPending: 'Press kit',
    emailLabel: 'Or write directly:',
  },
  collabs: {
    title: 'Collabs',
    lead: 'Producer with an idea for a collab or a remix? Send a link to your music and tell me what you have in mind.',
  },
  form: {
    name: 'Name',
    email: 'Email',
    date: 'Event date',
    venue: 'Venue & city',
    message: 'Message',
    musicLink: 'Link to your music',
    proposal: 'Your proposal',
    sendBooking: 'Send request',
    sendCollab: 'Send proposal',
    sending: 'Sending…',
    success: 'Thanks! Your message was sent. I’ll get back to you soon.',
    error: 'Something went wrong. Please try again or write by email.',
    notConfigured: '[FORMULARIO PENDIENTE: falta PUBLIC_WEB3FORMS_KEY]',
    subjectBooking: 'New booking request — shaunnolanh site',
    subjectCollab: 'New collab proposal — shaunnolanh site',
  },
  footer: {
    social: 'Social',
    rights: 'All rights reserved.',
    credits: 'Site: [CRÉDITOS PENDIENTES]',
  },
};

export type Dictionary = typeof en;
