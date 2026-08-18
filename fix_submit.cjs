const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/async function handleSubmit\(e\)\{\n  e\.preventDefault\(\);\n  const act = currentActivity;\n  const isTeam = act\.mode==='team' \|\| act\.id==='recycle';/g, "async function handleSubmit(e){\n  e.preventDefault();\n  const act = currentActivity;\n  const isTeam = act.mode==='team';");

fs.writeFileSync('index.html', html);
console.log('fixed handleSubmit');
