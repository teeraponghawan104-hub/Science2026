import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf-8');
const lines = html.split('\n');
const startIdx = lines.findIndex(l => l.includes("const regRes = await fetch('/api/register'"));
const endIdx = lines.findIndex((l, idx) => idx > startIdx && l.includes("submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';"));

const replacement = `    const regRes = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activityId: act.id, data, isTeam })
    });
      
    if (regRes.ok) {
      const result = await regRes.json();
      activitiesState[act.id] = (activitiesState[act.id] || 0) + 1;
      renderActivities();
      showSuccess(result.entry, act);
    } else if (regRes.status === 400) {
      const errResult = await regRes.json();
      if (errResult.error === "Room already registered") {
         msgEl.className='form-msg error show';
         msgEl.textContent='ขออภัย ห้องนี้มีทีมลงทะเบียนในกิจกรรมนี้ไปแล้ว (จำกัด 1 ทีม/ห้อง/กิจกรรม)';
         submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
         return;
      } else {
         throw new Error(errResult.error || "Failed to register");
      }
    } else {
      throw new Error("Failed to register");
    }
  } catch(e) {
    msgEl.className='form-msg error show';
    msgEl.textContent='บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';`;

if (startIdx !== -1 && endIdx !== -1) {
   lines.splice(startIdx, endIdx - startIdx + 1, replacement);
   fs.writeFileSync('index.html', lines.join('\n'));
   console.log('patched');
} else {
   console.log('not found', startIdx, endIdx);
}
