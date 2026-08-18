const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const announceFuncHtml = `
function printAnnouncement(actId) {
  try {
    const act = ACTIVITIES.find(a => a.id === actId);
    if (!act) return;
    const rawList = adminLists[actId] || [];
    const list = typeof sortRegistrants === 'function' ? sortRegistrants(rawList, adminSortBy) : rawList;
    const isTeam = act.mode === 'team' || act.id === 'recycle';
    
    let html = \`<div style="text-align:center; font-family: 'Sarabun', sans-serif;">
      <h3 style="margin-bottom:8px; font-size:18pt;">ประกาศโรงเรียนวรคุณอุปถัมภ์</h3>
      <p style="margin-top:0; font-size:14pt;">เรื่อง รายชื่อผู้สมัครเข้าร่วมการแข่งขัน \${act.name} เนื่องในสัปดาห์วันวิทยาศาสตร์ โรงเรียนวรคุณอุปถัมภ์ วันที่ 20 สิงหาคม 2569</p>
    </div>
    <hr style="border:0; border-top:1px solid #000; margin: 15px 0;">
    <p style="text-align:justify; margin-bottom:20px; text-indent:40px; font-family:'Sarabun', sans-serif; font-size:14pt; line-height:1.5;">
      ตามที่กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี โรงเรียนวรคุณอุปถัมภ์ ได้เปิดรับสมัครนักเรียนเข้าร่วมการแข่งขัน \${act.name} เนื่องในงานสัปดาห์วันวิทยาศาสตร์ ประจำปีการศึกษา 2569 บัดนี้การรับสมัครเสร็จสิ้นแล้ว จึงขอประกาศรายชื่อผู้สมัครเข้าร่วมการแข่งขันดังกล่าว ดังรายชื่อต่อไปนี้
    </p>
    <table><thead><tr>
      <th class="print-nowrap" style="text-align:center;">ลำดับที่</th>
      <th class="print-nowrap">รหัส</th>
      <th>\${act.mode==='team' ? 'ชื่อทีม' : 'ชื่อ-สกุล'}</th>
      <th class="print-nowrap">ระดับชั้น</th>
      <th class="print-nowrap">ห้อง</th>
      \${isTeam?'<th style="width:25%">สมาชิก</th>':''}
    </tr></thead><tbody>\`;
    
    if (list.length === 0) {
      html += \`<tr><td colspan="\${isTeam ? 6 : 5}" style="text-align:center;">ยังไม่มีผู้สมัครในกิจกรรมนี้</td></tr>\`;
    } else {
      list.forEach((r, idx) => {
        let membersStr = '';
        if (isTeam && Array.isArray(r.members)) membersStr = r.members.join(', ');
        
        html += \`<tr>
          <td style="text-align:center;">\${idx + 1}</td>
          <td class="print-nowrap">\${r.id}</td>
          <td><strong>\${isTeam ? (r.teamName || r.fullName) : r.fullName}</strong></td>
          <td class="print-nowrap">\${r.grade||''}</td>
          <td class="print-nowrap">\${r.room||''}</td>
          \${isTeam ? \`<td>\${membersStr}</td>\` : ''}
        </tr>\`;
      });
    }
    html += \`</tbody></table>\`;
    
    const today = new Date().toLocaleDateString('th-TH', { day:'numeric', month:'long', year:'numeric' });
    html += \`
    <div style="margin-top:40px; text-align:right; font-family:'Sarabun', sans-serif; font-size:14pt; padding-right:50px;">
      <p style="margin-bottom:40px;">ประกาศ ณ วันที่ \${today}</p>
      <p style="margin:5px 0;">ลงชื่อ ...........................................</p>
      <p style="margin:5px 0;">(...........................................)</p>
      <p style="margin:5px 0;">หัวหน้ากลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี</p>
    </div>\`;
    
    const printSection = document.getElementById('printSection');
    if (printSection) {
      printSection.innerHTML = html;
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.error("Print failed:", e);
        }
      }, 300);
    } else {
      window.print(); // fallback
    }
  } catch (e) {
    console.error("Error generating print announcement view:", e);
    alert("เกิดข้อผิดพลาดในการสร้างหน้าประกาศ");
  }
}
`;

html = html.replace('function exportCSV(actId){', announceFuncHtml + '\nfunction exportCSV(actId){');

fs.writeFileSync('index.html', html);
console.log('patched index.html');
