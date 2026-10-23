# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- v1: sitio Astro estático y bilingüe (EN `/`, ES `/es/`), 7 secciones, sistema "luz en la oscuridad", embeds al clic, formularios Web3Forms, email ofuscado.
- Video de la mano que suelta el cigarrillo (Google Flow, generado el 2026-10-21): escena atada al scroll a la derecha del título MUSIC + footer que se reproduce una vez. El hero volvió a la v1 (niebla + glow), sin video y sin la píldora de ubicación (pedido del equipo).
- Faltan datos reales del artista (marcadores `[PENDIENTE]`). Sin deploy todavía.
- 2026-10-23: repo en GitHub https://github.com/Va-Delivery/Shaun-landpage (rama `main`, remoto SSH vía alias `github-va`). Las capturas de revisión (`src/assets/image/`) y `references/` están en `.gitignore`.

## Decisiones (y por qué)

- **Astro estático, sin framework de UI; textos en TS** (el tipo `Dictionary` obliga a la paridad EN/ES). **`null` = no confirmado.**
- **Una luz naranja por sección.** En Music, la brasa es la luz mientras cae y después pasa al play destacado (`EXIT_FRAME` 52 en desktop y mobile). Listen siempre encendido.
- **La mano pasó del hero a Music** (2026-10-21): el equipo la prefirió en el espacio vacío al lado del título; en el hero tapaba el nombre.
- **La caída solo avanza y queda fija al terminar** (mano vacía): antes el cigarrillo volvía a la mano al subir, pero en el footer queda en el piso; era contradictorio. Una vez por visita (al recargar se repite).
- **Sin pin en Music:** la sección es más alta que la pantalla. La caída va de 90 % → 20 % del viewport.
- **WebP + canvas, no MP4 + `currentTime`:** el seek de video en iOS es asíncrono y salta.
- **Nitidez sin vectorizar:** la borrosidad venía de estirar 1280 px a 2,25–2,5× en Retina. Se mitigó con q85/q72 + `unsharp` y sin escalar los cuadros. Vectorizar (potrace/híbrido) quedó como opción si no alcanza.
- **Escena al doble de tamaño (2026-10-22, pedido del equipo):** desktop `min(880px, 80%)`, mobile `min(280px, 85%)`. Trade-offs aceptados: la caída pasa detrás del texto y del reproductor, y con el video en 720p se ve algo más blando en Retina (~2×). Si se exporta 1080p desde Flow, solo hay que regenerar.
- **Recortes:** desktop 900×620 desde y=100 (sin el humo de arriba: a 880 px la mano quedaba detrás del reproductor); mobile vertical 480×600 nativo (con 400 px solo entraban las puntas de los dedos).
- **Fondo del video:** `curves` lo deja apenas debajo de `#070D18` y la escena usa `mix-blend-mode: lighten`, que borra los bordes de la caja (antes se veía un rectángulo).
- **Cuadros al primer scroll/toque, con `img.decode()`:** al cargarlos en `load`, Lighthouse mobile bajaba a 78.
- **Final del footer:** el video termina con humo en el aire; no se extendió con Flow. Fundido a un último cuadro con el humo tapado.
- Pesos: Music desktop 1,3 MB, mobile 634 KB, footer 95 KB. Lighthouse mobile 99 / desktop 100.

## Aprendizajes y errores a evitar

- `chrome --headless --window-size=375` no da viewport real: medir con `puppeteer-core` (scratchpad).
- `astro preview` en Astro 7 corre como daemon: `npx astro preview stop`.
- Monterey: Homebrew sin binarios; ffmpeg viene de `ffmpeg-static` (6.1, con libwebp/libx264, sin `drawtext`).
- `crop=1:1` sobre yuv420p falla: convertir a `rgb24` antes de muestrear un píxel.
- `overflow: hidden` rompe `position: sticky`; `isolation: isolate` anula `mix-blend-mode` contra la página.
- No hay botón de play mientras el destacado esté pendiente: para probar la luz, poner un `src` de prueba y revertirlo.

## Pendientes

- [ ] Probar la escena en un iPhone real (preview de Vercel).
- [ ] Si se extiende el video en Flow, regenerar con `npm run media` y revisar `EXIT_FRAME`.
- [ ] Datos del artista: links, bios, fotos, releases con sello/fecha, email de booking, PDF del press kit, key de Web3Forms.
- [ ] Deploy de preview en Vercel (conectando el repo).
- [ ] **Cuando llegue el dominio real:** en Vercel → Settings → Environment Variables, poner `SITE_URL=https://<dominio>` (sin barra final) y redeployar. Nada más: canonical, hreflang, `og:image`, sitemap y robots salen de `site` (`astro.config.mjs`). Hasta entonces, en Vercel se usa sola `VERCEL_PROJECT_PRODUCTION_URL` (el `.vercel.app`); local cae a `http://localhost:4321`.
