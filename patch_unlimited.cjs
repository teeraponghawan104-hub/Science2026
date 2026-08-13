const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Add unlimited:true to quiz
const quizTarget = `id:'quiz', name:'ตอบปัญหาทางวิทยาศาสตร์', mode:'team', unit:'ทีม', maxSeats:12,`;
const quizReplace = `id:'quiz', name:'ตอบปัญหาทางวิทยาศาสตร์', mode:'team', unit:'ทีม', maxSeats:9999, unlimited: true,`;
html = html.replace(quizTarget, quizReplace);

// 2. update statusFor
const statusForTarget = `function statusFor(count, max){
  const pct = Math.min(100, Math.round((count/max)*100));
  let cls='status-open', label='เปิดรับสมัคร';
  if(count>=max){ cls='status-full'; label='เต็มแล้ว'; }
  else if(pct>=80){ cls='status-low'; label='ใกล้เต็ม'; }
  return {pct, cls, label};
}`;
const statusForReplace = `function statusFor(count, max, unlimited){
  if(unlimited) return {pct: 0, cls: 'status-open', label: 'เปิดรับสมัคร'};
  const pct = Math.min(100, Math.round((count/max)*100));
  let cls='status-open', label='เปิดรับสมัคร';
  if(count>=max){ cls='status-full'; label='เต็มแล้ว'; }
  else if(pct>=80){ cls='status-low'; label='ใกล้เต็ม'; }
  return {pct, cls, label};
}`;
html = html.replace(statusForTarget, statusForReplace);

// 3. update renderActivities
const renderActTarget = `    const {pct, cls, label} = statusFor(count, act.maxSeats);
    const full = count >= act.maxSeats;
    const disabled = full || deadlinePassed;
    const ringColor = cls==='status-full' ? 'var(--danger)' : (cls==='status-low' ? 'var(--gold)' : 'var(--teal)');
    const btnLabel = deadlinePassed ? 'ปิดรับสมัครแล้ว' : (full ? 'ที่นั่งเต็มแล้ว' : 'ลงทะเบียน');`;
const renderActReplace = `    const {pct, cls, label} = statusFor(count, act.maxSeats, act.unlimited);
    const full = !act.unlimited && count >= act.maxSeats;
    const disabled = full || deadlinePassed;
    const ringColor = cls==='status-full' ? 'var(--danger)' : (cls==='status-low' ? 'var(--gold)' : 'var(--teal)');
    const btnLabel = deadlinePassed ? 'ปิดรับสมัครแล้ว' : (full ? 'ที่นั่งเต็มแล้ว' : 'ลงทะเบียน');`;
html = html.replace(renderActTarget, renderActReplace);

const gaugeTarget = `          <div class="gauge-hole"><div class="n">\${count}/\${act.maxSeats}</div><div class="d">\${act.unit}</div></div>`;
const gaugeReplace = `          <div class="gauge-hole"><div class="n">\${count}\${act.unlimited ? '' : '/' + act.maxSeats}</div><div class="d">\${act.unit}</div></div>`;
html = html.replace(gaugeTarget, gaugeReplace);

const footerSeatsTarget = `        <span class="seats-left">เหลือ <strong>\${Math.max(0, act.maxSeats-count)}</strong> \${act.unit}</span>`;
const footerSeatsReplace = `        <span class="seats-left">\${act.unlimited ? '<strong>ไม่จำกัด</strong>' : \`เหลือ <strong>\${Math.max(0, act.maxSeats-count)}</strong> \${act.unit}\`}</span>`;
html = html.replace(footerSeatsTarget, footerSeatsReplace);

// 4. Update handleSubmit check
const latestCountTarget = `  const latestCount = activitiesState[act.id] || 0;
  if(latestCount >= act.maxSeats){`;
const latestCountReplace = `  const latestCount = activitiesState[act.id] || 0;
  if(!act.unlimited && latestCount >= act.maxSeats){`;
html = html.replace(latestCountTarget, latestCountReplace);

// 5. Update admin dashboard
const adminDashTarget = `        const pct = Math.min(100, Math.round((count / act.maxSeats) * 100));
        let color = '#10b981'; // Green
        if (pct >= 100) color = '#ef4444'; // Red
        else if (pct >= 80) color = '#f59e0b'; // Orange
        
        return \`
          <div style="background:var(--bg-2); border:1px solid var(--border-strong); border-radius:12px; padding:16px;">
            <h4 style="margin:0 0 10px 0; font-size:15px;">\${act.name}</h4>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:var(--text-mute);">
              <span>รับ \${act.maxSeats} \${act.unit}</span>
              <span style="color:\${color}; font-weight:600;">สมัครแล้ว \${count}</span>
            </div>
            <div style="width:100%; background:var(--bg); border-radius:4px; height:8px; overflow:hidden;">
              <div style="height:100%; width:\${pct}%; background:\${color};"></div>
            </div>`;
const adminDashReplace = `        const pct = act.unlimited ? 0 : Math.min(100, Math.round((count / act.maxSeats) * 100));
        let color = '#10b981'; // Green
        if (!act.unlimited && pct >= 100) color = '#ef4444'; // Red
        else if (!act.unlimited && pct >= 80) color = '#f59e0b'; // Orange
        
        return \`
          <div style="background:var(--bg-2); border:1px solid var(--border-strong); border-radius:12px; padding:16px;">
            <h4 style="margin:0 0 10px 0; font-size:15px;">\${act.name}</h4>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:var(--text-mute);">
              <span>\${act.unlimited ? 'รับไม่จำกัด' : \`รับ \${act.maxSeats} \${act.unit}\`}</span>
              <span style="color:\${color}; font-weight:600;">สมัครแล้ว \${count}</span>
            </div>
            \${act.unlimited ? '' : \`
            <div style="width:100%; background:var(--bg); border-radius:4px; height:8px; overflow:hidden;">
              <div style="height:100%; width:\${pct}%; background:\${color};"></div>
            </div>\`}
`;
html = html.replace(adminDashTarget, adminDashReplace);

const adminDetailTarget = `      <div class="admin-toolbar">
        <span class="count">สมัครแล้ว <strong>\${list.length}</strong> / \${act.maxSeats} \${act.unit}</span>`;
const adminDetailReplace = `      <div class="admin-toolbar">
        <span class="count">สมัครแล้ว <strong>\${list.length}</strong>\${act.unlimited ? '' : \` / \${act.maxSeats}\`} \${act.unit}</span>`;
html = html.replace(adminDetailTarget, adminDetailReplace);

fs.writeFileSync('index.html', html);
console.log('patched unlimited seats logic');
