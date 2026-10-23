#!/usr/bin/env bash
# Renders the Open Graph card and the Apple touch icon from the HTML templates in scripts/og/.
# Run with `npm run og` (after `npm run media`, since the card uses the first Music frame).
# Uses the Chrome already installed (headless) instead of adding puppeteer as a dependency.
set -euo pipefail

cd "$(dirname "$0")/.."
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
FFMPEG="$(node -p "require('ffmpeg-static')")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

shoot() { # template, width, height, output
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=1 --virtual-time-budget=4000 \
    --window-size="$2,$3" --screenshot="$4" "file://$PWD/scripts/og/$1" 2>/dev/null
}

echo "→ og.png (1200×630)"
shoot og.html 1200 630 "$TMP/og.png"
# 256-color palette: the card is mostly flat night blue, so this keeps it well under 300 KB.
"$FFMPEG" -v error -y -i "$TMP/og.png" -vf "split[a][b];[a]palettegen=max_colors=256[p];[b][p]paletteuse=dither=sierra2_4a" public/og.png

echo "→ apple-touch-icon.png (180×180)"
# Drawn at 540px (headless Chrome won't go narrower than ~500px), then downscaled.
shoot icon.html 540 540 "$TMP/icon.png"
"$FFMPEG" -v error -y -i "$TMP/icon.png" -vf "scale=180:180:flags=lanczos" public/apple-touch-icon.png

echo "✓ done"
ls -l public/og.png public/apple-touch-icon.png | awk '{printf "%s: %.0f KB\n", $9, $5/1024}'
