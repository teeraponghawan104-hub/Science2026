const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetCSS = `th{text-align:left; padding:10px 12px; color:var(--text-mute); font-weight:500; background:var(--surface-2); position:-webkit-sticky; position:sticky; top:0; white-space:nowrap; z-index:1;}`;
const replacementCSS = `th{text-align:left; padding:10px 12px; color:var(--text-mute); font-weight:500; background:var(--surface-2); position:-webkit-sticky; position:sticky; top:0; white-space:nowrap; z-index:1; transform: translateZ(0); -webkit-transform: translateZ(0);}`;

if (html.includes(targetCSS)) {
    html = html.replace(targetCSS, replacementCSS);
    fs.writeFileSync('index.html', html);
    console.log('patched CSS');
} else {
    console.log('not found');
}
