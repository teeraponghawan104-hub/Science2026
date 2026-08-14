const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf-8');

const targetRegex = /server:\s*\{[\s\S]*?\},/;
const replacement = `server: {
      hmr: process.env.DISABLE_HMR === 'true' ? false : {
        clientPort: 443,
        protocol: 'wss'
      },
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    },`;

code = code.replace(targetRegex, replacement);
fs.writeFileSync('vite.config.ts', code);
console.log('vite patched');
