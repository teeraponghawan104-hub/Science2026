const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/\<td\>\<strong\>\$\{isTeam \? r\.teamName : r\.fullName\}\<\/strong\>\<\/td\>/g, "<td><strong>${isTeam ? (r.teamName || r.fullName) : r.fullName}</strong></td>");

fs.writeFileSync('index.html', html);
console.log('patched strong');
