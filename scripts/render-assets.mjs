// Renders brand PNGs from SVG: npm run assets
import sharp from "sharp";
import fs from "node:fs";
const MARK = `<rect width="32" height="32" rx="9" fill="#2C2A8F"/><circle cx="9" cy="22.5" r="3.1" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16" cy="16" r="3.1" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="23" cy="9.5" r="3.9" fill="#E9A516"/>`;
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${MARK}</svg>`;
fs.writeFileSync("public/favicon.svg", markSvg);
fs.writeFileSync("public/assets/logo.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 32"><g>${MARK}</g><text x="42" y="23" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="21" fill="#16142E">afograde</text></svg>`);
const F = "Georgia, serif", S = "Helvetica Neue, Arial, sans-serif";
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FBF8F1"/>
<g transform="translate(72 70) scale(1.8)">${MARK}</g><text x="140" y="112" font-family="${F}" font-weight="600" font-size="40" fill="#16142E">afograde</text>
<text x="72" y="260" font-family="${F}" font-weight="600" font-size="62" fill="#16142E">Know which topics stand</text>
<text x="72" y="335" font-family="${F}" font-weight="600" font-size="62" fill="#16142E">between a candidate</text>
<text x="72" y="410" font-family="${F}" font-weight="600" font-size="62" fill="#2C2A8F">and 360+.</text>
<text x="72" y="490" font-family="${S}" font-size="26" fill="#4B4862">UTME preparation and mentorship software · afograde.com</text>
<rect y="610" width="1200" height="20" fill="#2C2A8F"/><rect x="0" y="610" width="360" height="20" fill="#E9A516"/></svg>`;
await sharp(Buffer.from(og)).png().toFile("public/assets/og-image.png");
await sharp(Buffer.from(markSvg)).resize(32, 32).png().toFile("public/favicon-32.png");
await sharp(Buffer.from(markSvg)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(markSvg)).resize(512, 512).png().toFile("public/icon-512.png");
await sharp("scripts/founder-source.webp").resize(400, 400, { fit: "cover", position: "top" }).webp({ quality: 80 }).toFile("public/assets/team/orevaoghene.webp");
console.log("assets done");
