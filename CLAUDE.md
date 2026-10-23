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

## Convenciones

- Responder en español. Código e identificadores en inglés. Explicar el porqué de cada decisión.
- **Todo el texto visible vive en `src/i18n/en.ts` / `es.ts`.** Nunca hardcodear texto en componentes.
- El español es rioplatense (voseo) y se escribe directamente en español, no como traducción literal del inglés.
- Mobile first: el hero entra completo en 375×667 y no puede haber scroll horizontal.

## Datos y contenido

- `src/data/site.ts`: URL del press kit, email de booking y redes. `src/data/music.ts`: embed destacado, releases y sets de Radio Silence.
- **`null` significa "todavía no confirmado".** El componente muestra entonces un marcador visible, por ejemplo `<span class="pending">[RELEASE PENDIENTE]</span>`.
- Nunca inventar releases, sellos, fechas, supports ni citas. Si un dato no está confirmado, el campo queda en `null`.
- Los archivos de i18n son TS, no JSON, para poder dejar comentarios "TO CONFIRM" al lado de los datos sin verificar.

## Diseño "luz en la oscuridad" (fácil equivocarse)

- `src/styles/tokens.css` tiene la **paleta cerrada de 11 colores**, la escala tipográfica y el espaciado. No agregar colores ni escribir hex en otros archivos: usar los tokens, y `color-mix()` para transparencias.
- Dominan los azules noche. **El naranja (`--glow-*`) es escaso: una sola fuente de luz por sección.** `.btn--glow` o el prop `glow` va como máximo una vez por sección:
  - Hero = Listen (el glow del horizonte es azul: no compite)
  - Music = play del destacado
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

- **Embeds** (`Embed.astro`): son fachadas que cargan al hacer clic. El iframe de SoundCloud o Spotify se crea recién en el clic, así que el HTML inicial tiene que tener cero iframes. `src` es la URL completa del iframe, tomada de Share → Embed de cada plataforma.
- **Formularios** (`ContactForm.astro`, `variant: 'booking' | 'collab'`): envían por POST a Web3Forms.
  - La key sale de `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`). Sin la key, el botón de enviar queda deshabilitado y se muestra un marcador pendiente.
  - El honeypot es el campo oculto `botcheck`.
  - Con JS se envía por fetch; sin JS, cae a un POST normal.
- **Email de booking**: nunca aparece como texto plano. `ObfuscatedEmail.astro` guarda las partes invertidas y las une con JS.

## Video de la mano y el cigarrillo (Music + footer)

- Un único video de Google Flow (`src/assets/video/hand-drop-source.mp4`, no se importa ni entra al build) se corta en dos: la escena de Music (2,4 s → 4,9 s, atada al scroll) y el footer (4,25 s → final, se reproduce una vez). El hero no tiene video.
- **`public/media/` se genera con `npm run media` (`scripts/make-media.sh`, usa `ffmpeg-static`), y `public/og.png` + `public/apple-touch-icon.png` con `npm run og` (`scripts/make-og.sh`, Chrome headless). Nunca editar esos archivos a mano: cambiar el script/plantilla y regenerar.**
- El fondo del video (`#081222`) se corrige con `curves` para quedar apenas por debajo de `#070D18` en los tres canales; la escena usa `mix-blend-mode: lighten` para que el fondo desaparezca contra la página. Por eso el contenedor `.music` no puede tener `isolation`. No agregar ese color a la paleta.
- **Escena de Music** (`MusicScene.astro`): 60 WebP en `<canvas>` (desktop 900×620, mobile 480×600), arriba a la derecha del título, detrás del texto y del reproductor. Tamaño: `min(880px, 80%)` en desktop y `min(280px, 85%)` en mobile. El recorte de desktop saca los 100 px de arriba para que la mano quede al lado del título y no detrás del reproductor; el fundido inferior termina al 80 % para que nada asome debajo del reproductor.
  - Solo avanza: el scroll controla la caída pero nunca la rebobina. Al terminar queda `empty.webp` (mano vacía) para el resto de la visita; al recargar se repite.
  - La luz pasa de la brasa al play destacado: el JS le saca `.embed__play--glow` y se lo devuelve en `EXIT_FRAME` (por recorte, en `MusicScene.astro`; revisarlo si se regeneran los cuadros).
  - El HTML trae el estado final (mano vacía + play encendido): así queda sin JS y con reduced-motion.
  - Los cuadros se descargan con el primer scroll/toque, no al cargar (si no, bloquean el hilo principal en mobile). El canvas nunca dibuja más grande que el cuadro (evita la borrosidad).
- Listen (hero) queda siempre con `.btn--glow`.
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
