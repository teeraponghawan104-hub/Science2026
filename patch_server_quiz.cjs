const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `const limit = req.body.roomLimit || (isTeam ? 1 : 0);`;
const replacement = `const limit = req.body.roomLimit !== undefined ? req.body.roomLimit : (isTeam ? 1 : 0);`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('updated roomLimit condition');
} else {
    console.log('target not found');
}
