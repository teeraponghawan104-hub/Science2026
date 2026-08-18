const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const jsCode = `
window.openAdminEditModal = function(activityId, regId) {
  const act = ACTIVITIES.find(a => a.id === activityId);
  if(!act) return;
  const isTeam = act.mode === 'team';
  const list = adminLists[activityId] || [];
  let r = regId ? list.find(x => x.id === regId) : null;
  const isEdit = !!r;

  const overlay = document.getElementById('adminEditOverlay');
  const body = document.getElementById('adminEditBody');

  let htmlStr = \`
    <div style="padding: 20px; border-bottom: 1px solid var(--border);">
      <h3 style="margin-bottom:8px;">\${isEdit ? 'แก้ไขผู้สมัคร' : 'เพิ่มผู้สมัคร'}</h3>
      <p style="color:var(--text-dim); font-size:14px; margin:0;">\${act.name}</p>
    </div>
    <div style="padding:20px; overflow-y:auto; max-height:60vh;">
      <div id="adminEditMsg" style="display:none; padding:10px; margin-bottom:15px; border-radius:8px; font-size:14px;"></div>
  \`;

  if(isTeam) {
    htmlStr += \`
      <div class="field" data-field="teamName">
        <label>ชื่อทีม <span class="req">*</span></label>
        <input type="text" id="f_admin_teamName" value="\${r ? (r.teamName || '') : ''}">
      </div>
    \`;
  } else {
    let title='', fname='', lname='';
    if(r && r.fullName) {
      const tm = r.fullName.match(/^(เด็กชาย|เด็กหญิง|นาย|นางสาว)/);
      if(tm) title = tm[0];
      const rest = r.fullName.replace(/^(เด็กชาย|เด็กหญิง|นาย|นางสาว)\\s*/, '');
      const parts = rest.split(' ');
      fname = parts[0] || '';
      lname = parts.slice(1).join(' ');
    }
    htmlStr += \`
      <div class="field" data-field="name">
        <label>ชื่อ-นามสกุล <span class="req">*</span></label>
        <div style="display:flex; gap:10px;">
          <select id="f_admin_title" style="flex:0 0 100px;">
            <option value="">คำนำหน้า</option>
            <option value="เด็กชาย" \${title==='เด็กชาย'?'selected':''}>เด็กชาย</option>
            <option value="เด็กหญิง" \${title==='เด็กหญิง'?'selected':''}>เด็กหญิง</option>
            <option value="นาย" \${title==='นาย'?'selected':''}>นาย</option>
            <option value="นางสาว" \${title==='นางสาว'?'selected':''}>นางสาว</option>
          </select>
          <input type="text" id="f_admin_fname" placeholder="ชื่อ" style="flex:1;" value="\${fname}">
          <input type="text" id="f_admin_lname" placeholder="นามสกุล" style="flex:1;" value="\${lname}">
        </div>
      </div>
    \`;
  }

  htmlStr += \`
    <div style="display:flex; gap:12px; margin-bottom:16px;">
      <div class="field" style="flex:1; margin-bottom:0;">
        <label>ระดับชั้น <span class="req">*</span></label>
        <select id="f_admin_grade">
          <option value="">เลือกระดับชั้น</option>
          \${['ม.1','ม.2','ม.3','ม.4','ม.5','ม.6'].map(g => \`<option value="\${g}" \${r && r.grade === g ? 'selected' : ''}>\${g}</option>\`).join('')}
        </select>
      </div>
      <div class="field" style="flex:1; margin-bottom:0;">
        <label>ห้อง <span class="req">*</span></label>
        <select id="f_admin_room">
          <option value="">เลือกห้อง</option>
          \${['1/1','1/2','2/1','2/2','3/1','3/2','4/1','4/2','5/1','5/2','6/1','6/2'].map(g => \`<option value="\${g}" \${r && r.room === g ? 'selected' : ''}>\${g}</option>\`).join('')}
        </select>
      </div>
    </div>
  \`;

  if(isTeam) {
    let membersHtml = '';
    const memList = r && Array.isArray(r.members) ? r.members : Array(act.teamMin).fill('');
    memList.forEach((m, idx) => {
      const isReq = idx < act.teamMin;
      let title = '', fname = '', lname = '';
      if(m) {
        const tm = m.match(/^(เด็กชาย|เด็กหญิง|นาย|นางสาว)/);
        title = tm ? tm[0] : '';
        const namePart = m.replace(/^(เด็กชาย|เด็กหญิง|นาย|นางสาว)\\s*/, '');
        const parts = namePart.split(' ');
        fname = parts[0] || '';
        lname = parts.slice(1).join(' ');
      }
      membersHtml += \`
        <div class="admin-member-row" style="display:flex; gap:10px; margin-bottom:8px;">
          <select class="m-title" style="flex:0 0 90px;">
            <option value="">คำนำหน้า</option>
            <option value="เด็กชาย" \${title==='เด็กชาย'?'selected':''}>เด็กชาย</option>
            <option value="เด็กหญิง" \${title==='เด็กหญิง'?'selected':''}>เด็กหญิง</option>
            <option value="นาย" \${title==='นาย'?'selected':''}>นาย</option>
            <option value="นางสาว" \${title==='นางสาว'?'selected':''}>นางสาว</option>
          </select>
          <input type="text" class="m-fname" placeholder="ชื่อ" style="flex:1;" value="\${fname}">
          <input type="text" class="m-lname" placeholder="นามสกุล" style="flex:1;" value="\${lname}">
          \${!isReq ? \`<button type="button" class="btn-tiny danger remove-admin-member">ลบ</button>\` : ''}
        </div>
      \`;
    });
    htmlStr += \`
      <div class="field">
        <label>รายชื่อสมาชิก</label>
        <div id="adminMemberList">\${membersHtml}</div>
        \${memList.length < act.teamMax ? \`<button type="button" class="btn-tiny" id="adminAddMemberBtn" style="margin-top:8px;">+ เพิ่มสมาชิก</button>\` : ''}
      </div>
    \`;
  }

  htmlStr += \`
    <div class="field">
      <label>เบอร์โทรศัพท์ <span class="req">*</span></label>
      <input type="text" id="f_admin_phone" value="\${r ? (r.phone || '') : ''}">
    </div>
  \`;

  act.extraFields.forEach(f => {
    htmlStr += \`
    <div class="field">
      <label>\${f.label} \${f.required?'<span class="req">*</span>':''}</label>
      <input type="text" id="f_admin_extra_\${f.id}" value="\${r && r[f.id] ? r[f.id] : ''}">
    </div>\`;
  });

  htmlStr += \`
    </div>
    <div style="padding:20px; border-top:1px solid var(--border); display:flex; justify-content:flex-end; gap:10px;">
      <button class="btn-tiny" id="adminEditCancel">ยกเลิก</button>
      <button class="btn-submit" id="adminEditSubmit" style="margin:0; width:auto; padding:0 24px; min-height:44px;">\${isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มผู้สมัคร'}</button>
    </div>
  \`;

  body.innerHTML = htmlStr;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const closeFn = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('adminEditCloseBtn').onclick = closeFn;
  document.getElementById('adminEditCancel').onclick = closeFn;
  overlay.onclick = (e) => { if(e.target===overlay) closeFn(); };

  if(isTeam) {
    const addMemBtn = document.getElementById('adminAddMemberBtn');
    if(addMemBtn) {
      addMemBtn.onclick = () => {
        const memListDiv = document.getElementById('adminMemberList');
        const count = memListDiv.querySelectorAll('.admin-member-row').length;
        if(count >= act.teamMax) return;
        const row = document.createElement('div');
        row.className = 'admin-member-row';
        row.style.cssText = 'display:flex; gap:10px; margin-bottom:8px;';
        row.innerHTML = \`
          <select class="m-title" style="flex:0 0 90px;">
            <option value="">คำนำหน้า</option><option value="เด็กชาย">เด็กชาย</option><option value="เด็กหญิง">เด็กหญิง</option><option value="นาย">นาย</option><option value="นางสาว">นางสาว</option>
          </select>
          <input type="text" class="m-fname" placeholder="ชื่อ" style="flex:1;">
          <input type="text" class="m-lname" placeholder="นามสกุล" style="flex:1;">
          <button type="button" class="btn-tiny danger remove-admin-member">ลบ</button>
        \`;
        memListDiv.appendChild(row);
        if(count+1 >= act.teamMax) addMemBtn.style.display = 'none';
        row.querySelector('.remove-admin-member').onclick = () => {
          row.remove();
          addMemBtn.style.display = 'inline-flex';
        };
      };
    }
    body.querySelectorAll('.remove-admin-member').forEach(btn => {
      btn.onclick = (e) => {
        e.target.closest('.admin-member-row').remove();
        if(addMemBtn) addMemBtn.style.display = 'inline-flex';
      };
    });
  }

  document.getElementById('adminEditSubmit').onclick = async () => {
    const submitBtn = document.getElementById('adminEditSubmit');
    const msgEl = document.getElementById('adminEditMsg');
    
    let data = {};
    if(isTeam) {
      data.teamName = document.getElementById('f_admin_teamName').value.trim();
      data.members = [];
      const rows = document.querySelectorAll('.admin-member-row');
      for(let row of rows) {
        const t = row.querySelector('.m-title').value;
        const f = row.querySelector('.m-fname').value.trim();
        const l = row.querySelector('.m-lname').value.trim();
        if(t && f && l) data.members.push(\`\${t}\${f} \${l}\`);
      }
    } else {
      const t = document.getElementById('f_admin_title').value;
      const f = document.getElementById('f_admin_fname').value.trim();
      const l = document.getElementById('f_admin_lname').value.trim();
      data.fullName = \`\${t}\${f} \${l}\`;
    }
    data.grade = document.getElementById('f_admin_grade').value;
    data.room = document.getElementById('f_admin_room').value;
    data.phone = document.getElementById('f_admin_phone').value.trim();
    
    act.extraFields.forEach(f => {
      data[f.id] = document.getElementById(\`f_admin_extra_\${f.id}\`).value.trim();
    });

    submitBtn.disabled = true;
    submitBtn.textContent = 'กำลังบันทึก...';
    msgEl.style.display = 'none';

    try {
      const endpoint = isEdit ? '/api/admin/update' : '/api/admin/add';
      const payload = { passcode: adminPasscode, activityId, data, isTeam };
      if(isEdit) payload.regId = regId;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if(res.ok && result.success) {
        if(isEdit) {
           const idx = list.findIndex(x => x.id === regId);
           if(idx !== -1) list[idx] = result.entry;
        } else {
           list.push(result.entry);
        }
        adminLists[activityId] = list;
        renderAdminPanel();
        fetchCounts();
        closeFn();
      } else {
        msgEl.style.display = 'block';
        msgEl.style.background = 'rgba(255,107,107,0.1)';
        msgEl.style.color = 'var(--danger)';
        msgEl.textContent = result.error || 'เกิดข้อผิดพลาด';
        submitBtn.disabled = false;
        submitBtn.textContent = isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มผู้สมัคร';
      }
    } catch (e) {
      msgEl.style.display = 'block';
      msgEl.style.background = 'rgba(255,107,107,0.1)';
      msgEl.style.color = 'var(--danger)';
      msgEl.textContent = 'Network Error';
      submitBtn.disabled = false;
      submitBtn.textContent = isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มผู้สมัคร';
    }
  };
};
`;

const targetAnchor = `/* =========================================================
   INIT
   ========================================================= */`;
if (html.includes(targetAnchor)) {
    html = html.replace(targetAnchor, jsCode + '\n' + targetAnchor);
    fs.writeFileSync('index.html', html);
    console.log('patched adminEditLogic in index.html');
} else {
    console.log('adminEditLogic target not found');
}
