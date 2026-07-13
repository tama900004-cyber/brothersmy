import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'data/automotive-catalog.json'), 'utf8'),
);
const outputDir = path.join(projectRoot, 'docs/product-images/generated');
const stagingPath = path.join(projectRoot, 'docs/product-content-staging.csv');
const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const require = createRequire(import.meta.url);
const sharp = require(path.join(runtimeModules, 'sharp'));

fs.mkdirSync(outputDir, { recursive: true });

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;

function wrapLabel(label, max = 25) {
  const words = label.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

const stroke = '';
const red = '#D71920';
const dark = '#161616';
const gray = '#E9EDF1';

function productIcon(type) {
  const common = `fill="none" ${stroke}`;
  const icons = {
    holder: `<rect x="450" y="310" width="300" height="470" rx="48" ${common}/><path d="M390 450h60M750 450h60M525 830h150" ${common}/><circle cx="600" cy="720" r="16" fill="${red}"/>`,
    charger: `<rect x="445" y="355" width="310" height="390" rx="70" ${common}/><rect x="505" y="425" width="75" height="105" rx="18" ${common}/><rect x="620" y="425" width="75" height="105" rx="18" ${common}/><path d="M520 745v90M680 745v90" ${common}/><path d="M600 575l-45 80h70l-28 80" ${common} stroke="${red}"/>`,
    mat: `<path d="M405 350h390l70 420H335z" ${common}/><path d="M440 430h320M420 520h360M405 610h390M390 700h420" ${common} stroke-width="10"/>`,
    organizer: `<path d="M350 425h500v330H350z" ${common}/><path d="M350 510h500M515 510v245M685 510v245" ${common}/><path d="M470 425v-65h260v65" ${common}/>` ,
    sunshade: `<path d="M330 390q270-120 540 0l-45 360H375z" ${common}/><path d="M600 330v455M400 500h400M440 390l160 360M760 390L600 750" ${common} stroke-width="10"/>`,
    pillow: `<path d="M430 380q170-70 340 0v360q-170 70-340 0z" ${common}/><path d="M430 560q170 70 340 0" ${common}/><path d="M515 380q-55 180 0 360M685 380q55 180 0 360" ${common} stroke-width="10"/>`,
    cover: `<path d="M280 650l70-190q25-80 115-95h270q90 15 115 95l70 190v105H280z" ${common}/><path d="M365 650h470M415 455h370" ${common}/><circle cx="410" cy="755" r="48" fill="white" ${stroke}/><circle cx="790" cy="755" r="48" fill="white" ${stroke}/>`,
    triangle: `<path d="M600 310L875 790H325z" ${common} stroke="${red}"/><path d="M600 465L740 710H460z" ${common}/><path d="M420 830h360" ${common}/>` ,
    strap: `<path d="M430 390c-120 0-120 180 0 180h340c120 0 120 180 0 180H430c-120 0-120-180 0-180h340" ${common}/><circle cx="375" cy="390" r="70" ${common}/><circle cx="825" cy="750" r="70" ${common}/>` ,
    pouch: `<path d="M400 350h400v460H400z" ${common}/><path d="M400 460h400M490 350v-55h220v55" ${common}/><path d="M600 520v190M535 575l65-55 65 55" ${common} stroke="${red}"/>`,
    jumpstarter: `<rect x="380" y="350" width="440" height="430" rx="55" ${common}/><rect x="455" y="430" width="290" height="120" rx="20" ${common}/><path d="M470 780l-90 85M730 780l90 85" ${common}/><path d="M600 585l-48 85h75l-30 85" ${common} stroke="${red}"/>`,
    inflator: `<rect x="380" y="405" width="440" height="330" rx="45" ${common}/><rect x="475" y="475" width="250" height="105" rx="15" ${common}/><path d="M470 405v-75h260v75M820 610q120 40 55 165" ${common}/><circle cx="500" cy="660" r="28" fill="${red}"/><circle cx="700" cy="660" r="28" fill="${red}"/>`,
    camera: `<rect x="350" y="400" width="500" height="360" rx="60" ${common}/><circle cx="600" cy="580" r="115" ${common}/><circle cx="600" cy="580" r="50" fill="${red}"/><path d="M430 400l55-75h230l55 75" ${common}/>` ,
    parking: `<path d="M300 650h600M380 650l55-160h330l55 160M420 650v120M780 650v120" ${common}/><circle cx="475" cy="650" r="45" ${common}/><circle cx="725" cy="650" r="45" ${common}/><path d="M250 450q70-70 140 0M190 390q130-130 260 0M810 450q70-70 140 0M750 390q130-130 260 0" ${common} stroke="${red}"/>`,
    lock: `<rect x="390" y="515" width="420" height="300" rx="35" ${common}/><path d="M485 515V420q0-115 115-115t115 115v95" ${common}/><circle cx="600" cy="650" r="28" fill="${red}"/><path d="M600 678v65" ${common}/>` ,
    extinguisher: `<path d="M470 430h260v390H470z" ${common}/><path d="M520 430v-90h160v90M590 340v-55h150l75 65" ${common}/><path d="M815 350v120" ${common}/><path d="M525 605h150" ${common} stroke="${red}"/>`,
    bottle: `<path d="M485 420h230v400H485z" ${common}/><path d="M530 420v-95h140v95M555 325v-60h90v60" ${common}/><rect x="520" y="535" width="160" height="150" rx="15" fill="${red}" opacity="0.14" stroke="${red}" stroke-width="12"/>`,
    spray: `<path d="M470 470h280v350H470z" ${common}/><path d="M520 470v-90h140v90M570 380v-70h205l80 55h-195" ${common}/><path d="M545 585h130" ${common} stroke="${red}"/>`,
    towel: `<path d="M360 400h420l60 400H420z" ${common}/><path d="M420 510h380M440 610h380M460 710h370" ${common} stroke-width="10"/><path d="M780 400l60 400" ${common}/>` ,
    brush: `<path d="M380 730l410-410" ${common}/><path d="M705 320l120 120-105 105-120-120z" fill="${red}" opacity="0.18" ${stroke}/><path d="M340 770l120-20-100-100z" ${common}/>` ,
    mitt: `<path d="M430 780V490q0-75 60-75 45 0 55 45v-115q0-60 55-60t55 60v95-55q0-55 50-55t50 55v100-30q0-50 45-50t45 50v185q0 145-140 220z" ${common}/>` ,
    vacuum: `<path d="M390 500h420v270H390z" ${common}/><path d="M500 500v-80q0-80 80-80h80q80 0 80 80v80M390 635H270l-90-60M810 620h150" ${common}/><circle cx="500" cy="770" r="45" ${common}/><circle cx="710" cy="770" r="45" ${common}/>` ,
    bulb: `<path d="M470 470q0-135 130-135t130 135q0 80-70 145v105H540V615q-70-65-70-145z" ${common}/><path d="M540 770h120M560 825h80M600 220v-80M410 290l-60-60M790 290l60-60M360 470h-90M840 470h90" ${common} stroke="${red}"/>`,
    horn: `<path d="M350 480h250l250-130v460L600 680H350z" ${common}/><path d="M350 480v200M850 450q120 120 0 240" ${common} stroke="${red}"/>`,
    switch: `<rect x="390" y="390" width="420" height="420" rx="45" ${common}/><rect x="485" y="475" width="230" height="150" rx="25" ${common}/><path d="M530 690h140" ${common}/><path d="M600 500v100M550 550h100" ${common} stroke="${red}"/>`,
    audio: `<rect x="320" y="410" width="560" height="380" rx="35" ${common}/><circle cx="480" cy="600" r="90" ${common}/><circle cx="480" cy="600" r="24" fill="${red}"/><rect x="625" y="500" width="175" height="75" rx="10" ${common}/><path d="M650 645h125M650 700h125" ${common}/>` ,
    speaker: `<rect x="380" y="320" width="440" height="520" rx="40" ${common}/><circle cx="600" cy="590" r="150" ${common}/><circle cx="600" cy="590" r="70" fill="${red}" opacity="0.15" stroke="${red}" stroke-width="16"/><circle cx="600" cy="405" r="34" ${common}/>` ,
    screen: `<rect x="290" y="320" width="620" height="500" rx="40" ${common}/><rect x="350" y="380" width="500" height="340" rx="20" fill="${gray}" stroke="${dark}" stroke-width="14"/><path d="M520 770h160" ${common}/><path d="M510 550l65 65 130-145" ${common} stroke="${red}"/>`,
    oil: `<path d="M410 340h300l90 100v370H410z" ${common}/><path d="M710 340v100h90M500 340v-65h150v65" ${common}/><path d="M510 545h190v150H510z" fill="${red}" opacity="0.15" stroke="${red}" stroke-width="14"/>`,
    filter: `<path d="M350 420h500v360H350z" ${common}/><path d="M410 420v360M470 420v360M530 420v360M590 420v360M650 420v360M710 420v360M770 420v360" ${common} stroke-width="10"/><path d="M350 500h500M350 700h500" ${common}/>` ,
    plug: `<path d="M500 260h200v160H500zM530 420h140v250H530zM485 670h230M520 730h160M560 790h80" ${common}/><path d="M600 260V170" ${common} stroke="${red}"/>`,
    battery: `<rect x="330" y="390" width="540" height="400" rx="30" ${common}/><path d="M400 390v-70h100v70M700 390v-70h100v70" ${common}/><path d="M455 535v130M390 600h130M680 600h130" ${common} stroke="${red}"/>`,
    belt: `<path d="M420 300q-170 300 0 600M780 300q170 300 0 600" ${common}/><path d="M420 300q180-120 360 0M420 900q180 120 360 0" ${common}/><path d="M470 360q130-80 260 0M470 840q130 80 260 0" ${common} stroke-width="10"/>`,
    brake: `<path d="M380 390h440v420H380z" ${common}/><path d="M440 450h320v300H440z" fill="${red}" opacity="0.14" stroke="${red}" stroke-width="14"/><path d="M520 390v-80h160v80" ${common}/>` ,
    rotor: `<circle cx="600" cy="590" r="250" ${common}/><circle cx="600" cy="590" r="105" ${common}/><circle cx="600" cy="590" r="28" fill="${red}"/><circle cx="600" cy="415" r="22" fill="${dark}"/><circle cx="600" cy="765" r="22" fill="${dark}"/><circle cx="425" cy="590" r="22" fill="${dark}"/><circle cx="775" cy="590" r="22" fill="${dark}"/>`,
    shock: `<path d="M600 220v130M520 350h160v90H520zM560 440h80v320h-80zM500 760h200v100H500z" ${common}/><path d="M500 500h200M500 570h200M500 640h200M500 710h200" ${common} stroke="${red}"/>`,
    arm: `<path d="M340 720l260-360 260 360" ${common}/><circle cx="340" cy="720" r="75" ${common}/><circle cx="860" cy="720" r="75" ${common}/><circle cx="600" cy="360" r="75" ${common}/><path d="M420 700h360" ${common} stroke="${red}"/>`,
    link: `<path d="M440 760l320-420" ${common}/><circle cx="420" cy="785" r="85" ${common}/><circle cx="780" cy="315" r="85" ${common}/><circle cx="420" cy="785" r="24" fill="${red}"/><circle cx="780" cy="315" r="24" fill="${red}"/>`,
    tyre: `<circle cx="600" cy="580" r="280" fill="${dark}"/><circle cx="600" cy="580" r="155" fill="white"/><circle cx="600" cy="580" r="95" fill="${gray}" stroke="${dark}" stroke-width="16"/><path d="M430 365l65 95M770 365l-65 95M380 520l115 35M820 520l-115 35M390 700l110-45M810 700l-110-45" stroke="white" stroke-width="20" stroke-linecap="round"/>`,
    wheel: `<circle cx="600" cy="580" r="285" fill="${dark}"/><circle cx="600" cy="580" r="195" fill="${gray}" stroke="white" stroke-width="16"/><circle cx="600" cy="580" r="60" fill="${red}"/><path d="M600 385v135M600 640v135M405 580h135M660 580h135M465 445l95 95M640 620l95 95M735 445l-95 95M560 620l-95 95" stroke="${dark}" stroke-width="28" stroke-linecap="round"/>`,
    gauge: `<circle cx="600" cy="570" r="255" ${common}/><path d="M440 650a180 180 0 01320 0" ${common}/><path d="M600 570l120-100" ${common} stroke="${red}"/><circle cx="600" cy="570" r="30" fill="${red}"/><rect x="485" y="690" width="230" height="75" rx="15" ${common}/>`
  };
  return icons[type] ?? icons.organizer;
}

function renderSvg(item) {
  const lines = wrapLabel(item.name).map((line, index, all) => {
    const startY = 985 - ((all.length - 1) * 34);
    return `<text x="600" y="${startY + index * 68}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="700" fill="${dark}">${escapeXml(line)}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <rect width="1200" height="1200" fill="#FFFFFF"/>
  <rect x="24" y="24" width="1152" height="1152" rx="48" fill="none" stroke="#E6E9ED" stroke-width="8"/>
  <text x="72" y="94" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="${red}">BROTHER'S AUTO</text>
  <text x="1128" y="94" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600" fill="#636A73">${escapeXml(item.category.toUpperCase())}</text>
  <circle cx="600" cy="560" r="365" fill="#F7F8FA"/>
  <g stroke="${dark}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">${productIcon(item.icon)}</g>
  ${lines}
  <text x="600" y="1125" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#7B8188">Clean catalog illustration · ${escapeXml(item.sku)}</text>
</svg>`;
}

for (const item of catalog) {
  const svg = renderSvg(item);
  fs.writeFileSync(path.join(outputDir, `${item.sku}.svg`), svg);
  await sharp(Buffer.from(svg))
    .flatten({ background: '#FFFFFF' })
    .resize(1200, 1200)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, `${item.sku}.png`));
}

const headers = [
  'approval_status', 'product_name', 'category', 'brand', 'short_description',
  'price_myr', 'sku', 'stock_status', 'vehicle_compatibility', 'image_source_url',
  'image_permission_confirmed', 'image_alt_text', 'owner_approved', 'notes',
];
const rows = catalog.map((item) => [
  'scope-approved-2026-07-13', item.name, item.category, "BROTHER'S Auto Catalog",
  item.summary, item.price, item.sku, 'Confirm before order',
  'Universal or model-specific — confirm before order',
  `docs/product-images/generated/${item.sku}.png`, 'yes — project-generated illustration',
  `${item.name} clean product illustration on a white background`,
  'yes — automotive catalog scope',
  'Display price for the assignment catalog. Confirm final price, fitment, stock and installation before sale.',
]);
fs.writeFileSync(
  stagingPath,
  `${headers.map(csv).join(',')}\n${rows.map((row) => row.map(csv).join(',')).join('\n')}\n`,
);

console.log(`Generated ${catalog.length} SVG/PNG product illustrations and ${path.relative(projectRoot, stagingPath)}.`);
