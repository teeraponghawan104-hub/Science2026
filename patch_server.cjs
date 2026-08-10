const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
const target = `         const roomExists = list.some((r: any) => r.room && r.room.toLowerCase() === data.room.toLowerCase());`;
const replacement = `         const normalizeRoom = (str) => str.replace(/\\s+/g, '').toLowerCase();
         const roomExists = list.some((r: any) => r.room && normalizeRoom(r.room) === normalizeRoom(data.room));`;
if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('patched server');
} else {
    console.log('not found');
}
