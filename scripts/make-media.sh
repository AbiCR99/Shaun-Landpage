#!/usr/bin/env bash
# Generates the hero frames and the footer clip from the Google Flow source video.
# Run with `npm run media`. Never edit the files in public/media/ by hand: change this script.
set -euo pipefail

cd "$(dirname "$0")/.."
FFMPEG="$(node -p "require('ffmpeg-static')")"
SRC="src/assets/video/hand-drop-source.mp4"
OUT="public/media"

# The video background is #081222; the site's is --night-950 (#070D18).
# One control point per channel, only in the shadows: highlights (cream line, ember) stay put.
# Blue lands slightly below the page so `mix-blend-mode: lighten` can erase the frame edges.
CURVES="curves=r='0/0 0.0314/0.0275 1/1':g='0/0 0.0706/0.051 1/1':b='0/0 0.1333/0.0863 1/1'"

# Music scene: 2.4s → 4.9s (the first 2.4s are a static hand; it ends right before the impact).
SCENE_START=2.4
SCENE_END=4.9
# A light unsharp after the color fix: the Flow export has soft line edges.
SHARPEN="unsharp=5:5:0.6"
webp() { echo "-c:v libwebp -preset drawing -quality $1 -compression_level 6"; }
WEBP="$(webp 90)"

# Crops: desktop drops the empty left 30% (the hand exits on the right edge) and the top 100px
# (only smoke), so at full size the hand sits next to the Music title instead of behind the player;
# mobile is a portrait crop of the fingers + the fall, at native size (no scaling = sharper).
DESKTOP_CROP="crop=900:620:380:100"
MOBILE_CROP="crop=480:600:360:60"
# Quality per set, tuned to the weight budget (desktop ≤ 1.5 MB, mobile ≤ 700 KB for 60 frames).
DESKTOP_Q=85
MOBILE_Q=72
# "Empty hand" end state: last frame with the cigarette and its smoke trail covered
# (boxes in crop coordinates, checked against the fingers).
DESKTOP_EMPTY="drawbox=x=50:y=0:w=180:h=620:color=0x070D18:t=fill,drawbox=x=200:y=370:w=65:h=250:color=0x070D18:t=fill"
MOBILE_EMPTY="drawbox=x=62:y=0:w=188:h=600:color=0x070D18:t=fill,drawbox=x=238:y=419:w=50:h=181:color=0x070D18:t=fill"

rm -rf "$OUT/hero" "$OUT/music" "$OUT/footer"
mkdir -p "$OUT/music/desktop" "$OUT/music/mobile" "$OUT/footer"

for set in desktop mobile; do
  if [ $set = desktop ]; then crop=$DESKTOP_CROP q=$DESKTOP_Q empty=$DESKTOP_EMPTY; else crop=$MOBILE_CROP q=$MOBILE_Q empty=$MOBILE_EMPTY; fi
  echo "→ music $set ($crop, q$q)"
  "$FFMPEG" -v error -ss $SCENE_START -to $SCENE_END -i "$SRC" -an \
    -vf "$crop,$CURVES,$SHARPEN" $(webp $q) "$OUT/music/$set/f%03d.webp"
  "$FFMPEG" -v error -y -i "$OUT/music/$set/f060.webp" -vf "$empty" $(webp $q) "$OUT/music/$set/empty.webp"
done

# Footer: 4.25s → end, bottom-left crop (leaves the hand and thumb out).
# The source ends with smoke still in the air, so we fade into a "clean" last frame
# (smoke covered with a background-colored box) and hold it 1.5s.
FOOTER_CROP="crop=704:400:0:320"
echo "→ footer clip"
"$FFMPEG" -v error -y \
  -ss 4.25 -i "$SRC" \
  -sseof -0.05 -i "$SRC" \
  -filter_complex "
    [0:v]$FOOTER_CROP,$CURVES,fps=24,format=yuv420p,settb=AVTB[clip];
    [1:v]$FOOTER_CROP,$CURVES,drawbox=x=370:y=0:w=160:h=300:color=0x070D18:t=fill,
         loop=loop=-1:size=1,fps=24,trim=duration=2.8,setpts=PTS-STARTPTS,format=yuv420p,settb=AVTB[clean];
    [clip][clean]xfade=transition=fade:duration=1.3:offset=2.45[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf ${FOOTER_CRF:-26} -pix_fmt yuv420p -movflags +faststart \
  "$OUT/footer/footer.mp4"

echo "→ footer stills"
"$FFMPEG" -v error -y -i "$OUT/footer/footer.mp4" -frames:v 1 $WEBP "$OUT/footer/first.webp"
"$FFMPEG" -v error -y -sseof -0.1 -i "$OUT/footer/footer.mp4" -frames:v 1 -update 1 $WEBP "$OUT/footer/last.webp"

echo "✓ done"
for d in music/desktop music/mobile; do echo "$d: $(cat $OUT/$d/*.webp | wc -c | awk '{printf "%.0f KB", $1/1024}')"; done
echo "footer.mp4: $(( $(wc -c < $OUT/footer/footer.mp4) / 1024 )) KB"
