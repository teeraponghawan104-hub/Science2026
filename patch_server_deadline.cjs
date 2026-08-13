const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `  // Register
  app.post("/api/register", async (req, res) => {
    const { activityId, data, isTeam } = req.body;`;

const replacement = `  // Register
  app.post("/api/register", async (req, res) => {
    const DEADLINE = new Date('2026-08-13T23:59:59+07:00');
    if (Date.now() > DEADLINE.getTime()) {
        return res.status(400).json({ error: "หมดเวลารับสมัครแล้ว" });
    }
    
    const { activityId, data, isTeam } = req.body;`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('patched deadline in server');
} else {
    console.log('target not found in server');
}
