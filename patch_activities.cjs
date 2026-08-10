const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetPainting = `    id:'painting', name:'วาดภาพระบายสี', mode:'individual', unit:'คน', maxSeats:36,
    period:'ช่วงเช้า (ใช้เวลา 3 ชั่วโมง)',`;
const replacePainting = `    id:'painting', name:'วาดภาพระบายสี', mode:'individual', unit:'คน', maxSeats:36, roomLimit:3,
    period:'ช่วงเช้า (ใช้เวลา 3 ชั่วโมง)',`;

const targetEssay = `    id:'essay', name:'เขียนเรียงความ', mode:'individual', unit:'คน', maxSeats:24,
    period:'ช่วงเช้า (ใช้เวลา 1 ชั่วโมง)',`;
const replaceEssay = `    id:'essay', name:'เขียนเรียงความ', mode:'individual', unit:'คน', maxSeats:24, roomLimit:2,
    period:'ช่วงเช้า (ใช้เวลา 1 ชั่วโมง)',`;

html = html.replace(targetPainting, replacePainting);
html = html.replace(targetEssay, replaceEssay);

fs.writeFileSync('index.html', html);
console.log('patched activities');
