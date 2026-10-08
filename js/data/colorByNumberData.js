// Zayn's Color by Number - Master Artworks Catalog (32 Masterpieces!)
// Dual Engine:
// 1. Organic Vector Coloring Book Pages (Google Printable Style!)
// 2. Geometric Mandalas & Mosaics
// 3. Pixel Art Worlds (Minecraft, Cars, Dinosaurs, Space, Animals, Characters)

// =========================================================
// 1. ORGANIC COLORING BOOK GENERATORS (Google Printable Style!)
// =========================================================

// A. Cute Bird on a Branch
function buildCuteBird() {
  const regions = [];
  regions.push({ id: "bird-sky-top", num: 5, d: "M 0 0 L 500 0 L 500 240 Q 250 200 0 240 Z", cx: 250, cy: 110 });
  regions.push({ id: "bird-sky-mid", num: 5, d: "M 0 240 Q 250 200 500 240 L 500 390 Q 250 350 0 390 Z", cx: 80, cy: 300 });
  regions.push({ id: "bird-branch", num: 6, d: "M 10 400 Q 250 370 490 410 L 490 445 Q 250 405 10 435 Z", cx: 380, cy: 405 });
  regions.push({ id: "bird-leaf-1", num: 4, d: "M 80 395 Q 60 350 110 360 Q 115 390 80 395 Z", cx: 85, cy: 370 });
  regions.push({ id: "bird-leaf-2", num: 4, d: "M 390 395 Q 430 355 450 380 Q 425 410 390 395 Z", cx: 425, cy: 380 });
  regions.push({ id: "bird-leaf-3", num: 4, d: "M 420 415 Q 460 410 475 435 Q 445 445 420 415 Z", cx: 450, cy: 430 });
  regions.push({ id: "bird-feet", num: 3, d: "M 200 380 L 205 400 L 215 380 L 225 400 L 235 380 Z", cx: 215, cy: 390 });
  regions.push({ id: "bird-tail-1", num: 1, d: "M 120 340 L 40 370 Q 70 340 110 320 Z", cx: 75, cy: 345 });
  regions.push({ id: "bird-tail-2", num: 2, d: "M 115 350 L 50 395 Q 85 365 125 335 Z", cx: 85, cy: 370 });
  regions.push({ id: "bird-belly", num: 3, d: "M 190 230 C 270 245 285 320 225 380 C 165 375 145 320 170 240 Z", cx: 200, cy: 310 });
  regions.push({ id: "bird-head", num: 2, d: "M 175 230 C 170 140 260 130 280 195 C 290 230 275 250 255 260 C 215 255 185 245 175 230 Z", cx: 230, cy: 190 });
  regions.push({ id: "bird-wing", num: 1, d: "M 185 235 C 240 225 255 285 205 345 C 160 340 150 290 185 235 Z", cx: 205, cy: 280 });
  regions.push({ id: "bird-beak", num: 3, d: "M 280 185 L 335 200 L 278 215 Z", cx: 298, cy: 200 });
  regions.push({ id: "bird-crest", num: 1, d: "M 225 140 Q 215 105 240 100 Q 235 130 245 140 Z", cx: 230, cy: 120 });
  return regions;
}

// B. Happy Smiling Flowers
function buildSmilingFlowers() {
  const regions = [];
  regions.push({ id: "flw-sky", num: 6, d: "M 0 0 L 500 0 L 500 410 Q 250 380 0 410 Z", cx: 250, cy: 90 });
  regions.push({ id: "flw-ground", num: 7, d: "M 0 410 Q 250 380 500 410 L 500 500 L 0 500 Z", cx: 250, cy: 460 });
  regions.push({ id: "flw-sun", num: 1, d: "M 420 20 A 50 50 0 1 0 520 120 L 500 0 Z", cx: 460, cy: 50 });

  regions.push({ id: "flw-stem-1", num: 4, d: "M 155 280 Q 150 350 160 415 L 175 415 Q 165 350 170 280 Z", cx: 162, cy: 350 });
  regions.push({ id: "flw-stem-2", num: 4, d: "M 335 250 Q 345 330 330 415 L 345 415 Q 360 330 350 250 Z", cx: 342, cy: 340 });

  regions.push({ id: "flw-leaf-1", num: 4, d: "M 160 360 Q 90 340 100 385 Q 140 395 160 365 Z", cx: 125, cy: 370 });
  regions.push({ id: "flw-leaf-2", num: 4, d: "M 170 330 Q 230 310 235 345 Q 195 365 170 335 Z", cx: 200, cy: 335 });
  regions.push({ id: "flw-leaf-3", num: 4, d: "M 345 340 Q 410 320 415 360 Q 380 375 345 345 Z", cx: 380, cy: 345 });

  const c1x = 160, c1y = 230;
  regions.push({ id: "flw-center-1", num: 5, d: `M ${c1x} ${c1y - 35} A 35 35 0 1 0 ${c1x} ${c1y + 35} A 35 35 0 1 0 ${c1x} ${c1y - 35} Z`, cx: c1x, cy: c1y });
  for (let p = 0; p < 6; p++) {
    const a = (p * Math.PI) / 3;
    const px = Math.round(c1x + 65 * Math.cos(a));
    const py = Math.round(c1y + 65 * Math.sin(a));
    regions.push({
      id: `flw-petal-1-${p}`,
      num: 1,
      d: `M ${c1x + 30 * Math.cos(a - 0.4)} ${c1y + 30 * Math.sin(a - 0.4)} Q ${c1x + 85 * Math.cos(a)} ${c1y + 85 * Math.sin(a)} ${c1x + 30 * Math.cos(a + 0.4)} ${c1y + 30 * Math.sin(a + 0.4)} Z`,
      cx: px,
      cy: py
    });
  }

  const c2x = 340, c2y = 190;
  regions.push({ id: "flw-center-2", num: 1, d: `M ${c2x} ${c2y - 30} A 30 30 0 1 0 ${c2x} ${c2y + 30} A 30 30 0 1 0 ${c2x} ${c2y - 30} Z`, cx: c2x, cy: c2y });
  for (let p = 0; p < 8; p++) {
    const a = (p * Math.PI) / 4;
    const px = Math.round(c2x + 58 * Math.cos(a));
    const py = Math.round(c2y + 58 * Math.sin(a));
    regions.push({
      id: `flw-petal-2-${p}`,
      num: 2,
      d: `M ${c2x + 28 * Math.cos(a - 0.35)} ${c2y + 28 * Math.sin(a - 0.35)} Q ${c2x + 75 * Math.cos(a)} ${c2y + 75 * Math.sin(a)} ${c2x + 28 * Math.cos(a + 0.35)} ${c2y + 28 * Math.sin(a + 0.35)} Z`,
      cx: px,
      cy: py
    });
  }

  regions.push({ id: "flw-butterfly", num: 3, d: "M 70 80 Q 95 50 110 80 Q 85 95 70 80 Z", cx: 90, cy: 75 });
  return regions;
}

// C. Dino & Volcano Island
function buildDinoVolcano() {
  const regions = [];
  regions.push({ id: "dv-sky", num: 7, d: "M 0 0 L 500 0 L 500 370 L 0 370 Z", cx: 380, cy: 80 });
  regions.push({ id: "dv-ground", num: 5, d: "M 0 370 L 500 370 L 500 500 L 0 500 Z", cx: 250, cy: 460 });
  regions.push({ id: "dv-sun", num: 2, d: "M 420 30 A 40 40 0 1 0 500 110 L 500 0 Z", cx: 450, cy: 50 });

  regions.push({ id: "dv-volcano-l", num: 6, d: "M 20 370 L 110 200 L 140 210 L 90 370 Z", cx: 80, cy: 300 });
  regions.push({ id: "dv-volcano-r", num: 6, d: "M 140 210 L 170 200 L 260 370 L 90 370 Z", cx: 180, cy: 310 });
  regions.push({ id: "dv-lava-crater", num: 3, d: "M 110 200 Q 140 185 170 200 Q 140 215 110 200 Z", cx: 140, cy: 200 });
  regions.push({ id: "dv-lava-river", num: 8, d: "M 135 210 Q 130 270 150 320 Q 140 270 145 210 Z", cx: 140, cy: 265 });

  regions.push({ id: "dv-smoke-1", num: 4, d: "M 130 190 Q 95 150 120 120 Q 155 140 145 185 Z", cx: 125, cy: 155 });
  regions.push({ id: "dv-smoke-2", num: 4, d: "M 135 130 Q 150 75 195 95 Q 185 135 140 130 Z", cx: 165, cy: 110 });
  regions.push({ id: "dv-smoke-3", num: 4, d: "M 180 115 Q 235 90 240 130 Q 195 145 180 115 Z", cx: 215, cy: 125 });

  regions.push({ id: "dv-dino-body", num: 1, d: "M 250 330 C 270 290 350 280 390 320 L 400 375 L 375 375 L 360 345 L 325 345 L 320 375 L 295 375 L 285 345 L 265 375 L 245 375 Z", cx: 330, cy: 330 });
  regions.push({ id: "dv-dino-neck", num: 1, d: "M 270 310 C 275 220 330 170 345 125 C 370 115 375 145 355 160 C 335 195 295 245 295 310 Z", cx: 315, cy: 210 });
  regions.push({ id: "dv-dino-head", num: 1, d: "M 345 125 C 340 100 375 90 385 110 C 390 125 370 135 350 130 Z", cx: 365, cy: 112 });
  regions.push({ id: "dv-dino-tail", num: 1, d: "M 390 330 Q 460 320 480 350 Q 430 365 385 345 Z", cx: 435, cy: 340 });
  regions.push({ id: "dv-dino-belly", num: 2, d: "M 285 330 Q 330 315 370 335 Q 330 355 285 330 Z", cx: 330, cy: 340 });
  return regions;
}

// D. Sweet Smiling Apple
function buildSmilingApple() {
  const regions = [];
  regions.push({ id: "app-bg-1", num: 6, d: "M 0 0 L 250 0 L 250 250 L 0 250 Z", cx: 100, cy: 80 });
  regions.push({ id: "app-bg-2", num: 5, d: "M 250 0 L 500 0 L 500 250 L 250 250 Z", cx: 400, cy: 80 });
  regions.push({ id: "app-bg-3", num: 5, d: "M 0 250 L 250 250 L 250 500 L 0 500 Z", cx: 100, cy: 420 });
  regions.push({ id: "app-bg-4", num: 6, d: "M 250 250 L 500 250 L 500 500 L 250 500 Z", cx: 400, cy: 420 });

  regions.push({ id: "app-lobe-l", num: 1, d: "M 250 170 C 180 120 90 170 90 280 C 90 390 190 440 250 430 Z", cx: 180, cy: 300 });
  regions.push({ id: "app-lobe-r", num: 1, d: "M 250 170 C 320 120 410 170 410 280 C 410 390 310 440 250 430 Z", cx: 320, cy: 300 });

  regions.push({ id: "app-cheek-l", num: 4, d: "M 160 300 A 18 18 0 1 0 160 336 A 18 18 0 1 0 160 300 Z", cx: 160, cy: 318 });
  regions.push({ id: "app-cheek-r", num: 4, d: "M 340 300 A 18 18 0 1 0 340 336 A 18 18 0 1 0 340 300 Z", cx: 340, cy: 318 });

  regions.push({ id: "app-stem", num: 3, d: "M 245 175 Q 240 100 260 85 Q 270 85 260 170 Z", cx: 252, cy: 125 });
  regions.push({ id: "app-leaf", num: 2, d: "M 260 145 C 310 90 380 110 375 140 C 330 180 275 160 260 145 Z", cx: 320, cy: 140 });
  return regions;
}

// E. Sea Turtle Ocean Voyage
function buildSeaTurtle() {
  const regions = [];
  regions.push({ id: "turt-water-top", num: 4, d: "M 0 0 L 500 0 L 500 250 Q 250 210 0 250 Z", cx: 250, cy: 100 });
  regions.push({ id: "turt-water-mid", num: 5, d: "M 0 250 Q 250 210 500 250 L 500 420 Q 250 390 0 420 Z", cx: 100, cy: 330 });
  regions.push({ id: "turt-sand", num: 2, d: "M 0 420 Q 250 390 500 420 L 500 500 L 0 500 Z", cx: 250, cy: 460 });

  regions.push({ id: "turt-kelp-1", num: 6, d: "M 440 500 Q 410 380 450 280 Q 470 380 460 500 Z", cx: 445, cy: 390 });
  regions.push({ id: "turt-kelp-2", num: 6, d: "M 465 500 Q 485 410 470 330 Q 495 410 485 500 Z", cx: 480, cy: 420 });

  regions.push({ id: "turt-bub-1", num: 4, d: "M 320 80 A 15 15 0 1 0 320 110 A 15 15 0 1 0 320 80 Z", cx: 320, cy: 95 });
  regions.push({ id: "turt-bub-2", num: 4, d: "M 360 50 A 10 10 0 1 0 360 70 A 10 10 0 1 0 360 50 Z", cx: 360, cy: 60 });

  regions.push({ id: "turt-head", num: 1, d: "M 340 210 C 390 190 410 240 370 260 C 350 255 335 240 340 210 Z", cx: 365, cy: 228 });
  regions.push({ id: "turt-flip-fl", num: 1, d: "M 270 170 C 300 80 370 100 320 175 Z", cx: 310, cy: 135 });
  regions.push({ id: "turt-flip-fr", num: 1, d: "M 270 310 C 320 380 370 360 300 300 Z", cx: 310, cy: 340 });
  regions.push({ id: "turt-flip-bl", num: 1, d: "M 140 190 C 110 140 150 140 165 190 Z", cx: 140, cy: 165 });
  regions.push({ id: "turt-flip-br", num: 1, d: "M 140 290 C 110 335 150 345 165 290 Z", cx: 140, cy: 315 });
  regions.push({ id: "turt-tail", num: 1, d: "M 125 240 L 95 248 L 125 255 Z", cx: 110, cy: 248 });

  regions.push({ id: "turt-shell-rim", num: 2, d: "M 130 245 C 130 160 330 160 330 245 C 330 330 130 330 130 245 Z", cx: 230, cy: 180 });

  regions.push({ id: "turt-scute-c", num: 3, d: "M 210 220 L 250 220 L 270 245 L 250 270 L 210 270 L 190 245 Z", cx: 230, cy: 245 });
  regions.push({ id: "turt-scute-f", num: 3, d: "M 270 245 L 305 235 L 305 255 Z", cx: 290, cy: 245 });
  regions.push({ id: "turt-scute-t", num: 3, d: "M 215 220 L 230 190 L 250 190 L 245 220 Z", cx: 235, cy: 205 });
  regions.push({ id: "turt-scute-b", num: 3, d: "M 215 270 L 245 270 L 250 300 L 230 300 Z", cx: 235, cy: 285 });
  regions.push({ id: "turt-scute-l", num: 3, d: "M 190 245 L 155 235 L 155 255 Z", cx: 170, cy: 245 });
  return regions;
}

// F. Playful Garden Kitten
function buildGardenKitten() {
  const regions = [];
  regions.push({ id: "cat-sky", num: 6, d: "M 0 0 L 500 0 L 500 370 L 0 370 Z", cx: 250, cy: 60 });
  regions.push({ id: "cat-grass", num: 4, d: "M 0 370 L 500 370 L 500 500 L 0 500 Z", cx: 250, cy: 460 });

  for (let f = 0; f < 5; f++) {
    const fx = 40 + f * 95;
    regions.push({ id: `cat-fence-${f}`, num: 5, d: `M ${fx} 200 L ${fx + 25} 170 L ${fx + 50} 200 L ${fx + 50} 370 L ${fx} 370 Z`, cx: fx + 25, cy: 280 });
  }

  regions.push({ id: "cat-flw-1", num: 7, d: "M 60 410 A 18 18 0 1 0 60 446 A 18 18 0 1 0 60 410 Z", cx: 60, cy: 428 });
  regions.push({ id: "cat-flw-2", num: 7, d: "M 430 400 A 20 20 0 1 0 430 440 A 20 20 0 1 0 430 400 Z", cx: 430, cy: 420 });

  regions.push({ id: "cat-ear-l", num: 1, d: "M 180 200 L 170 120 L 230 160 Z", cx: 190, cy: 155 });
  regions.push({ id: "cat-ear-r", num: 1, d: "M 320 200 L 330 120 L 270 160 Z", cx: 310, cy: 155 });
  regions.push({ id: "cat-ear-in-l", num: 3, d: "M 185 185 L 180 135 L 220 165 Z", cx: 195, cy: 160 });
  regions.push({ id: "cat-ear-in-r", num: 3, d: "M 315 185 L 320 135 L 280 165 Z", cx: 305, cy: 160 });
  regions.push({ id: "cat-head", num: 1, d: "M 250 160 C 170 160 160 270 250 270 C 340 270 330 160 250 160 Z", cx: 250, cy: 215 });

  regions.push({ id: "cat-stripe-mid", num: 2, d: "M 245 162 L 255 162 L 252 195 L 248 195 Z", cx: 250, cy: 180 });
  regions.push({ id: "cat-stripe-l", num: 2, d: "M 225 168 L 235 170 L 230 195 L 222 192 Z", cx: 228, cy: 180 });
  regions.push({ id: "cat-stripe-r", num: 2, d: "M 275 168 L 265 170 L 270 195 L 278 192 Z", cx: 272, cy: 180 });

  regions.push({ id: "cat-nose", num: 3, d: "M 243 228 L 257 228 L 250 238 Z", cx: 250, cy: 233 });

  regions.push({ id: "cat-body", num: 1, d: "M 210 265 C 190 310 190 380 230 395 L 270 395 C 310 380 310 310 290 265 Z", cx: 250, cy: 330 });
  regions.push({ id: "cat-paw-l", num: 1, d: "M 215 385 A 18 14 0 1 0 245 385 Z", cx: 230, cy: 388 });
  regions.push({ id: "cat-paw-r", num: 1, d: "M 255 385 A 18 14 0 1 0 285 385 Z", cx: 270, cy: 388 });

  regions.push({ id: "cat-tail", num: 1, d: "M 290 370 C 350 365 375 320 365 290 C 355 310 335 340 285 355 Z", cx: 335, cy: 335 });
  regions.push({ id: "cat-tail-stripe", num: 2, d: "M 345 325 C 365 315 365 295 360 295 C 350 305 340 315 345 325 Z", cx: 355, cy: 310 });
  return regions;
}

// =========================================================
// 2. MANDALA GENERATORS (Mathematical Radial Vector Geometry)
// =========================================================

function buildSunburstMandala() {
  const regions = [];
  const cx = 250, cy = 250;
  const N = 16;
  const r1 = 65;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const p1x = (cx + r1 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r1 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r1 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r1 * Math.sin(a2)).toFixed(1);
    const d = `M ${cx} ${cy} L ${p1x} ${p1y} L ${p2x} ${p2y} Z`;
    regions.push({ id: `sun-center-${i}`, num: (i % 2 === 0 ? 1 : 2), d, cx: Math.round(cx + (r1 * 0.55) * Math.cos((a1 + a2) / 2)), cy: Math.round(cy + (r1 * 0.55) * Math.sin((a1 + a2) / 2)) });
  }

  const r2 = 120;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r1 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r1 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r1 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r1 * Math.sin(a2)).toFixed(1);
    const pOutx = (cx + r2 * Math.cos(amid)).toFixed(1);
    const pOuty = (cy + r2 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${pOutx} ${pOuty} L ${p2x} ${p2y} Z`;
    regions.push({ id: `sun-mid-${i}`, num: (i % 2 === 0 ? 3 : 4), d, cx: Math.round(cx + (r1 * 0.4 + r2 * 0.6) * Math.cos(amid)), cy: Math.round(cy + (r1 * 0.4 + r2 * 0.6) * Math.sin(amid)) });
  }

  const r3 = 165;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const p1x = (cx + r2 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r2 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r3 * Math.cos(a1)).toFixed(1);
    const p2y = (cy + r3 * Math.sin(a1)).toFixed(1);
    const p3x = (cx + r3 * Math.cos(a2)).toFixed(1);
    const p3y = (cy + r3 * Math.sin(a2)).toFixed(1);
    const p4x = (cx + r2 * Math.cos(a2)).toFixed(1);
    const p4y = (cy + r2 * Math.sin(a2)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} Z`;
    regions.push({ id: `sun-ring-${i}`, num: (i % 2 === 0 ? 2 : 5), d, cx: Math.round(cx + ((r2 + r3) / 2) * Math.cos((a1 + a2) / 2)), cy: Math.round(cy + ((r2 + r3) / 2) * Math.sin((a1 + a2) / 2)) });
  }

  const r4 = 230;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r3 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r3 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r3 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r3 * Math.sin(a2)).toFixed(1);
    const tipX = (cx + r4 * Math.cos(amid)).toFixed(1);
    const tipY = (cy + r4 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${tipX} ${tipY} L ${p2x} ${p2y} Z`;
    regions.push({ id: `sun-ray-${i}`, num: (i % 2 === 0 ? 1 : 3), d, cx: Math.round(cx + (r3 * 0.45 + r4 * 0.55) * Math.cos(amid)), cy: Math.round(cy + (r3 * 0.45 + r4 * 0.55) * Math.cos(amid)) });
  }
  return regions;
}

function buildFlowerMandala() {
  const regions = [];
  const cx = 250, cy = 250;
  const N = 8;
  regions.push({ id: "flower-center", num: 2, d: `M ${cx} ${cy - 30} A 30 30 0 1 0 ${cx} ${cy + 30} A 30 30 0 1 0 ${cx} ${cy - 30} Z`, cx, cy });

  const r1 = 30, r2 = 68;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r1 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r1 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r1 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r1 * Math.sin(a2)).toFixed(1);
    const tipX = (cx + r2 * Math.cos(amid)).toFixed(1);
    const tipY = (cy + r2 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} Q ${cx + (r2*0.8)*Math.cos(a1)} ${cy + (r2*0.8)*Math.sin(a1)} ${tipX} ${tipY} Q ${cx + (r2*0.8)*Math.cos(a2)} ${cy + (r2*0.8)*Math.sin(a2)} ${p2x} ${p2y} Z`;
    regions.push({ id: `flower-petal-inner-${i}`, num: 1, d, cx: Math.round(cx + ((r1+r2)/2)*Math.cos(amid)), cy: Math.round(cy + ((r1+r2)/2)*Math.sin(amid)) });
  }

  const r3 = 70, r4 = 135;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r3 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r3 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r3 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r3 * Math.sin(a2)).toFixed(1);
    const tipX = (cx + r4 * Math.cos(amid)).toFixed(1);
    const tipY = (cy + r4 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} Q ${cx + r4*Math.cos(a1)} ${cy + r4*Math.sin(a1)} ${tipX} ${tipY} Q ${cx + r4*Math.cos(a2)} ${cy + r4*Math.sin(a2)} ${p2x} ${p2y} Z`;
    regions.push({ id: `flower-petal-mid-${i}`, num: 6, d, cx: Math.round(cx + (r3*0.4 + r4*0.6)*Math.cos(amid)), cy: Math.round(cy + (r3*0.4 + r4*0.6)*Math.sin(amid)) });
  }

  for (let i = 0; i < N; i++) {
    const amid = ((i + 0.5) * 2 * Math.PI) / N;
    const dotX = cx + 100 * Math.cos(amid);
    const dotY = cy + 100 * Math.sin(amid);
    const rad = 14;
    const d = `M ${dotX} ${dotY - rad} A ${rad} ${rad} 0 1 0 ${dotX} ${dotY + rad} A ${rad} ${rad} 0 1 0 ${dotX} ${dotY - rad} Z`;
    regions.push({ id: `flower-dot-${i}`, num: 5, d, cx: Math.round(dotX), cy: Math.round(dotY) });
  }

  const r5 = 140, r6 = 220;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r5 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r5 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r5 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r5 * Math.sin(a2)).toFixed(1);
    const tipX = (cx + r6 * Math.cos(amid)).toFixed(1);
    const tipY = (cy + r6 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} C ${cx + r6*Math.cos(a1)} ${cy + r6*Math.sin(a1)} ${tipX} ${tipY} ${tipX} ${tipY} C ${tipX} ${tipY} ${cx + r6*Math.cos(a2)} ${cy + r6*Math.sin(a2)} ${p2x} ${p2y} Z`;
    regions.push({ id: `flower-petal-outer-${i}`, num: 8, d, cx: Math.round(cx + 175 * Math.cos(amid)), cy: Math.round(cy + 175 * Math.sin(amid)) });
  }
  return regions;
}

function buildPizzaMandala() {
  const regions = [];
  const cx = 250, cy = 250;
  const N = 8;
  const rCrust = 240;
  const rSauce = 210;

  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const p1x = (cx + rSauce * Math.cos(a1)).toFixed(1);
    const p1y = (cy + rSauce * Math.sin(a1)).toFixed(1);
    const p2x = (cx + rCrust * Math.cos(a1)).toFixed(1);
    const p2y = (cy + rCrust * Math.sin(a1)).toFixed(1);
    const p3x = (cx + rCrust * Math.cos(a2)).toFixed(1);
    const p3y = (cy + rCrust * Math.sin(a2)).toFixed(1);
    const p4x = (cx + rSauce * Math.cos(a2)).toFixed(1);
    const p4y = (cy + rSauce * Math.sin(a2)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${p2x} ${p2y} A ${rCrust} ${rCrust} 0 0 1 ${p3x} ${p3y} L ${p4x} ${p4y} A ${rSauce} ${rSauce} 0 0 0 ${p1x} ${p1y} Z`;
    regions.push({ id: `pizza-crust-${i}`, num: 8, d, cx: Math.round(cx + 225 * Math.cos((a1 + a2) / 2)), cy: Math.round(cy + 225 * Math.sin((a1 + a2) / 2)) });
  }

  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const p1x = (cx + rSauce * Math.cos(a1)).toFixed(1);
    const p1y = (cy + rSauce * Math.sin(a1)).toFixed(1);
    const p2x = (cx + rSauce * Math.cos(a2)).toFixed(1);
    const p2y = (cy + rSauce * Math.sin(a2)).toFixed(1);
    const d = `M ${cx} ${cy} L ${p1x} ${p1y} A ${rSauce} ${rSauce} 0 0 1 ${p2x} ${p2y} Z`;
    regions.push({ id: `pizza-slice-${i}`, num: 10, d, cx: Math.round(cx + 100 * Math.cos((a1 + a2) / 2)), cy: Math.round(cy + 100 * Math.sin((a1 + a2) / 2)) });
  }

  for (let i = 0; i < N; i++) {
    const a = ((i + 0.5) * 2 * Math.PI) / N;
    const pepX = Math.round(cx + 145 * Math.cos(a));
    const pepY = Math.round(cy + 145 * Math.sin(a));
    const rad = 22;
    const d = `M ${pepX} ${pepY - rad} A ${rad} ${rad} 0 1 0 ${pepX} ${pepY + rad} A ${rad} ${rad} 0 1 0 ${pepX} ${pepY - rad} Z`;
    regions.push({ id: `pizza-pep-${i}`, num: 5, d, cx: pepX, cy: pepY });
  }

  for (let i = 0; i < N; i++) {
    const a = (i * 2 * Math.PI) / N;
    const pepX = Math.round(cx + 85 * Math.cos(a));
    const pepY = Math.round(cy + 85 * Math.sin(a));
    const rad = 15;
    const d = `M ${pepX} ${pepY - rad} A ${rad} ${rad} 0 1 0 ${pepX} ${pepY + rad} A ${rad} ${rad} 0 1 0 ${pepX} ${pepY - rad} Z`;
    regions.push({ id: `pizza-pep-inner-${i}`, num: 5, d, cx: pepX, cy: pepY });
  }

  for (let i = 0; i < N; i++) {
    const a = ((i + 0.3) * 2 * Math.PI) / N;
    const mushX = Math.round(cx + 175 * Math.cos(a));
    const mushY = Math.round(cy + 175 * Math.sin(a));
    const rad = 12;
    const d = `M ${mushX - rad} ${mushY} A ${rad} ${rad} 0 0 1 ${mushX + rad} ${mushY} L ${mushX + 4} ${mushY + 10} L ${mushX - 4} ${mushY + 10} Z`;
    regions.push({ id: `pizza-mush-${i}`, num: 9, d, cx: mushX, cy: mushY + 3 });
  }

  for (let i = 0; i < N; i++) {
    const a = ((i + 0.7) * 2 * Math.PI) / N;
    const pepX = Math.round(cx + 180 * Math.cos(a));
    const pepY = Math.round(cy + 180 * Math.sin(a));
    const d = `M ${pepX - 10} ${pepY - 5} L ${pepX + 10} ${pepY - 5} L ${pepX + 10} ${pepY + 5} L ${pepX - 10} ${pepY + 5} Z`;
    regions.push({ id: `pizza-pep-strip-${i}`, num: 6, d, cx: pepX, cy: pepY });
  }
  return regions;
}

function buildCrystalMandala() {
  const regions = [];
  const cx = 250, cy = 250;
  const N = 12;
  const rHex = 45;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const p1x = (cx + rHex * Math.cos(a1)).toFixed(1);
    const p1y = (cy + rHex * Math.sin(a1)).toFixed(1);
    const p2x = (cx + rHex * Math.cos(a2)).toFixed(1);
    const p2y = (cy + rHex * Math.sin(a2)).toFixed(1);
    const d = `M ${cx} ${cy} L ${p1x} ${p1y} L ${p2x} ${p2y} Z`;
    regions.push({ id: `ice-core-${i}`, num: 1, d, cx: Math.round(cx + 25 * Math.cos((a1 + a2) / 2)), cy: Math.round(cy + 25 * Math.sin((a1 + a2) / 2)) });
  }

  const r1 = 45, r2 = 110;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r1 * Math.cos(a1)).toFixed(1);
    const p1y = (cy + r1 * Math.sin(a1)).toFixed(1);
    const p2x = (cx + r1 * Math.cos(a2)).toFixed(1);
    const p2y = (cy + r1 * Math.sin(a2)).toFixed(1);
    const p3x = (cx + r2 * Math.cos(amid)).toFixed(1);
    const p3y = (cy + r2 * Math.sin(amid)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${p3x} ${p3y} L ${p2x} ${p2y} Z`;
    regions.push({ id: `ice-diam-${i}`, num: (i % 2 === 0 ? 2 : 3), d, cx: Math.round(cx + 75 * Math.cos(amid)), cy: Math.round(cy + 75 * Math.sin(amid)) });
  }

  for (let i = 0; i < N; i++) {
    const amid = ((i + 0.5) * 2 * Math.PI) / N;
    const aNext = ((i + 1.5) * 2 * Math.PI) / N;
    const pTip1X = (cx + r2 * Math.cos(amid)).toFixed(1);
    const pTip1Y = (cy + r2 * Math.sin(amid)).toFixed(1);
    const pTip2X = (cx + r2 * Math.cos(aNext)).toFixed(1);
    const pTip2Y = (cy + r2 * Math.sin(aNext)).toFixed(1);
    const pWingLX = (cx + 140 * Math.cos(amid + 0.08)).toFixed(1);
    const pWingLY = (cy + 140 * Math.sin(amid + 0.08)).toFixed(1);
    const pWingRX = (cx + 140 * Math.cos(amid - 0.08)).toFixed(1);
    const pWingRY = (cy + 140 * Math.sin(amid - 0.08)).toFixed(1);
    const pOutX = (cx + 170 * Math.cos(amid)).toFixed(1);
    const pOutY = (cy + 170 * Math.sin(amid)).toFixed(1);
    const d = `M ${pTip1X} ${pTip1Y} L ${pWingLX} ${pWingLY} L ${pOutX} ${pOutY} L ${pWingRX} ${pWingRY} Z`;
    regions.push({ id: `ice-arm-${i}`, num: 4, d, cx: Math.round(cx + 130 * Math.cos(amid)), cy: Math.round(cy + 130 * Math.sin(amid)) });
  }

  const r3 = 235;
  for (let i = 0; i < N; i++) {
    const a1 = (i * 2 * Math.PI) / N;
    const a2 = ((i + 1) * 2 * Math.PI) / N;
    const amid = (a1 + a2) / 2;
    const p1x = (cx + r2 * Math.cos(amid)).toFixed(1);
    const p1y = (cy + r2 * Math.sin(amid)).toFixed(1);
    const pStarX = (cx + r3 * Math.cos(amid)).toFixed(1);
    const pStarY = (cy + r3 * Math.sin(amid)).toFixed(1);
    const side1X = (cx + (r3 * 0.75) * Math.cos(a1)).toFixed(1);
    const side1Y = (cy + (r3 * 0.75) * Math.sin(a1)).toFixed(1);
    const side2X = (cx + (r3 * 0.75) * Math.cos(a2)).toFixed(1);
    const side2Y = (cy + (r3 * 0.75) * Math.sin(a2)).toFixed(1);
    const d = `M ${p1x} ${p1y} L ${side1X} ${side1Y} L ${pStarX} ${pStarY} L ${side2X} ${side2Y} Z`;
    regions.push({ id: `ice-star-${i}`, num: (i % 2 === 0 ? 5 : 6), d, cx: Math.round(cx + 195 * Math.cos(amid)), cy: Math.round(cy + 195 * Math.sin(amid)) });
  }
  return regions;
}

function buildRainbowMandala() {
  const regions = [];
  const cx = 250, cy = 250;
  const N = 8;
  const radii = [0, 35, 70, 105, 140, 175, 210, 240];

  for (let tier = 0; tier < 7; tier++) {
    const rIn = radii[tier];
    const rOut = radii[tier + 1];
    const colorNum = tier + 1;

    for (let i = 0; i < N; i++) {
      const a1 = (i * 2 * Math.PI) / N;
      const a2 = ((i + 1) * 2 * Math.PI) / N;
      const amid = (a1 + a2) / 2;
      let d = "";
      if (rIn === 0) {
        const p1x = (cx + rOut * Math.cos(a1)).toFixed(1);
        const p1y = (cy + rOut * Math.sin(a1)).toFixed(1);
        const p2x = (cx + rOut * Math.cos(a2)).toFixed(1);
        const p2y = (cy + rOut * Math.sin(a2)).toFixed(1);
        d = `M ${cx} ${cy} L ${p1x} ${p1y} L ${p2x} ${p2y} Z`;
      } else {
        const p1x = (cx + rIn * Math.cos(a1)).toFixed(1);
        const p1y = (cy + rIn * Math.sin(a1)).toFixed(1);
        const p2x = (cx + rOut * Math.cos(a1)).toFixed(1);
        const p2y = (cy + rOut * Math.sin(a1)).toFixed(1);
        const p3x = (cx + rOut * Math.cos(a2)).toFixed(1);
        const p3y = (cy + rOut * Math.sin(a2)).toFixed(1);
        const p4x = (cx + rIn * Math.cos(a2)).toFixed(1);
        const p4y = (cy + rIn * Math.sin(a2)).toFixed(1);
        d = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} Z`;
      }

      const rMid = (rIn === 0) ? rOut * 0.55 : (rIn + rOut) / 2;
      regions.push({ id: `rbow-t${tier}-${i}`, num: colorNum, d, cx: Math.round(cx + rMid * Math.cos(amid)), cy: Math.round(cy + rMid * Math.sin(amid)) });
    }
  }
  return regions;
}

// =========================================================
// 3. MASTER ARTWORKS CATALOG (32 Total Pictures!)
// =========================================================

const ARTWORKS = [
  // ==========================================
  // 🖍️ CLASSIC COLORING BOOKS (Google Printable Style!)
  // ==========================================
  {
    id: "cute-bird",
    title: "Cute Bird on a Branch",
    category: "coloring-sheets",
    categories: ["coloring-sheets", "animals"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🦜",
    difficulty: "Printable (6 Colors)",
    palette: [
      { num: 1, name: "Ruby Red", hex: "#e53935" },
      { num: 2, name: "Royal Blue", hex: "#1976d2" },
      { num: 3, name: "Sunny Yellow", hex: "#ffeb3b" },
      { num: 4, name: "Forest Green", hex: "#43a047" },
      { num: 5, name: "Sky Cyan", hex: "#81d4fa" },
      { num: 6, name: "Branch Brown", hex: "#8d6e63" }
    ],
    regions: buildCuteBird()
  },
  {
    id: "smiling-flowers",
    title: "Happy Smiling Flowers",
    category: "coloring-sheets",
    categories: ["coloring-sheets", "mandalas"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🌸",
    difficulty: "Printable (7 Colors)",
    palette: [
      { num: 1, name: "Sun Yellow", hex: "#ffeb3b" },
      { num: 2, name: "Purple Petal", hex: "#9c27b0" },
      { num: 3, name: "Butterfly Red", hex: "#e53935" },
      { num: 4, name: "Stem Green", hex: "#4caf50" },
      { num: 5, name: "Warm Orange", hex: "#ff9800" },
      { num: 6, name: "Sky Blue", hex: "#80d8ff" },
      { num: 7, name: "Grass Hill", hex: "#2e7d32" }
    ],
    regions: buildSmilingFlowers()
  },
  {
    id: "dino-volcano",
    title: "Dino & Volcano Island",
    category: "coloring-sheets",
    categories: ["coloring-sheets", "dinosaurs"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🌋",
    difficulty: "Printable (8 Colors)",
    palette: [
      { num: 1, name: "Dino Green", hex: "#66bb6a" },
      { num: 2, name: "Sun Yellow", hex: "#ffeb3b" },
      { num: 3, name: "Lava Red", hex: "#e53935" },
      { num: 4, name: "Smoke Gray", hex: "#cfd8dc" },
      { num: 5, name: "Grass Hill", hex: "#388e3c" },
      { num: 6, name: "Volcano Rock", hex: "#5d4037" },
      { num: 7, name: "Sky Blue", hex: "#81d4fa" },
      { num: 8, name: "Lava Orange", hex: "#ff9800" }
    ],
    regions: buildDinoVolcano()
  },
  {
    id: "smiling-apple",
    title: "Sweet Smiling Apple",
    category: "coloring-sheets",
    categories: ["coloring-sheets"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🍎",
    difficulty: "Printable (6 Colors)",
    palette: [
      { num: 1, name: "Apple Red", hex: "#d32f2f" },
      { num: 2, name: "Leaf Green", hex: "#43a047" },
      { num: 3, name: "Wood Stem", hex: "#795548" },
      { num: 4, name: "Cheek Pink", hex: "#f48fb1" },
      { num: 5, name: "Warm Sun", hex: "#fff59d" },
      { num: 6, name: "Sky Mint", hex: "#b2ebf2" }
    ],
    regions: buildSmilingApple()
  },
  {
    id: "sea-turtle",
    title: "Sea Turtle Ocean Voyage",
    category: "coloring-sheets",
    categories: ["coloring-sheets", "animals"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🐢",
    difficulty: "Printable (6 Colors)",
    palette: [
      { num: 1, name: "Turtle Green", hex: "#4caf50" },
      { num: 2, name: "Sand Gold", hex: "#fbc02d" },
      { num: 3, name: "Shell Brown", hex: "#8d6e63" },
      { num: 4, name: "Water Cyan", hex: "#00e5ff" },
      { num: 5, name: "Deep Ocean", hex: "#1565c0" },
      { num: 6, name: "Seaweed Green", hex: "#1b5e20" }
    ],
    regions: buildSeaTurtle()
  },
  {
    id: "garden-kitten",
    title: "Playful Garden Kitten",
    category: "coloring-sheets",
    categories: ["coloring-sheets", "animals"],
    categoryLabel: "Coloring Book",
    type: "vector",
    icon: "🐱",
    difficulty: "Printable (7 Colors)",
    palette: [
      { num: 1, name: "Kitten Cream", hex: "#ffecb3" },
      { num: 2, name: "Tabby Orange", hex: "#ff9800" },
      { num: 3, name: "Ear Pink", hex: "#f48fb1" },
      { num: 4, name: "Lawn Green", hex: "#4caf50" },
      { num: 5, name: "Fence Wood", hex: "#bcaaa4" },
      { num: 6, name: "Sky Blue", hex: "#90caf9" },
      { num: 7, name: "Daisy Red", hex: "#e53935" }
    ],
    regions: buildGardenKitten()
  },

  // ==========================================
  // 🌸 MANDALAS & GEOMETRIC (5 Artworks)
  // ==========================================
  {
    id: "sunburst-mandala",
    title: "Sunburst Star Mandala",
    category: "mandalas",
    categories: ["mandalas"],
    categoryLabel: "Mandalas",
    type: "mandala",
    icon: "☀️",
    difficulty: "Geometric (5 Colors)",
    palette: [
      { num: 1, name: "Golden Yellow", hex: "#fbc02d" },
      { num: 2, name: "Hot Pink", hex: "#e91e63" },
      { num: 3, name: "Bright Cyan", hex: "#00e5ff" },
      { num: 4, name: "Deep Violet", hex: "#4a148c" },
      { num: 5, name: "Bright Red", hex: "#e53935" }
    ],
    regions: buildSunburstMandala()
  },
  {
    id: "flower-mandala",
    title: "Blooming Floral Mandala",
    category: "mandalas",
    categories: ["mandalas"],
    categoryLabel: "Mandalas",
    type: "mandala",
    icon: "🌺",
    difficulty: "Floral (8 Colors)",
    palette: [
      { num: 1, name: "Red", hex: "#e53935" },
      { num: 2, name: "Yellow", hex: "#ffeb3b" },
      { num: 3, name: "Orange", hex: "#ff9800" },
      { num: 4, name: "Maroon", hex: "#880e4f" },
      { num: 5, name: "Blue", hex: "#1e88e5" },
      { num: 6, name: "Green", hex: "#43a047" },
      { num: 7, name: "Violet", hex: "#8e24aa" },
      { num: 8, name: "Magenta", hex: "#d81b60" }
    ],
    regions: buildFlowerMandala()
  },
  {
    id: "pizza-mandala",
    title: "Pizza Party Mandala",
    category: "mandalas",
    categories: ["mandalas"],
    categoryLabel: "Mandalas",
    type: "mandala",
    icon: "🍕",
    difficulty: "Fun Food (10 Colors)",
    palette: [
      { num: 1, name: "Light Pink", hex: "#f48fb1" },
      { num: 2, name: "Light Blue", hex: "#81d4fa" },
      { num: 3, name: "Dark Blue", hex: "#1565c0" },
      { num: 4, name: "Green", hex: "#4caf50" },
      { num: 5, name: "Pepperoni Red", hex: "#e53935" },
      { num: 6, name: "Dark Green", hex: "#1b5e20" },
      { num: 7, name: "Purple", hex: "#9c27b0" },
      { num: 8, name: "Crust Orange", hex: "#f57c00" },
      { num: 9, name: "Mushroom Brown", hex: "#6d4c41" },
      { num: 10, name: "Cheese Yellow", hex: "#ffeb3b" }
    ],
    regions: buildPizzaMandala()
  },
  {
    id: "crystal-mandala",
    title: "Crystal Ice Snowflake",
    category: "mandalas",
    categories: ["mandalas"],
    categoryLabel: "Mandalas",
    type: "mandala",
    icon: "❄️",
    difficulty: "Geometric (6 Colors)",
    palette: [
      { num: 1, name: "Pure White", hex: "#ffffff" },
      { num: 2, name: "Ice Cyan", hex: "#80deea" },
      { num: 3, name: "Sky Blue", hex: "#29b6f6" },
      { num: 4, name: "Deep Cobalt", hex: "#1565c0" },
      { num: 5, name: "Frost Violet", hex: "#7e57c2" },
      { num: 6, name: "Midnight Navy", hex: "#0d47a1" }
    ],
    regions: buildCrystalMandala()
  },
  {
    id: "rainbow-mandala",
    title: "Rainbow Kaleidoscope",
    category: "mandalas",
    categories: ["mandalas"],
    categoryLabel: "Mandalas",
    type: "mandala",
    icon: "🌈",
    difficulty: "Rainbow (7 Colors)",
    palette: [
      { num: 1, name: "Ruby Red", hex: "#e53935" },
      { num: 2, name: "Sunset Orange", hex: "#fb8c00" },
      { num: 3, name: "Sun Yellow", hex: "#ffeb3b" },
      { num: 4, name: "Emerald Green", hex: "#43a047" },
      { num: 5, name: "Ocean Blue", hex: "#039be5" },
      { num: 6, name: "Indigo Purple", hex: "#3949ab" },
      { num: 7, name: "Violet Orchid", hex: "#8e24aa" }
    ],
    regions: buildRainbowMandala()
  },

  // ==========================================
  // 🟩 MINECRAFT (4 Artworks)
  // ==========================================
  {
    id: "minecraft-creeper",
    title: "Creeper Face",
    category: "minecraft",
    categories: ["minecraft"],
    categoryLabel: "Minecraft",
    type: "pixel",
    icon: "🟩",
    difficulty: "Easy (5 Colors)",
    width: 10,
    height: 10,
    palette: [
      { num: 1, name: "Dark Green", hex: "#2e7d32" },
      { num: 2, name: "Grass Green", hex: "#43a047" },
      { num: 3, name: "Lime Green", hex: "#7cb342" },
      { num: 4, name: "Pale Green", hex: "#9ccc65" },
      { num: 5, name: "Creeper Black", hex: "#212121" }
    ],
    grid: [
      [2, 3, 1, 4, 2, 3, 1, 4, 2, 3],
      [4, 1, 3, 2, 4, 1, 3, 2, 1, 4],
      [1, 5, 5, 3, 2, 3, 5, 5, 4, 2],
      [3, 5, 5, 1, 4, 2, 5, 5, 2, 1],
      [2, 4, 2, 5, 5, 5, 5, 1, 3, 4],
      [4, 1, 5, 5, 5, 5, 5, 5, 4, 2],
      [1, 3, 5, 5, 1, 3, 5, 5, 2, 1],
      [3, 4, 5, 5, 4, 2, 5, 5, 1, 3],
      [2, 1, 5, 2, 3, 1, 4, 5, 3, 4],
      [4, 3, 2, 4, 1, 4, 2, 3, 1, 2]
    ]
  },
  {
    id: "minecraft-sword",
    title: "Diamond Sword",
    category: "minecraft",
    categories: ["minecraft"],
    categoryLabel: "Minecraft",
    type: "pixel",
    icon: "💎",
    difficulty: "Medium (6 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Outline Black", hex: "#263238" },
      { num: 2, name: "Diamond Light", hex: "#80deea" },
      { num: 3, name: "Diamond Cyan", hex: "#00e5ff" },
      { num: 4, name: "Diamond Deep", hex: "#0097a7" },
      { num: 5, name: "Wood Brown", hex: "#8d6e63" },
      { num: 6, name: "Gold Guard", hex: "#ffca28" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 6, 3, 4, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 6, 6, 6, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 6, 5, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 5, 6, 1, 5, 6, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 5, 1, 0, 1, 6, 6, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "minecraft-steve",
    title: "Minecraft Steve",
    category: "minecraft",
    categories: ["minecraft"],
    categoryLabel: "Minecraft",
    type: "pixel",
    icon: "🧑‍🌾",
    difficulty: "Medium (7 Colors)",
    width: 10,
    height: 10,
    palette: [
      { num: 1, name: "Dark Hair", hex: "#3e2723" },
      { num: 2, name: "Skin Peach", hex: "#ffcc80" },
      { num: 3, name: "Skin Shadow", hex: "#d7ccc8" },
      { num: 4, name: "Eye White", hex: "#ffffff" },
      { num: 5, name: "Eye Purple-Blue", hex: "#3f51b5" },
      { num: 6, name: "Nose Tan", hex: "#bcaaa4" },
      { num: 7, name: "Mouth Brown", hex: "#4e342e" }
    ],
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 4, 5, 2, 2, 2, 2, 4, 5, 2],
      [2, 2, 2, 2, 6, 6, 2, 2, 2, 2],
      [2, 2, 2, 7, 7, 7, 7, 2, 2, 2],
      [2, 2, 7, 7, 7, 7, 7, 7, 2, 2],
      [1, 1, 7, 2, 2, 2, 2, 7, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    id: "diamond-pickaxe",
    title: "Diamond Pickaxe",
    category: "minecraft",
    categories: ["minecraft"],
    categoryLabel: "Minecraft",
    type: "pixel",
    icon: "⛏️",
    difficulty: "Medium (5 Colors)",
    width: 12,
    height: 12,
    palette: [
      { num: 1, name: "Outline Black", hex: "#212121" },
      { num: 2, name: "Diamond Cyan", hex: "#00e5ff" },
      { num: 3, name: "Diamond Deep", hex: "#0097a7" },
      { num: 4, name: "Wood Stick", hex: "#8d6e63" },
      { num: 5, name: "Iron Joint", hex: "#b0bec5" }
    ],
    grid: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 2, 2, 3, 2, 2, 2, 2, 1],
      [0, 0, 1, 2, 2, 5, 2, 2, 2, 3, 2, 1],
      [0, 1, 2, 2, 5, 4, 5, 2, 2, 1, 1, 0],
      [1, 2, 2, 5, 4, 4, 4, 5, 1, 0, 0, 0],
      [1, 2, 2, 4, 4, 4, 4, 1, 0, 0, 0, 0],
      [1, 2, 1, 0, 4, 4, 4, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 4, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
    ]
  },

  // ==========================================
  // 🏎️ CARS & VEHICLES (4 Artworks)
  // ==========================================
  {
    id: "speedy-race-car",
    title: "Speedy Race Car",
    category: "cars",
    categories: ["cars"],
    categoryLabel: "Cars & Vehicles",
    type: "pixel",
    icon: "🏎️",
    difficulty: "Easy (6 Colors)",
    width: 16,
    height: 10,
    palette: [
      { num: 1, name: "Racing Red", hex: "#e53935" },
      { num: 2, name: "Dark Crimson", hex: "#b71c1c" },
      { num: 3, name: "Windshield Blue", hex: "#4fc3f7" },
      { num: 4, name: "Tire Rubber", hex: "#212121" },
      { num: 5, name: "Wheel Rim", hex: "#e0e0e0" },
      { num: 6, name: "Speed Yellow", hex: "#ffeb3b" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 0],
      [0, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 6, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2],
      [0, 4, 5, 5, 4, 0, 0, 0, 4, 5, 5, 4, 0, 0, 0, 0],
      [0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "monster-truck",
    title: "Monster Truck",
    category: "cars",
    categories: ["cars"],
    categoryLabel: "Cars & Vehicles",
    type: "pixel",
    icon: "🛻",
    difficulty: "Medium (6 Colors)",
    width: 14,
    height: 12,
    palette: [
      { num: 1, name: "Truck Orange", hex: "#ff6f00" },
      { num: 2, name: "Bright Yellow", hex: "#ffd600" },
      { num: 3, name: "Glass Blue", hex: "#81d4fa" },
      { num: 4, name: "Steel Gray", hex: "#78909c" },
      { num: 5, name: "Giant Tire", hex: "#263238" },
      { num: 6, name: "Hubcap Gold", hex: "#ffa000" }
    ],
    grid: [
      [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 3, 3, 3, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
      [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0],
      [5, 5, 6, 5, 5, 0, 0, 5, 5, 6, 5, 5, 0, 0],
      [5, 6, 6, 6, 5, 0, 0, 5, 6, 6, 6, 5, 0, 0],
      [5, 5, 6, 5, 5, 0, 0, 5, 5, 6, 5, 5, 0, 0],
      [0, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0]
    ]
  },
  {
    id: "police-car",
    title: "Police Patrol Cruiser",
    category: "cars",
    categories: ["cars"],
    categoryLabel: "Cars & Vehicles",
    type: "pixel",
    icon: "🚓",
    difficulty: "Easy (6 Colors)",
    width: 16,
    height: 10,
    palette: [
      { num: 1, name: "Police Blue", hex: "#1976d2" },
      { num: 2, name: "Door White", hex: "#ffffff" },
      { num: 3, name: "Siren Red", hex: "#d32f2f" },
      { num: 4, name: "Siren Blue", hex: "#0288d1" },
      { num: 5, name: "Window Sky", hex: "#80d8ff" },
      { num: 6, name: "Tire Black", hex: "#212121" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1],
      [0, 6, 2, 2, 6, 0, 0, 0, 0, 6, 2, 2, 6, 0, 0, 0],
      [0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0]
    ]
  },
  {
    id: "fire-truck",
    title: "Fire Engine Rescue",
    category: "cars",
    categories: ["cars"],
    categoryLabel: "Cars & Vehicles",
    type: "pixel",
    icon: "🚒",
    difficulty: "Medium (6 Colors)",
    width: 16,
    height: 11,
    palette: [
      { num: 1, name: "Engine Red", hex: "#d32f2f" },
      { num: 2, name: "Ladder Silver", hex: "#b0bec5" },
      { num: 3, name: "Beacon Yellow", hex: "#ffeb3b" },
      { num: 4, name: "Cab Window", hex: "#4fc3f7" },
      { num: 5, name: "Tire Rubber", hex: "#212121" },
      { num: 6, name: "Stripe White", hex: "#ffffff" }
    ],
    grid: [
      [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 0, 0, 0],
      [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 5, 5, 1, 1, 1, 1, 5, 5, 1, 1, 1, 5, 5, 1, 1],
      [5, 2, 2, 5, 0, 0, 5, 2, 2, 5, 0, 5, 2, 2, 5, 0],
      [5, 2, 2, 5, 0, 0, 5, 2, 2, 5, 0, 5, 2, 2, 5, 0],
      [0, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0]
    ]
  },

  // ==========================================
  // 🦖 DINOSAURS (4 Artworks)
  // ==========================================
  {
    id: "friendly-t-rex",
    title: "Mighty T-Rex",
    category: "dinosaurs",
    categories: ["dinosaurs"],
    categoryLabel: "Dinosaurs",
    type: "pixel",
    icon: "🦖",
    difficulty: "Medium (5 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Dino Green", hex: "#43a047" },
      { num: 2, name: "Forest Green", hex: "#2e7d32" },
      { num: 3, name: "Sunny Belly", hex: "#fff59d" },
      { num: 4, name: "White Teeth", hex: "#ffffff" },
      { num: 5, name: "Eye Black", hex: "#212121" }
    ],
    grid: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 5, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 3, 3, 3, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 3, 3, 3, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0],
      [1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "baby-triceratops",
    title: "Baby Triceratops",
    category: "dinosaurs",
    categories: ["dinosaurs"],
    categoryLabel: "Dinosaurs",
    type: "pixel",
    icon: "🦕",
    difficulty: "Easy (5 Colors)",
    width: 13,
    height: 12,
    palette: [
      { num: 1, name: "Aqua Teal", hex: "#00acc1" },
      { num: 2, name: "Deep Teal", hex: "#00838f" },
      { num: 3, name: "Ivory Horns", hex: "#fff9c4" },
      { num: 4, name: "Cheek Blush", hex: "#ff8a80" },
      { num: 5, name: "Eye Dot", hex: "#212121" }
    ],
    grid: [
      [0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
      [2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
      [2, 1, 5, 1, 1, 1, 5, 1, 2, 0, 0, 0, 0],
      [2, 1, 4, 1, 3, 1, 4, 1, 2, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0],
      [0, 3, 3, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "brachiosaurus",
    title: "Brachiosaurus Long-Neck",
    category: "dinosaurs",
    categories: ["dinosaurs"],
    categoryLabel: "Dinosaurs",
    type: "pixel",
    icon: "🦕",
    difficulty: "Medium (5 Colors)",
    width: 14,
    height: 15,
    palette: [
      { num: 1, name: "Leaf Green", hex: "#66bb6a" },
      { num: 2, name: "Dino Emerald", hex: "#2e7d32" },
      { num: 3, name: "Cream Belly", hex: "#fff59d" },
      { num: 4, name: "Eye Dot", hex: "#212121" },
      { num: 5, name: "Tree Fruit", hex: "#e53935" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 5],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 3, 3, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 3, 3, 3, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0]
    ]
  },
  {
    id: "pterodactyl",
    title: "Pterodactyl Soarer",
    category: "dinosaurs",
    categories: ["dinosaurs"],
    categoryLabel: "Dinosaurs",
    type: "pixel",
    icon: "🦅",
    difficulty: "Medium (5 Colors)",
    width: 16,
    height: 11,
    palette: [
      { num: 1, name: "Wing Teal", hex: "#26a69a" },
      { num: 2, name: "Deep Teal", hex: "#00695c" },
      { num: 3, name: "Crest Orange", hex: "#ff9800" },
      { num: 4, name: "Beak Yellow", hex: "#ffee58" },
      { num: 5, name: "Eye Dot", hex: "#212121" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 5, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0],
      [0, 0, 0, 1, 2, 2, 0, 1, 1, 0, 2, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },

  // ==========================================
  // 🚀 SPACE (3 Artworks)
  // ==========================================
  {
    id: "cosmic-rocket",
    title: "Cosmic Blast-Off",
    category: "space",
    categories: ["space"],
    categoryLabel: "Space Universe",
    type: "pixel",
    icon: "🚀",
    difficulty: "Medium (6 Colors)",
    width: 14,
    height: 16,
    palette: [
      { num: 1, name: "Rocket Red", hex: "#e53935" },
      { num: 2, name: "Spaceship White", hex: "#f5f5f5" },
      { num: 3, name: "Window Cyan", hex: "#00e5ff" },
      { num: 4, name: "Navy Trim", hex: "#1e88e5" },
      { num: 5, name: "Blaze Orange", hex: "#ff9800" },
      { num: 6, name: "Sun Flame", hex: "#ffeb3b" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 4, 4, 4, 4, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 4, 3, 3, 4, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 4, 3, 3, 4, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 4, 4, 4, 4, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
      [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
      [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
      [1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 5, 6, 6, 6, 6, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 5, 6, 6, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "saturn-planet",
    title: "Ringed Saturn Planet",
    category: "space",
    categories: ["space"],
    categoryLabel: "Space Universe",
    type: "pixel",
    icon: "🪐",
    difficulty: "Easy (5 Colors)",
    width: 15,
    height: 11,
    palette: [
      { num: 1, name: "Planet Golden", hex: "#fbc02d" },
      { num: 2, name: "Planet Ochre", hex: "#f57f17" },
      { num: 3, name: "Ring Purple", hex: "#ab47bc" },
      { num: 4, name: "Ring Lavender", hex: "#ce93d8" },
      { num: 5, name: "Cosmic Star", hex: "#ffffff" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 5, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 4, 4, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0],
      [3, 3, 4, 4, 1, 2, 2, 2, 2, 2, 1, 4, 4, 3, 3],
      [0, 3, 3, 4, 4, 2, 2, 2, 2, 2, 4, 4, 3, 3, 0],
      [0, 0, 0, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 5, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "astronaut-hero",
    title: "Spacewalk Astronaut",
    category: "space",
    categories: ["space"],
    categoryLabel: "Space Universe",
    type: "pixel",
    icon: "👨‍🚀",
    difficulty: "Medium (6 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Suit White", hex: "#ffffff" },
      { num: 2, name: "Suit Shadow", hex: "#b0bec5" },
      { num: 3, name: "Gold Visor", hex: "#ffd54f" },
      { num: 4, name: "Visor Glare", hex: "#fff9c4" },
      { num: 5, name: "Chest Badge", hex: "#e53935" },
      { num: 6, name: "Cosmic Star", hex: "#00e5ff" }
    ],
    grid: [
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 6, 0],
      [0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 0, 0],
      [0, 0, 1, 3, 4, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 3, 4, 3, 3, 3, 3, 3, 3, 1, 0, 0],
      [0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 5, 2, 2, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 2, 0, 1, 1, 2, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 2, 0, 1, 1, 2, 0, 0, 6, 0],
      [0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0]
    ]
  },

  // ==========================================
  // 🦁 ANIMALS (3 Artworks)
  // ==========================================
  {
    id: "cute-panda",
    title: "Bamboo Panda",
    category: "animals",
    categories: ["animals"],
    categoryLabel: "Animals",
    type: "pixel",
    icon: "🐼",
    difficulty: "Easy (5 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Panda White", hex: "#ffffff" },
      { num: 2, name: "Panda Black", hex: "#212121" },
      { num: 3, name: "Cheek Pink", hex: "#f48fb1" },
      { num: 4, name: "Bamboo Green", hex: "#43a047" },
      { num: 5, name: "Bamboo Dark", hex: "#2e7d32" }
    ],
    grid: [
      [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
      [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
      [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0],
      [1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0],
      [1, 3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 0],
      [2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 4, 0],
      [0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0, 5, 0],
      [0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 4, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0]
    ]
  },
  {
    id: "brave-lion",
    title: "Brave King Lion",
    category: "animals",
    categories: ["animals"],
    categoryLabel: "Animals",
    type: "pixel",
    icon: "🦁",
    difficulty: "Medium (5 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Golden Fur", hex: "#fdd835" },
      { num: 2, name: "Orange Mane", hex: "#e65100" },
      { num: 3, name: "Snout Cream", hex: "#fff9c4" },
      { num: 4, name: "Nose Brown", hex: "#5d4037" },
      { num: 5, name: "Eye Black", hex: "#212121" }
    ],
    grid: [
      [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
      [0, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 0, 0, 0],
      [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0],
      [2, 2, 1, 5, 1, 1, 1, 1, 5, 1, 2, 2, 0, 0],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
      [2, 2, 1, 1, 3, 4, 4, 3, 1, 1, 2, 2, 0, 0],
      [0, 2, 2, 1, 3, 3, 3, 3, 1, 2, 2, 0, 0, 0],
      [0, 0, 2, 2, 2, 1, 1, 2, 2, 2, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
      [0, 4, 4, 0, 4, 4, 4, 4, 0, 4, 4, 0, 0, 0]
    ]
  },
  {
    id: "ocean-dolphin",
    title: "Playful Ocean Dolphin",
    category: "animals",
    categories: ["animals"],
    categoryLabel: "Animals",
    type: "pixel",
    icon: "🐬",
    difficulty: "Easy (5 Colors)",
    width: 15,
    height: 12,
    palette: [
      { num: 1, name: "Dolphin Blue", hex: "#0288d1" },
      { num: 2, name: "Sky Cyan", hex: "#4fc3f7" },
      { num: 3, name: "White Belly", hex: "#ffffff" },
      { num: 4, name: "Ocean Wave", hex: "#01579b" },
      { num: 5, name: "Eye Dot", hex: "#212121" }
    ],
    grid: [
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 5, 2, 2, 1, 1, 1, 1, 0, 1, 0, 0],
      [1, 1, 1, 2, 2, 3, 3, 2, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 3, 3, 3, 0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },

  // ==========================================
  // ⚡ CHARACTERS (3 Artworks)
  // ==========================================
  {
    id: "electric-buddy",
    title: "Electric Spark Buddy",
    category: "characters",
    categories: ["characters"],
    categoryLabel: "Characters",
    type: "pixel",
    icon: "⚡",
    difficulty: "Medium (5 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Spark Yellow", hex: "#ffee58" },
      { num: 2, name: "Cheek Red", hex: "#f44336" },
      { num: 3, name: "Shadow Gold", hex: "#fbc02d" },
      { num: 4, name: "Black Ear Tip", hex: "#212121" },
      { num: 5, name: "Spark White", hex: "#ffffff" }
    ],
    grid: [
      [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0],
      [4, 1, 4, 0, 0, 0, 0, 0, 0, 4, 1, 4, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 4, 5, 1, 1, 4, 5, 1, 1, 0, 0, 0],
      [1, 1, 1, 4, 4, 1, 1, 4, 4, 1, 1, 1, 0, 0],
      [1, 2, 2, 1, 1, 4, 4, 1, 1, 2, 2, 1, 0, 0],
      [1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 1, 3, 0, 1, 1, 1, 1, 0, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: "spider-hero",
    title: "Spider Web Hero Mask",
    category: "characters",
    categories: ["characters"],
    categoryLabel: "Characters",
    type: "pixel",
    icon: "🕷️",
    difficulty: "Medium (4 Colors)",
    width: 14,
    height: 14,
    palette: [
      { num: 1, name: "Hero Red", hex: "#d32f2f" },
      { num: 2, name: "Web Black", hex: "#212121" },
      { num: 3, name: "Eye White", hex: "#ffffff" },
      { num: 4, name: "Eye Rim", hex: "#37474f" }
    ],
    grid: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 0, 0],
      [0, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 0],
      [1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1],
      [1, 2, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 2, 1],
      [1, 1, 4, 3, 3, 4, 1, 1, 4, 3, 3, 4, 1, 1],
      [1, 2, 4, 3, 3, 3, 4, 4, 3, 3, 3, 4, 2, 1],
      [1, 1, 1, 4, 3, 3, 3, 3, 3, 3, 4, 1, 1, 1],
      [1, 2, 1, 1, 4, 3, 3, 3, 3, 4, 1, 1, 2, 1],
      [0, 1, 2, 1, 1, 4, 4, 4, 4, 1, 1, 2, 1, 0],
      [0, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 0],
      [0, 0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
    ]
  },
  {
    id: "hero-shield",
    title: "Captain Star Shield",
    category: "characters",
    categories: ["characters"],
    categoryLabel: "Characters",
    type: "pixel",
    icon: "🛡️",
    difficulty: "Easy (4 Colors)",
    width: 13,
    height: 13,
    palette: [
      { num: 1, name: "Hero Red", hex: "#d32f2f" },
      { num: 2, name: "Pure White", hex: "#ffffff" },
      { num: 3, name: "Valor Blue", hex: "#1976d2" },
      { num: 4, name: "Silver Star", hex: "#eceff1" }
    ],
    grid: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0],
      [0, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 0],
      [0, 1, 2, 1, 3, 3, 3, 3, 3, 1, 2, 1, 0],
      [1, 2, 1, 3, 3, 3, 4, 3, 3, 3, 1, 2, 1],
      [1, 2, 1, 3, 4, 4, 4, 4, 4, 3, 1, 2, 1],
      [1, 2, 1, 3, 3, 4, 4, 4, 3, 3, 1, 2, 1],
      [1, 2, 1, 3, 4, 4, 3, 4, 4, 3, 1, 2, 1],
      [1, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1],
      [0, 1, 2, 1, 3, 3, 3, 3, 3, 1, 2, 1, 0],
      [0, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 0],
      [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
    ]
  }
];

if (typeof window !== 'undefined') {
  window.COLOR_BY_NUMBER_ARTWORKS = ARTWORKS;
  window.ARTWORKS = ARTWORKS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ARTWORKS };
}
