const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });`;

const replacement = `    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { clientPort: 443, protocol: 'wss' }
      },
      appType: "spa",
    });`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('patched vite config in server.ts');
} else {
    console.log('target not found in server.ts');
}
