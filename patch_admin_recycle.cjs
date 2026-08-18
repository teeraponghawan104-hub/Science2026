const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Replace isTeam definition in admin functions
html = html.replace(/const isTeam = act\.mode === 'team';/g, "const isTeam = act.mode === 'team' || act.id === 'recycle';");
html = html.replace(/const isTeamAct = ACTIVITIES\.find\(a => a\.id === actId\)\?\.mode === 'team';/g, "const isTeamAct = ['team'].includes(ACTIVITIES.find(a => a.id === actId)?.mode) || actId === 'recycle';");

// Fix openAdminEditModal team limits
html = html.replace(/const memList = r && Array\.isArray\(r\.members\) \? r\.members : Array\(act\.teamMin\)\.fill\(''\);/g, "const memList = r && Array.isArray(r.members) ? r.members : Array(act.teamMin || 1).fill('');");
html = html.replace(/const isReq = idx < act\.teamMin;/g, "const isReq = idx < (act.teamMin || 1);");
html = html.replace(/memList\.length < act\.teamMax/g, "memList.length < (act.teamMax || 5)");
html = html.replace(/count >= act\.teamMax/g, "count >= (act.teamMax || 5)");
html = html.replace(/count\+1 >= act\.teamMax/g, "count+1 >= (act.teamMax || 5)");

// Fix table rendering (r.teamName vs r.fullName)
html = html.replace(/\$\{isTeam\? r\.teamName : r\.fullName\}/g, "${isTeam? (r.teamName || r.fullName) : r.fullName}");
html = html.replace(/\$\{isTeam\?'ชื่อทีม':'ชื่อ-นามสกุล'\}/g, "${isTeam? (act.id==='recycle'?'ชื่อ-นามสกุล / ชื่อทีม':'ชื่อทีม') : 'ชื่อ-นามสกุล'}");

fs.writeFileSync('index.html', html);
console.log('patched index.html for recycle team mode');
