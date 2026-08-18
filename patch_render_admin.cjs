const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/const isTeam = act\.mode==='team';/g, "const isTeam = act.mode==='team' || act.id==='recycle';");

fs.writeFileSync('index.html', html);
console.log('patched renderAdminPanel isTeam');
