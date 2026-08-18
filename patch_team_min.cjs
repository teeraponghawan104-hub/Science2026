const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/Array\(act\.teamMin \|\| 1\)/g, "Array(act.teamMin || 0)");
html = html.replace(/idx < \(act\.teamMin \|\| 1\)/g, "idx < (act.teamMin || 0)");

fs.writeFileSync('index.html', html);
console.log('patched teamMin');
