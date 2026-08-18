const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// For exportCSV
html = html.replace(/let v = r\[c\];/g, "let v = c === 'teamName' ? (r.teamName || r.fullName) : r[c];");

// For printRegistrants
html = html.replace(/\<td\>\$\{isTeam \? r\.teamName : r\.fullName\}\<\/td\>/g, "<td>${isTeam ? (r.teamName || r.fullName) : r.fullName}</td>");
html = html.replace(/\<th\>\$\{isTeam \? 'ชื่อทีม' : 'ชื่อ-นามสกุล'\}\<\/th\>/g, "<th>${isTeam ? (act.id==='recycle'?'ชื่อ-นามสกุล / ชื่อทีม':'ชื่อทีม') : 'ชื่อ-นามสกุล'}</th>");

fs.writeFileSync('index.html', html);
console.log('patched export and print logic');
