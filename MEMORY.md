# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- Sitio Astro estático y bilingüe (EN `/`, ES `/es/`), 7 secciones, "luz en la oscuridad". Repo: https://github.com/Va-Delivery/Shaun-landpage (`main`, SSH vía alias `github-va`). Sin deploy todavía.
- Hechos: escena de la mano (Flow) en Music + footer; revisión del 23/10 (OG, 404, sitemap, JSON-LD, 7 animaciones); embeds para pegar; arranque arriba al recargar; SoundCloud y Beatport en redes; primer set de Radio Silence.
- 2026-10-27: **Music rediseñada**: carrusel coverflow de 13 temas propios (portadas y links de Spotify), reproductor de Spotify sincronizado (iFrame API) y lista "Remixes & Coming soon". Commits locales sin push.
- Faltan: sets 2 y 3, fecha/lugar del set 1, bios, fotos, email, press kit, key de Web3Forms, Spotify/Instagram/RA/Mixcloud en redes.

## Decisiones (y por qué)

- **Textos en TS** (paridad EN/ES por tipos). **`null` = no confirmado**; JSON-LD solo con datos confirmados.
- **Una luz naranja por sección.** Hero = Listen (glow del horizonte azul). Music = fachada del reproductor de Spotify (`[data-music-light]`), adonde pasa la brasa de la mano (`EXIT_FRAME` 52). El naranja solo anima en esa brasa y en la chispa del formulario.
- **Escena de Music:** solo avanza y queda en la mano vacía; sin pin; WebP + canvas; recorte desktop 900×620 desde y=100; `curves` + `mix-blend-mode: lighten`; cuadros recién al primer scroll.
- **Animaciones:** atadas al scroll dentro de `@supports`; Firefox usa `src/scripts/reveal.ts`. El estado oculto lo agrega solo JS. Easing: `--ease-slow` entradas, `ease-in-out` loops, `linear` scroll. View Transitions nativas, no `ClientRouter`.
- **Spotify sin app (sin Premium):** la Web API en modo desarrollo exige Premium del dueño (feb 2026; además se fueron batch, `top-tracks`, `label`, `popularity`, `preview_url`). Se usa **oEmbed** público; artistas, sello y año van a mano. Portada 640 px cambiando el prefijo del CDN (no documentado; si falla, 300 px).
- **Carrusel nativo, no Swiper:** sin dependencia (~40 KB menos), el swipe lo hace el navegador, y sin JS es una fila de links. Firefox lo ve plano con snap. Una portada por tema (hay tapas repetidas en EPs: lo eligieron así).
- **iFrame API:** `loadEntity` (recomendado sobre `loadUri`) conserva `?theme=0`, pero **corta la reproducción**: si sonaba, `play()` en el siguiente `ready` (verificado con audio real). La API se carga en la primera interacción.
- **Beatport bloquea bots (Cloudflare)**: no se lee beatport.com; los datos los pegó el equipo.
- **Arriba al recargar / atrás-adelante**; links con `#sección` y bfcache se respetan.

## Aprendizajes y errores a evitar

- Medir con `puppeteer-core` en el scratchpad (se borra entre días: reinstalar). El dev server del usuario puede estar en 4321: medir el build con `astro preview --port 4322`.
- **El minificador fusiona `animation` + `animation-timeline` en un shorthand inválido**: usar longhands.
- Transiciones de entrada en el estado visible; `overflow: hidden` rompe `sticky`; `isolation` anula `mix-blend-mode`.
- **`astro check`: leer la línea `- N errors`**, no hacer `tail` (así se escaparon 3 errores entre el 23 y el 25/10).
- **Editar i18n con reemplazos exactos y `assert`**: un `re.sub` mal armado copió el archivo entero dentro de `en.ts`/`es.ts` (27/10; se restauró con `git checkout`).
- El widget de Spotify tarda en pintarse: capturas antes de ~10 s lo muestran angosto aunque el iframe mida bien.
- Lighthouse en esta Mac varía con carga alta: repetir antes de concluir. Mobile ronda 94–96 desde el carrusel.
- Para probar luz/chispa/API: datos de prueba solo en build local y revertir antes del commit.

## Pendientes

- [ ] Deploy de preview en Vercel desde la web; ahí probar en iPhone real (escena, footer en Ahorro de batería, fundido de idioma, `play()` del reproductor, que Safari podría bloquear).
- [ ] **Cuando llegue el dominio:** Vercel → Environment Variables → `SITE_URL=https://<dominio>` y redeploy (todo sale de `site`).
- [ ] Sets 2 y 3 de Radio Silence; links de Beatport del resto de los temas.
- [ ] Datos del artista: redes faltantes (llenan `sameAs`), bios, fotos, email de booking, press kit, key de Web3Forms.
- [ ] Si se extiende el video en Flow: `npm run media`, revisar `EXIT_FRAME` y `npm run og`.
