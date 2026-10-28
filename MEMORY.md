# MEMORY.md — Shaun Nolanh

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resumí o borrá lo que ya no sirva.

## Estado actual

- Sitio Astro estático y bilingüe (EN `/`, ES `/es/`), 7 secciones, "luz en la oscuridad". Repo: https://github.com/Va-Delivery/Shaun-landpage (`main`, SSH vía alias `github-va`). Sin deploy todavía.
- Hechos: escena de la mano (Flow) en Music + footer; revisión del 23/10 (OG, 404, sitemap, JSON-LD, 7 animaciones); embeds para pegar; arranque arriba al recargar; SoundCloud y Beatport en redes; primer set de Radio Silence.
- 2026-10-27: Music rediseñada (carrusel coverflow + reproductor de Spotify con iFrame API + "Remixes & Coming soon").
- 2026-10-28: hero sin botones (la mano hace de puente hero→Music), tagline de géneros, **una portada por lanzamiento** (7: EP de álbum 352 px, single 152 px, Three of a Kind #033 solo con los 2 temas de Shaun), Espacio en portadas, email de booking con asunto, Radio Silence con un set a todo el ancho, bio del equipo, Instagram, Node 24. Último push: ítem 1 (`fcd1d08`); lo demás, local.
- Faltan: fotos, press kit, key de Web3Forms, Spotify/RA/Mixcloud en redes, Beatport de los EP.

## Decisiones (y por qué)

- **Textos en TS** (paridad EN/ES por tipos). **`null` = no confirmado**; JSON-LD solo con datos confirmados.
- **Una luz naranja por sección.** Hero = la brasa del cigarrillo (sin botones). Music = fachada del reproductor de Spotify (`[data-music-light]`), adonde pasa la brasa cuando entra detrás de las portadas (`EXIT_FRAME` 46 desktop / 48 mobile). El naranja solo anima en esa brasa y en la chispa del formulario.
- **Escena de la mano:** entre hero y Music (puente de alto 0, escena z 1, contenido de Music z 2, sin `isolation`). La mano queda pegada a las portadas a propósito: la brasa baja del 21 % al 90 % del cuadro y la mano llega al 55 %. Solo avanza; progreso 0 arriba → 1 con las portadas al 55 % del viewport.
- **Animaciones:** atadas al scroll dentro de `@supports`; Firefox usa `src/scripts/reveal.ts`. El estado oculto lo agrega solo JS. Easing: `--ease-slow` entradas, `ease-in-out` loops, `linear` scroll. View Transitions nativas, no `ClientRouter`.
- **Spotify sin app (sin Premium):** la Web API en modo desarrollo exige Premium del dueño (feb 2026; además se fueron batch, `top-tracks`, `label`, `popularity`, `preview_url`). Se usa **oEmbed** público; artistas, sello y año van a mano. Portada 640 px cambiando el prefijo del CDN (no documentado; si falla, 300 px).
- **Carrusel nativo, no Swiper:** sin dependencia, swipe del navegador, sin JS una fila de links. Una portada por lanzamiento; un embed de Spotify no puede mostrar parte de un álbum, por eso los compilados usan `ownTracks` (temas sueltos + botones).
- **Email:** fuera del JSON-LD (sería texto plano en el HTML). El alto del reproductor anima `height`: excepción aceptada (un iframe no se escala).
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
- Capturas con puppeteer: `captureBeyondViewport: false`, si no pinta la escena (blend) encima del header. `astro preview` se puede caer: chequear el puerto antes de Lighthouse.

## Pendientes

- [ ] Deploy de preview en Vercel desde la web; ahí probar en iPhone real (escena, footer en Ahorro de batería, fundido de idioma, `play()` del reproductor, que Safari podría bloquear).
- [ ] **Cuando llegue el dominio:** Vercel → Environment Variables → `SITE_URL=https://<dominio>` y redeploy (todo sale de `site`).
- [ ] Links de Beatport de release para Case 701, Chrome Butterflies y Three of a Kind #033 (hoy, link de un tema, `TO CONFIRM`); Hibiki y Sky Burns Gold sin Beatport.
- [ ] Confirmar "Gai Barone" en la bio (el texto del equipo decía "Guy Barone").
- [ ] Datos del artista: redes faltantes (llenan `sameAs`), fotos, press kit, key de Web3Forms.
- [ ] Si se extiende el video en Flow: `npm run media`, revisar `EXIT_FRAME` y `npm run og`.
