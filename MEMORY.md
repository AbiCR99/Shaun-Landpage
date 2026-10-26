# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- Sitio Astro estático y bilingüe (EN `/`, ES `/es/`), 7 secciones, "luz en la oscuridad". Repo: https://github.com/Va-Delivery/Shaun-landpage (`main`, SSH vía alias `github-va`). Sin deploy todavía.
- Video de Google Flow (2026-10-21): escena atada al scroll al lado de MUSIC + footer que se reproduce una vez.
- 2026-10-23, revisión completa (14 commits, sin push): fallback del footer en iOS, glow del hero azul, `SITE_URL`, OG + apple-touch-icon (`npm run og`), 404 bilingüe, sitemap/robots, JSON-LD `MusicGroup`, y 7 animaciones (títulos del humo, brasa que respira, señal de Radio Silence, cascada de releases, chispa al enviar, fundido de idioma, header que se oculta + sección activa).
- 2026-10-25: embeds listos para pegar (`link` en `music.ts` acepta link normal / src / `<iframe>` de SoundCloud, Spotify o Mixcloud; ver `src/data/embed.ts`), SoundCloud del artista en redes (`soundcloud.com/shaunnolanhmusic`), y arranque arriba al recargar/volver.
- 2026-10-25 (tarde): música real. 3 destacados de Beatport elegidos por el artista (Case 701, Through the Loss, Innocent Spt), releases desde su lista de Beatport (primera edición de cada tema), primer set de Radio Silence (SoundCloud "Best Warm Up"), Beatport en redes.
- Faltan: sets 2 y 3, fecha/lugar del set 1, bios, fotos, email, press kit, key de Web3Forms, Spotify/Instagram/RA/Mixcloud.

## Decisiones (y por qué)

- **Textos en TS** (paridad EN/ES por tipos). **`null` = no confirmado**; JSON-LD solo con datos confirmados.
- **Una luz naranja por sección.** El glow del hero pasó a azul (competía con Listen). En Music la brasa cae y la luz pasa al play destacado (`EXIT_FRAME` 52), que respira. El naranja solo anima en la brasa del play y en la chispa del formulario.
- **Escena de Music:** solo avanza y queda en la mano vacía (coherente con el footer); sin pin; WebP + canvas (el seek de video en iOS salta); doble de tamaño a pedido (más blanda en Retina con el 720p); recorte desktop 900×620 desde y=100; `curves` + `mix-blend-mode: lighten` borran el borde de la caja; cuadros recién al primer scroll (si no, Lighthouse mobile bajaba a 78).
- **Animaciones:** atadas al scroll con `animation-timeline` dentro de `@supports`; Firefox (sin soporte en estable) usa `src/scripts/reveal.ts` (IntersectionObserver). El estado oculto solo lo agrega JS. Reduced motion: `animation: none` explícito y estado final.
- **Easing:** `--ease-slow` para entradas; `ease-in-out` en loops (la brasa); `linear` en animaciones atadas al scroll (el scroll marca el ritmo). Con `--ease-slow` saltaban y quedaban quietas.
- **Cascada de releases por tiempo** (IO en todos los navegadores): en un timeline de scroll no hay milisegundos.
- **View Transitions nativas entre documentos, no `<ClientRouter />`:** así los scripts inline siguen corriendo como cargas normales.
- **OG con el Chrome headless instalado** (a ≥ 500 px el viewport es exacto), sin sumar `puppeteer-core` al proyecto.
- **MusicGroup, no Person:** schema.org lo admite para solistas y tiene `genre`.
- **El equipo pega los embeds** (eligen el contenido); el código detecta la plataforma. Links cortos frenan el build: no se pueden resolver sin red.
- **Beatport bloquea bots (Cloudflare)**: no se lee beatport.com; los datos vinieron pegados por el equipo. *Through the Loss*: el embed usa la edición `29208623` y el link de la fila la `22465564` (mismo tema, otra edición).
- **SoundCloud en modo visual** (oscuro, portada) con acento de `tokens.css`: el clásico es blanco y no se puede oscurecer.
- **Arriba al recargar / atrás-adelante** (`scrollRestoration = 'manual'`, inline en `<head>`): la escena de Music se veía rara a mitad. Links con `#sección` y bfcache se respetan.

## Aprendizajes y errores a evitar

- Medir con `puppeteer-core` en el scratchpad (`--window-size` < 500 px no da viewport real). El dev server del usuario puede estar en 4321: usar `astro preview --port 4322` para medir el build.
- **El minificador fusiona `animation` + `animation-timeline` en un shorthand inválido** (sin `var()` en el valor): usar longhands (`animation-name`, `-timing-function`, `-fill-mode`, `-timeline`).
- Transiciones de entrada: ponerlas en el estado visible; si están en el oculto, hay un fundido de salida al cargar.
- `overflow: hidden` rompe `sticky`; `isolation: isolate` anula `mix-blend-mode` contra la página.
- `scaleY` sobre un `<g>` del SVG + `vector-effect: non-scaling-stroke` (sobre el `<svg>` el trazo también se aplasta).
- Monterey: ffmpeg de `ffmpeg-static` (sin `drawtext`); `crop=1:1` necesita `rgb24` antes.
- **`astro check`: leer la línea `- N errors`**, no hacer `tail`: así se escaparon 3 errores de tipos en `astro.config.mjs` (`process`) entre el 23 y el 25/10.
- Lighthouse en esta Mac varía mucho con carga alta (un 85 aislado → 97–99 al repetir): repetir antes de concluir.
- Para probar la luz del play o la chispa: `src` de prueba / `PUBLIC_WEB3FORMS_KEY` falsa solo en el build local, e interceptar Web3Forms; revertir y reconstruir antes del commit.

## Pendientes

- [ ] Deploy de preview en Vercel desde la web (todo subido a GitHub el 2026-10-26, `fc858fd`).
- [ ] **Cuando llegue el dominio real:** Vercel → Settings → Environment Variables → `SITE_URL=https://<dominio>` (sin barra final) y redeploy. Canonical, hreflang, `og:image`, sitemap, robots y JSON-LD salen de `site`. Hasta entonces Vercel usa `VERCEL_PROJECT_PRODUCTION_URL`; local, `localhost:4321`.
- [ ] Probar en iPhone real: escena, footer con Ahorro de batería, fundido de idioma.
- [ ] Sets 2 y 3 de Radio Silence: pegar su embed en `sets` cuando existan.
- [ ] Links de Beatport por fila: solo hay IDs de Case 701, Through the Loss e Innocent Spt; el resto lleva al perfil.
- [ ] Datos del artista: resto de las redes (llenan `sameAs`), bios, fotos, releases, email de booking, press kit, key de Web3Forms.
- [ ] Si se extiende el video en Flow: `npm run media`, revisar `EXIT_FRAME` y `npm run og`.
