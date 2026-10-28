# CLAUDE.md — Shaun Nolanh

Landing page / EPK de **Shaun Nolanh**, un productor y DJ argentino radicado en La Falda. Su sonido se inscribe en el progressive house, con un perfil tribal y percusivo: grooves rodantes, bajos profundos y atmósferas que se van desarrollando a lo largo del set. Entre sus influencias se encuentran Robert Babicz y Roy Rosenfeld.
Su trabajo recibió el apoyo de Gai Barone, leyenda italiana y una de las figuras de referencia del progressive house a nivel mundial, con más de 650 producciones publicadas en sellos como Renaissance, Armada, Perfecto y Black Hole Recordings.
En 2025 debutó en 3rd Avenue, sello del grupo belga Sound Avenue dirigido por Madloch, con dos temas originales en la serie Three Of A Kind #033. Ese mismo año volvió al catálogo con Chrome Butterflies EP, un trabajo de tres temas junto a Stan Seba, productor alemán radicado en Corea del Sur y artista habitual del grupo Sound Avenue. En 2026 publicó “I Drove All Night to Feel This” en el sello británico BBop Music. También firmó un remix de “Paul’s Tape” de Valentin Ciancio, para 3rd Avenue, un lanzamiento que fue reseñado por el portal internacional Electronic Groove.
Entre sus próximos lanzamientos se encuentran nuevas colaboraciones con Stan Seba y con Praneeth.D, DJ y productor de Colombo, Sri Lanka, con trabajos en sellos como BCSA y 3rd Avenue.

## Stack y estructura

- Astro (sitio estático) con CSS propio, sin framework de UI. Deploy en Vercel.
- Bilingüe: EN es el idioma principal y va en `/`; ES va en `/es/`.
- `src/pages/index.astro` y `src/pages/es/index.astro` renderizan `src/components/HomePage.astro` y solo le pasan el prop `lang`.
- Cada sección recibe `lang` y llama a `useTranslations(lang)` (`src/i18n/utils.ts`). El ruteo usa el i18n nativo de Astro (`prefixDefaultLocale: false`). `Base.astro` emite el canonical y los `hreflang`.
- JS mínimo, en un `<script>` inline chico dentro de cada componente: menú mobile, carga de embeds, envío de formularios y email ofuscado. La bio larga usa `<details>`, sin JS.
- Al recargar o volver con atrás/adelante, la página arranca arriba (script `is:inline` al principio del `<head>` en `Base.astro`): la historia de la mano se lee de arriba abajo. Un link nuevo con `#sección` se respeta y la bfcache no se toca.

## Convenciones

- Responder en español. Código e identificadores en inglés. Explicar el porqué de cada decisión.
- **Todo el texto visible vive en `src/i18n/en.ts` / `es.ts`.** Nunca hardcodear texto en componentes.
- El español es rioplatense (voseo) y se escribe directamente en español, no como traducción literal del inglés.
- Mobile first: el hero entra completo en 375×667 y no puede haber scroll horizontal.

## Datos y contenido

- `src/data/site.ts`: URL del press kit, email de booking y redes. `src/data/music.ts`: lanzamientos del carrusel, remixes/próximos y sets de Radio Silence.
- **`null` significa "todavía no confirmado".** El componente muestra entonces un marcador visible, por ejemplo `<span class="pending">[RELEASE PENDIENTE]</span>`.
- Nunca inventar releases, sellos, fechas, supports ni citas. Si un dato no está confirmado, el campo queda en `null`.
- Los archivos de i18n son TS, no JSON, para poder dejar comentarios "TO CONFIRM" al lado de los datos sin verificar.

## Diseño "luz en la oscuridad" (fácil equivocarse)

- `src/styles/tokens.css` tiene la **paleta cerrada de 11 colores**, la escala tipográfica y el espaciado. No agregar colores ni escribir hex en otros archivos: usar los tokens, y `color-mix()` para transparencias.
- Dominan los azules noche. **El naranja (`--glow-*`) es escaso: una sola fuente de luz por sección.** `.btn--glow` o el prop `glow` va como máximo una vez por sección:
  - Hero = la brasa del cigarrillo de la escena de la mano (no hay botones en el hero; el glow del horizonte es azul: no compite). Cuando el cigarrillo cae detrás de las portadas, la luz pasa al play de Music.
  - Music = botón de la fachada del reproductor de Spotify (debajo del carrusel)
  - Sets = primer set
  - Booking = press kit
  - Collabs = enviar
- El texto va en `--moon-100` (crema), nunca en blanco puro; el secundario, en `--fog-300`. Nunca texto naranja chico sobre azul medio. Contraste WCAG AA (≥ 4.5:1).
- Fuentes self-hosted con `@fontsource-variable`: Unbounded (display), Manrope (texto) y JetBrains Mono (datos, píldoras, etiquetas). Solo se precarga el subset latin de Unbounded.
- Utilidades compartidas en `global.css`: `.container`, `.section`, `.section--alt`, `.section__head`, `.pill`, `.mono`, `.btn`, `.pending`, `.visually-hidden` y el grano de película en `body::after`.
- Los glows van con `radial-gradient`, no con `box-shadow`. La aberración cromática va solo en el nombre del hero y solo en hover.

## Animaciones (fácil equivocarse)

- Solo `transform`, `opacity` y `filter` (acotado). Easing: `--ease-slow` en entradas; `ease-in-out` en loops; `linear` en animaciones atadas al scroll (el scroll ya marca el ritmo).
- **El naranja no aparece en animaciones**, salvo la brasa que respira en el play destacado (`Embed.astro`) y la chispa al enviar un formulario (`ContactForm.astro`).
- Atadas al scroll: `animation-timeline: view()` / un `view-timeline-name` dentro de `@supports (animation-timeline: view())`. Fallback para Firefox con `src/scripts/reveal.ts` (IntersectionObserver). **El estado oculto lo agrega solo JS** (`data-reveal`): sin JS, todo se ve.
- **Escribir `animation-name` / `-timing-function` / `-fill-mode` / `-timeline` por separado**: el minificador junta `animation` + `animation-timeline` en un shorthand que los navegadores descartan.
- `prefers-reduced-motion`: cada animación con `animation: none` explícito y en su estado final (la regla global de duración no frena las atadas al scroll). El header no se oculta.
- Cambio de idioma con View Transitions nativas (`@view-transition` en `global.css`). **No usar `<ClientRouter />`**: cambia cómo corren los scripts inline.
- Nada de clichés de "web de DJ": neón violeta, ecualizadores de stock, fotos de bandejas con humo. Las imágenes de referencia son solo inspiración y nunca se publican.

## Embeds, formularios y email

- **Embeds** (`Embed.astro`): son fachadas que cargan al hacer clic. El iframe de Beatport, SoundCloud, Spotify o Mixcloud se crea recién en el clic, así que el HTML inicial tiene que tener cero iframes.
  - SoundCloud se normaliza al modo `visual` (oscuro) con el acento leído de `--glow-500` en `tokens.css`.
  - Beatport bloquea el acceso automático: los datos los pega el equipo (código Embed o lista de tracks); no intentar leer beatport.com.
  - En `src/data/music.ts` se pega en `link` el link normal del track/set (en Beatport, la página del track o su código Embed) (Compartir → Copiar link), el `src` del iframe o el `<iframe>` completo. `toEmbed` (`src/data/embed.ts`) detecta la plataforma, arma la URL del reproductor y su altura.
  - Links cortos (`on.soundcloud.com`, `spotify.link`) o desconocidos frenan el build con un mensaje: hay que pegar la URL larga.
- **Sets de Radio Silence** (`Sets.astro`, `sets` en `src/data/music.ts`): cada set es un `Embed` (`link` + `title`), sin fecha ni lugar. Uno por fila, a todo el ancho del bloque (SoundCloud en modo visual, 300 px). El primero lleva la luz (`glow`). Hoy hay uno solo; para sumar otro, agregar un objeto a `sets`.
- **Formularios** (`ContactForm.astro`, `variant: 'booking' | 'collab'`): envían por POST a Web3Forms.
  - La key sale de `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`). Sin la key, el botón de enviar queda deshabilitado y se muestra un marcador pendiente.
  - El honeypot es el campo oculto `botcheck`.
  - Con JS se envía por fetch; sin JS, cae a un POST normal.
- **Email de booking**: nunca aparece como texto plano. `ObfuscatedEmail.astro` guarda las partes invertidas y las une con JS.

## Music: carrusel + reproductor de Spotify

- **Carrusel** (`TrackCarousel.astro`): coverflow nativo, sin dependencias. `scroll-snap` para el swipe, el giro 3D con `animation-timeline: view(inline)` dentro de `@supports` (longhands), reflejo con `-webkit-box-reflect`. Un script chico convierte cada portada en botón "Seleccionar …", maneja flechas/teclado y emite `track:change`. Sin JS: fila de links a Spotify. Reduced motion: sin 3D. Sin naranja.
- **Reproductor** (`SpotifyPlayer.astro`): Spotify iFrame API, cargada recién en la primera interacción. Cambiar de portada → `loadEntity(url?theme=0)` (álbum o tema); `loadEntity` corta la reproducción, así que si estaba sonando se llama `play()` en el siguiente `ready`. La fachada es `Embed.astro` en modo `controlled` y lleva `[data-music-light]` (la luz de la mano pasa ahí). El reproductor de Spotify queda visible (términos de Spotify); si la API falla o tarda 8 s, link "Escuchar en Spotify".
- **Sin app de Spotify:** la Web API exige que el dueño tenga Premium. Se usa **oEmbed** (público): `npm run spotify:sync` baja título y portada (640 px, por un prefijo no documentado del CDN; si falla, 300 px) a `src/assets/covers/` y escribe `src/data/spotify-tracks.json` (commiteado). En Vercel corre en `prebuild` y nunca frena el deploy; en local es manual.
- **Una portada por lanzamiento** (single, EP o álbum): `carouselReleases` en `src/data/music.ts`. Debajo de la portada van título, artistas y una línea mono `EP · Dublucid · 2026`. `selfReleased: true` = sin sello (no se muestra sello ni marcador). EP/álbum → embed de álbum de 352 px (con la lista de temas); single → embed compacto de 152 px; el alto se reserva en `.sp__stage` y cambia con una transición.
  - Lanzamientos compartidos con otros artistas (p. ej. *Three of a Kind #033*, compilado del sello): `ownTracks` con los temas de Shaun. El reproductor toca solo esos, uno por uno (embed compacto + botones para elegir el tema).
- **Cómo sumar un lanzamiento al carrusel:**
  1. En `carouselReleases`, agregar `{ title, type, artists, label (o selfReleased: true), year, spotify, beatport, tracks }` en su lugar (de lo más nuevo a lo más viejo). `spotify` = link del álbum/EP (Compartir → Copiar link del álbum) o, si es single, el del tema; sirve con `intl-es/` y `?si=`. `beatport` = link del release o `null`. `tracks` = títulos de los temas de Shaun (van en el `alt`). Título, tipo, artistas, sello y año van a mano: oEmbed no los da.
  2. `npm run spotify:sync` → baja la portada (una por lanzamiento, `<slug del título>.jpg`) y completa el JSON.
  3. `npm run build`, revisar y commitear `music.ts`, el JSON y la portada nueva.
  - `hide: true` lo saca del carrusel; `initialRelease` define la portada inicial (hoy el EP *Case 701*).
- **Lista de abajo** (`releases`): solo remixes y próximos ("Remixes & Coming soon").

## Video de la mano y el cigarrillo (Music + footer)

- Un único video de Google Flow (`src/assets/video/hand-drop-source.mp4`, no se importa ni entra al build) se corta en dos: la escena de Music (2,4 s → 4,9 s, atada al scroll) y el footer (4,25 s → final, se reproduce una vez). El hero no tiene video.
- **`public/media/` se genera con `npm run media` (`scripts/make-media.sh`, usa `ffmpeg-static`), y `public/og.png` + `public/apple-touch-icon.png` con `npm run og` (`scripts/make-og.sh`, Chrome headless). Nunca editar esos archivos a mano: cambiar el script/plantilla y regenerar.**
- El fondo del video (`#081222`) se corrige con `curves` para quedar apenas por debajo de `#070D18` en los tres canales; la escena usa `mix-blend-mode: lighten` para que el fondo desaparezca contra la página. Por eso el contenedor `.music` no puede tener `isolation`. No agregar ese color a la paleta.
- **Escena de la mano** (`MusicScene.astro`, entre `<Hero>` y `<Music>` en `HomePage.astro`): 60 WebP en `<canvas>` (desktop 900×620, mobile 480×600). Cuelga de un puente de alto 0 (`.bridge`): la mano queda debajo de la tagline (el humo sube sobre ella) y el cigarrillo cae detrás del header de Music y de las portadas. Tamaño: `min(880px, 80%)` en desktop y `min(360px, 100% - 2 gutters)` en mobile; la altura la ajusta `--scene-top`.
  - Capas: escena `z-index: 1` (encima del hero, cuyo humo la taparía), `.section__head` y `.music__tracks` de Music `z-index: 2`. Ni el puente ni `.music` llevan `z-index` ni `isolation`: un contexto de apilamiento cortaría el `mix-blend-mode`.
  - El hero ya no ocupa toda la pantalla: nombre + tagline, y la mano llena el espacio hasta Music. En 375×667 entran el nombre, la tagline y la mano.
  - Progreso del scroll: 0 con la página arriba, 1 cuando el centro de las portadas llega al 55 % del viewport.
  - Solo avanza: el scroll controla la caída pero nunca la rebobina. Al terminar queda `empty.webp` (mano vacía) para el resto de la visita; al recargar se repite.
  - La luz pasa de la brasa al botón `[data-music-light]` (fachada del reproductor de Spotify): el JS le saca `.embed__play--glow` y se lo devuelve en `EXIT_FRAME`, el cuadro en que la brasa llega al borde superior de las portadas (por recorte, en `MusicScene.astro`; revisarlo si se regeneran los cuadros o cambia el alto entre el hero y el carrusel). La brasa baja del 21 % al 90 % del cuadro (desktop) y del 28 % al 99 % (mobile).
  - El HTML trae el estado final (mano vacía + play encendido): así queda sin JS y con reduced-motion.
  - Los cuadros se descargan con el primer scroll/toque, no al cargar (si no, bloquean el hilo principal en mobile). El canvas nunca dibuja más grande que el cuadro (evita la borrosidad).
- Footer: `<video preload="none">` que arranca con `IntersectionObserver` al 40 % y queda en el último cuadro. Si `play()` falla (iOS en Ahorro de batería) o el video da error, muestra `last.webp`. La escena tiene que ser más baja que el footer para que el fundido superior no se corte.

## Forma de trabajar

- Hacer solo lo que se pide: no agregar funcionalidades por cuenta propia.
- Cambios chicos y enfocados; no reescribir lo que ya funciona.
- Al terminar, resumir qué cambió y qué decisiones hay que revisar.

## Límites

- ✅ Siempre:
  - mantener la paridad de claves EN/ES y respetar la paleta cerrada y la regla de una luz naranja por sección;
  - dejar en `null` lo que no esté confirmado;
  - trabajar solo dentro de la carpeta del repositorio.
  - actualizar `MEMORY.md` al terminar cada tarea.
- ⚠️ Preguntar antes: borrar archivos, hacer deploy a producción, conectar un dominio o registrarse en servicios.
- 🚫 Nunca:
  - hacer commit o push si no se pide;
  - inventar datos del artista;
  - escribir fuera de la carpeta del proyecto;
  - publicar las imágenes de referencia.

## Git

- Repo: `Va-Delivery/Shaun-landpage` en GitHub, rama `main`. Remoto por SSH con el alias `github-va` de `~/.ssh/config`: `git@github-va:Va-Delivery/Shaun-landpage.git`.
- Commits solo cuando se piden; push solo cuando se pide explícitamente.
- Mensajes claros, en inglés y en imperativo: una primera línea corta con el qué ("Add booking form validation") y, si hace falta, un cuerpo con el porqué.
- Antes de cada commit, revisar `git status` / `git diff --cached`: nada de secretos (`.env`), material de terceros (`references/`) ni archivos pesados innecesarios.

## Verificación

```sh
npm run dev            # servidor de desarrollo con HMR (http://localhost:4321)
npm run build          # build estático en dist/
npx astro check        # type-check; también hace cumplir la paridad de claves EN/ES
npx astro preview      # sirve dist/. En Astro 7 corre como daemon: frenarlo con `npx astro preview stop`
```

- No hay tests ni linter. Para verificar un cambio: `build` + `astro check`, y después mirar el sitio en el navegador a 375 px y 1440 px.
- `chrome --headless --window-size=375,...` **no** da un viewport real de 375 px: la captura se ve recortada aunque la página esté bien.
- Para chequear de verdad el viewport (ancho de scroll, orden de foco con Tab, capturas), usar `puppeteer-core` apuntando a `/Applications/Google Chrome.app`. Instalarlo en el scratchpad de la sesión, no en el proyecto.
- Lighthouse: `CHROME_PATH=... npx lighthouse`. Objetivo: ≥ 90 en performance y accesibilidad.
- Entorno: Mac mini 2011 con macOS 12 Monterey y Node 24. Astro 7 necesita Node ≥ 22.12. Verificar la compatibilidad antes de agregar herramientas.

## Memoria

- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
  tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
  porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
  dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).
