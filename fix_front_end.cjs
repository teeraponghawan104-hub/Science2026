const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/function renderRegForm\(\)\{\n  const act = currentActivity;\n  const isTeam = act\.mode==='team' \|\| act\.id==='recycle';/g, "function renderRegForm(){\n  const act = currentActivity;\n  const isTeam = act.mode==='team';");

html = html.replace(/document\.getElementById\('regForm'\)\.addEventListener\('submit', async \(e\)=>\{\n  e\.preventDefault\(\);\n  if\(!currentActivity\) return;\n  const act = currentActivity;\n  const isTeam = act\.mode==='team' \|\| act\.id==='recycle';/g, "document.getElementById('regForm').addEventListener('submit', async (e)=>{\n  e.preventDefault();\n  if(!currentActivity) return;\n  const act = currentActivity;\n  const isTeam = act.mode==='team';");

fs.writeFileSync('index.html', html);
console.log('fixed front end registration for recycle');
