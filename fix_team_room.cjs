const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
const target = `         const normalizeRoom = (str) => {
             const m = str.match(/[\\d\\/]+/);
             return m ? m[0] : str.replace(/\\s+/g, '').toLowerCase();
         };`;

if (code.includes(target)) {
    console.log("Team room fix verified.");
} else {
    console.log("Team room fix not found!");
}
