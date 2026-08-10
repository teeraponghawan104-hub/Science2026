const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const targetCSS = `.admin-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }`;
const replacementCSS = `.admin-btns { display: flex; flex-wrap: wrap; gap: 0.5rem; }`;

const targetCSS2 = `.btn-tiny { width: 100%; }`;
const replacementCSS2 = `.btn-tiny { flex: 1 1 calc(50% - 0.5rem); }`;

let modified = false;
if (html.includes(targetCSS)) {
    html = html.replace(targetCSS, replacementCSS);
    modified = true;
}
if (html.includes(targetCSS2)) {
    html = html.replace(targetCSS2, replacementCSS2);
    modified = true;
}

if (modified) {
    fs.writeFileSync('index.html', html);
    console.log('patched admin-btns mobile CSS');
} else {
    console.log('not found');
}
