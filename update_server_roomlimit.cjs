const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `      // If it's a team activity, check if a team from the same room already exists
      if (isTeam && data.room) {
         const normalizeRoom = (str) => {
             const m = str.match(/[\\d\\/]+/);
             return m ? m[0] : str.replace(/\\s+/g, '').toLowerCase();
         };
         const roomExists = list.some((r: any) => r.room && normalizeRoom(r.room) === normalizeRoom(data.room));
         if (roomExists) {
             return res.status(400).json({ error: "Room already registered" });
         }
      }`;

const replacement = `      // Check room limits (for teams typically 1, for individuals it varies)
      if (data.room) {
         const limit = req.body.roomLimit || (isTeam ? 1 : 0);
         if (limit > 0) {
             const normalizeRoom = (str) => {
                 const m = str.match(/[\\d\\/]+/);
                 return m ? m[0] : str.replace(/\\s+/g, '').toLowerCase();
             };
             const roomCount = list.filter((r: any) => r.room && normalizeRoom(r.room) === normalizeRoom(data.room)).length;
             if (roomCount >= limit) {
                 return res.status(400).json({ error: \`โควตาห้องนี้เต็มแล้ว (สูงสุด \${limit} \${isTeam ? 'ทีม' : 'คน'}/ห้อง)\` });
             }
         }
      }`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('updated room limit check in server');
} else {
    console.log('target not found in server.ts');
}
