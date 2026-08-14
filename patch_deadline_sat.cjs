const fs = require('fs');

const dateStr = "2026-08-15T12:00:00+07:00"; // Aug 15 (Sat) at 12:00 Thailand time

// Patch index.html
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/const DEADLINE = new Date\('[^']+'\);/g, "const DEADLINE = new Date('" + dateStr + "');");
fs.writeFileSync('index.html', html);

// Patch server.ts
let server = fs.readFileSync('server.ts', 'utf-8');
server = server.replace(/const DEADLINE = new Date\('[^']+'\);/g, "const DEADLINE = new Date('" + dateStr + "');");
fs.writeFileSync('server.ts', server);

console.log('Deadlines patched successfully to', dateStr);
