const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/<label>ชื่อทีม <span class="req">\*<\/span><\/label>/g, `<label>\${act.id==='recycle' ? 'ชื่อผู้ประกวด / ชื่อทีม' : 'ชื่อทีม'} <span class="req">*</span></label>`);
html = html.replace(/<label>รายชื่อสมาชิก<\/label>/g, `<label>\${act.id==='recycle' ? 'รายชื่อผู้ช่วย / สมาชิกเพิ่มเติม' : 'รายชื่อสมาชิก'}</label>`);
html = html.replace(/\(r\.teamName \|\| ''\)/g, "(r.teamName || r.fullName || '')");

fs.writeFileSync('index.html', html);
console.log('patched labels');
