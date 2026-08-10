const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
const target = `         const normalizeRoom = (str) => str.replace(/\\s+/g, '').toLowerCase();`;
const replacement = `         const normalizeRoom = (str) => {
             const m = str.match(/[\\d\\/]+/);
             return m ? m[0] : str.replace(/\\s+/g, '').toLowerCase();
         };`;
if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('patched server 2');
} else {
    console.log('not found 2');
}
