const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const target = `      body: JSON.stringify({ activityId: act.id, data, isTeam })`;
const replacement = `      body: JSON.stringify({ activityId: act.id, data, isTeam, roomLimit: act.roomLimit })`;

const errorHandlingTarget = `    } else if (regRes.status === 400) {
      const errResult = await regRes.json();
      if (errResult.error === "Room already registered") {
        msgEl.textContent = 'ขออภัย โควตาห้องนี้มีทีมที่สมัครไปแล้ว (จำกัด 1 ทีม/ห้อง)';
        msgEl.className = 'form-msg error';
      } else {
        msgEl.textContent = errResult.error || 'เกิดข้อผิดพลาดในการลงทะเบียน';
        msgEl.className = 'form-msg error';
      }`;

const errorHandlingReplacement = `    } else if (regRes.status === 400) {
      const errResult = await regRes.json();
      if (errResult.error === "Room already registered") {
        msgEl.textContent = 'ขออภัย โควตาห้องนี้มีทีมที่สมัครไปแล้ว (จำกัด 1 ทีม/ห้อง)';
        msgEl.className = 'form-msg error';
      } else {
        msgEl.textContent = errResult.error || 'เกิดข้อผิดพลาดในการลงทะเบียน';
        msgEl.className = 'form-msg error';
      }`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html);
    console.log('patched fetch payload');
} else {
    console.log('target fetch payload not found');
}
