
/* =========================================================
   CONFIG — edit these to adjust the event
   ========================================================= */
const DEADLINE = new Date('2026-08-13T23:59:59+07:00');
const EVENT_DATE_LABEL = '20 สิงหาคม 2569';
// Admin passcode is validated on the server now.
let adminUnlocked = false;
let adminPasscode = '';


// Seat limits are not specified in the source meeting notes,
// so reasonable defaults are set below — adjust maxSeats freely.
const ACTIVITIES = [
  {
    id:'rocket', name:'จรวดขวดน้ำ', mode:'team', unit:'ทีม', maxSeats:12,
    teamMin:3, teamMax:3,
    period:'08.30-12.00น.',
    icon:'rocket',
    details:['ใช้เวลาแข่งขันประมาณ 3 ชั่วโมง','โรงเรียนจัดเตรียมเครื่องยิงจรวดให้ จำนวน 2 เครื่อง'],
    extraFields:[]
  },
  {
    id:'painting', name:'วาดภาพระบายสี', mode:'individual', unit:'คน', maxSeats:36,
    period:'ช่วงเช้า (ใช้เวลา 3 ชั่วโมง)',
    icon:'palette',
    details:['ใช้กระดาษ 100 ปอนด์ ขนาด F4 (โรงเรียนจัดเตรียมให้)','ห้ามนำโทรศัพท์มือถือเข้า และห้ามดูภาพต้นแบบทุกชนิด','ห้องละไม่เกิน 3 คน (1 คน ต่อ 1 ภาพ)'],
    extraFields:[]
  },
  {
    id:'essay', name:'เขียนเรียงความ', mode:'individual', unit:'คน', maxSeats:24,
    period:'ช่วงเช้า (ใช้เวลา 1 ชั่วโมง)',
    icon:'pencil',
    details:['โรงเรียนจัดเตรียมกระดาษมีเส้นให้สำหรับผู้เข้าสอบ','ห้องละไม่เกิน 2 คน'],
    extraFields:[]
  },
  {
    id:'quiz', name:'ตอบปัญหาทางวิทยาศาสตร์', mode:'team', unit:'ทีม', maxSeats:12,
    teamMin:3, teamMax:3,
    period:'ช่วงเช้า เวลา 1 ชั่วโมง',
    icon:'quiz',
    details:['รูปแบบข้อสอบปรนัย ระบบกระดาษ','แข่งขันประเภททีม ทีมละ 3 คน'],
    extraFields:[]
  },
  {
    id:'recycle', name:'ประกวดชุดรีไซเคิล (Recycle)', mode:'individual', unit:'คน', maxSeats:12,
    period:'ช่วงบ่าย (เดินแบบบนเวที)',
    icon:'recycle',
    details:['ธีม: นวัตกรรมแห่งโลกอนาคต พร้อมนวัตกรรม 1 อย่าง เช่น หน้ากากไซเบอร์กรองอากาศ, แว่นตาโฮโลแกรม, กล่องควบคุมสภาพอากาศ','ผู้เข้าแข่งขันต้องนำเสนอและอธิบายแนวคิดของชุดที่ประดิษฐ์ได้'],
    extraFields:[{id:'innovation', label:'นวัตกรรมที่นำเสนอในชุด', placeholder:'เช่น หน้ากากกรองอากาศ, แว่นตาโฮโลแกรม', required:true}]
  },
  {
    id:'show', name:'Science Show', mode:'team', unit:'ทีม', maxSeats:12,
    teamMin:3, teamMax:5,
    period:'ช่วงบ่าย',
    icon:'flask',
    details:['นำเสนอได้ 1 การทดลองต่อทีม','จำกัดเวลาการแสดงไม่เกิน 10 นาทีต่อทีม'],
    extraFields:[{id:'experiment', label:'ชื่อการทดลองที่นำเสนอ', placeholder:'เช่น ภูเขาไฟจำลอง', required:true}]
  }
];

const ICONS = {
  rocket:'<path d="M12 2c2.5 2 4 5.5 4 9.5 0 2-1 4-1 4l-6 0s-1-2-1-4c0-4 1.5-7.5 4-9.5z"/><circle cx="12" cy="9" r="1.6"/><path d="M9.5 15.5L7 21l3-1.5M14.5 15.5L17 21l-3-1.5"/>',
  palette:'<path d="M12 3a9 9 0 100 18c1.2 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a3 3 0 003-3c0-5-3.6-8.7-8-8.7z"/><circle cx="7.5" cy="10.5" r="1.1"/><circle cx="9.5" cy="7" r="1.1"/><circle cx="14.5" cy="7" r="1.1"/>',
  pencil:'<path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z"/><path d="M13.5 6.5L17.5 10.5"/>',
  quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 014.9.5c0 1.7-2.4 2-2.4 3.6"/><circle cx="12" cy="16.6" r="0.4" fill="currentColor"/>',
  recycle:'<path d="M7 5L4.5 9.5h5L7 5z"/><path d="M17 5l2.5 4.5h-5L17 5z"/><path d="M12 19l-2.5-4.5h5L12 19z"/><path d="M4.5 9.5H9M15 9.5h4.5M9.5 14.5L7 19M14.5 14.5L17 19"/>',
  flask:'<path d="M9 3h6M10 3v6l-4.5 8a2 2 0 001.7 3h9.6a2 2 0 001.7-3L14 9V3"/><path d="M8 15h8"/>'
};

/* =========================================================
   STATE
   ========================================================= */
let activitiesState = {}; // id -> count
let adminLists = {}; // id -> full list for admin
let currentActivity = null;

function isPastDeadline(){ return Date.now() > DEADLINE.getTime(); }

async function fetchCounts(){
  try {
    const res = await fetch('/api/activities/summary');
    if(res.ok) {
      const data = await res.json();
      activitiesState = data.summary;
      renderActivities();
    }
  } catch(e) {
    console.error(e);
  }
}

/* =========================================================
   RENDER — ACTIVITY GRID
   ========================================================= */
function statusFor(count, max){
  const pct = Math.min(100, Math.round((count/max)*100));
  let cls='status-open', label='เปิดรับสมัคร';
  if(count>=max){ cls='status-full'; label='เต็มแล้ว'; }
  else if(pct>=80){ cls='status-low'; label='ใกล้เต็ม'; }
  return {pct, cls, label};
}

function renderActivities(){
  const grid = document.getElementById('activityGrid');
  const deadlinePassed = isPastDeadline();
  grid.innerHTML = ACTIVITIES.map(act=>{
    const count = activitiesState[act.id] || 0;
    const {pct, cls, label} = statusFor(count, act.maxSeats);
    const full = count >= act.maxSeats;
    const disabled = full || deadlinePassed;
    const ringColor = cls==='status-full' ? 'var(--danger)' : (cls==='status-low' ? 'var(--gold)' : 'var(--teal)');
    const btnLabel = deadlinePassed ? 'ปิดรับสมัครแล้ว' : (full ? 'ที่นั่งเต็มแล้ว' : 'ลงทะเบียน');
    return `
    <div class="card" data-mode="${act.mode}">
      <div class="card-top">
        <div class="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[act.icon]}</svg></div>
        <div class="gauge-wrap">
          <div class="gauge-ring" style="--pct:${pct}; --ring-color:${ringColor};"></div>
          <div class="gauge-hole"><div class="n">${count}/${act.maxSeats}</div><div class="d">${act.unit}</div></div>
        </div>
      </div>
      <h3>${act.name}</h3>
      <div class="card-tags">
        <span class="tag">${act.mode==='team' ? `ทีม ${act.teamMin===act.teamMax? act.teamMin : act.teamMin+'-'+act.teamMax} คน` : 'บุคคล'}</span>
        <span class="tag">${act.period}</span>
        <span class="tag ${cls}">${label}</span>
      </div>
      <ul class="card-details">${act.details.map(d=>`<li>${d}</li>`).join('')}</ul>
      <div class="card-footer">
        <span class="seats-left">เหลือ <strong>${Math.max(0, act.maxSeats-count)}</strong> ${act.unit}</span>
        <button class="btn-card" ${disabled?'disabled':''} data-open="${act.id}">${btnLabel}</button>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click', ()=>openRegModal(btn.getAttribute('data-open')));
  });
}

async function loadAll(){
  await fetchCounts();
}

function initRealtimeListener(){
  // Polling every 5 seconds for updates
  setInterval(fetchCounts, 5000);
}

/* =========================================================
   COUNTDOWN
   ========================================================= */
function tickCountdown(){
  const diff = DEADLINE.getTime() - Date.now();
  if(diff<=0){
    document.body.classList.add('past-deadline');
    document.getElementById('cdDays').textContent='0';
    document.getElementById('cdHours').textContent='0';
    document.getElementById('cdMins').textContent='0';
    document.getElementById('cdSecs').textContent='0';
    renderActivities();
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  document.getElementById('cdDays').textContent=d;
  document.getElementById('cdHours').textContent=String(h).padStart(2,'0');
  document.getElementById('cdMins').textContent=String(m).padStart(2,'0');
  document.getElementById('cdSecs').textContent=String(s).padStart(2,'0');
}

/* =========================================================
   REGISTRATION MODAL
   ========================================================= */
const regOverlay = document.getElementById('regOverlay');
const regBody = document.getElementById('regBody');

function fieldHTML(f){
  return `<div class="field" data-field="${f.id}">
    <label for="f_${f.id}">${f.label} ${f.required?'<span class="req">*</span>':''}</label>
    <input type="text" id="f_${f.id}" placeholder="${f.placeholder||''}">
    <div class="error">กรุณากรอกข้อมูลนี้</div>
  </div>`;
}

function openRegModal(actId){
  currentActivity = ACTIVITIES.find(a=>a.id===actId);
  renderRegForm();
  regOverlay.classList.add('open');
}
function closeRegModal(){
  regOverlay.classList.remove('open');
  currentActivity = null;
}

function renderRegForm(){
  const act = currentActivity;
  const isTeam = act.mode==='team';
  let memberRowsHTML = '';
  if(isTeam){
    for(let i=0;i<act.teamMin;i++){
      memberRowsHTML += `<div class="member-row"><input type="text" class="member-input" placeholder="ชื่อ-นามสกุล สมาชิกคนที่ ${i+1}">${i>=act.teamMin?'<button type="button" class="rm">✕</button>':''}</div>`;
    }
  }
  regBody.innerHTML = `
    <p class="modal-eyebrow">ลงทะเบียนแข่งขัน</p>
    <h3>${act.name}</h3>
    <p class="modal-sub">${act.period} · ${isTeam? `ทีมละ ${act.teamMin===act.teamMax?act.teamMin:act.teamMin+'-'+act.teamMax} คน`:'สมัครเป็นรายบุคคล'}</p>
    <div class="form-msg" id="formMsg"></div>
    <form id="regForm">
      ${isTeam ? `
      <div class="field" data-field="teamName">
        <label for="f_teamName">ชื่อทีม <span class="req">*</span></label>
        <input type="text" id="f_teamName" placeholder="เช่น ทีมนักประดิษฐ์">
        <div class="error">กรุณากรอกชื่อทีม</div>
      </div>` : `
      <div class="field" data-field="fullName">
        <label for="f_fullName">ชื่อ-นามสกุล <span class="req">*</span></label>
        <input type="text" id="f_fullName" placeholder="ชื่อ-นามสกุล">
        <div class="error">กรุณากรอกชื่อ-นามสกุล</div>
      </div>`}

      <div class="field" data-field="grade">
        <label for="f_grade">ระดับชั้น${isTeam?'ของทีม':''} <span class="req">*</span></label>
        <select id="f_grade">
          <option value="">เลือกระดับชั้น</option>
          <option>ม.1</option><option>ม.2</option><option>ม.3</option>
          <option>ม.4</option><option>ม.5</option><option>ม.6</option>
        </select>
        <div class="error">กรุณาเลือกระดับชั้น</div>
      </div>

      <div class="field" data-field="room">
        <label for="f_room">ห้อง ${isTeam?'(เช่น 1/1, 1/2)':''} <span class="req">*</span></label>
        <input type="text" id="f_room" placeholder="เช่น 1/1, 1/2, 4/2">
        <div class="error">กรุณากรอกห้อง (เช่น 1/1, 1/2)</div>
      </div>

      ${isTeam ? `
      <div class="field" data-field="members">
        <label>รายชื่อสมาชิกในทีม <span class="req">*</span></label>
        <div class="member-rows" id="memberRows">${memberRowsHTML}</div>
        <button type="button" class="add-member" id="addMemberBtn" ${act.teamMin>=act.teamMax?'style="display:none"':''}>+ เพิ่มสมาชิก (สูงสุด ${act.teamMax} คน)</button>
        <div class="error">กรุณากรอกชื่อสมาชิกให้ครบ</div>
      </div>` : ''}

      <div class="field" data-field="phone">
        <label for="f_phone">เบอร์โทรติดต่อ${isTeam?' (หัวหน้าทีม)':''} <span class="req">*</span></label>
        <input type="tel" id="f_phone" placeholder="08xxxxxxxx">
        <div class="error">กรุณากรอกเบอร์โทร 9-10 หลัก</div>
      </div>

      ${act.extraFields.map(fieldHTML).join('')}

      <button type="submit" class="btn-submit" id="submitBtn">ยืนยันการลงทะเบียน</button>
    </form>
  `;

  document.getElementById('regForm').addEventListener('submit', handleSubmit);
  const addBtn = document.getElementById('addMemberBtn');
  if(addBtn){
    addBtn.addEventListener('click', ()=>{
      const rows = document.getElementById('memberRows');
      const current = rows.querySelectorAll('.member-row').length;
      if(current>=act.teamMax) return;
      const row = document.createElement('div');
      row.className='member-row';
      row.innerHTML = `<input type="text" class="member-input" placeholder="ชื่อ-นามสกุล สมาชิกคนที่ ${current+1}"><button type="button" class="rm">✕</button>`;
      row.querySelector('.rm').addEventListener('click', ()=>{ row.remove(); if(rows.querySelectorAll('.member-row').length<act.teamMax) addBtn.style.display=''; });
      rows.appendChild(row);
      if(rows.querySelectorAll('.member-row').length>=act.teamMax) addBtn.style.display='none';
    });
  }
}

function setFieldError(fieldEl, hasError){
  fieldEl.classList.toggle('has-error', hasError);
}

async function handleSubmit(e){
  e.preventDefault();
  const act = currentActivity;
  const isTeam = act.mode==='team';
  const msgEl = document.getElementById('formMsg');
  msgEl.className='form-msg';
  msgEl.textContent='';
  let valid = true;

  const data = {};
  if(isTeam){
    const teamNameField = document.querySelector('[data-field="teamName"]');
    data.teamName = document.getElementById('f_teamName').value.trim();
    const ok = !!data.teamName;
    setFieldError(teamNameField, !ok); if(!ok) valid=false;
  } else {
    const nameField = document.querySelector('[data-field="fullName"]');
    data.fullName = document.getElementById('f_fullName').value.trim();
    const ok = !!data.fullName;
    setFieldError(nameField, !ok); if(!ok) valid=false;
  }

  const gradeField = document.querySelector('[data-field="grade"]');
  data.grade = document.getElementById('f_grade').value;
  { const ok=!!data.grade; setFieldError(gradeField, !ok); if(!ok) valid=false; }

  const roomField = document.querySelector('[data-field="room"]');
  data.room = document.getElementById('f_room').value.trim();
  { const ok = !!data.room; setFieldError(roomField, !ok); if(!ok) valid=false; }

  if(isTeam){
    const membersField = document.querySelector('[data-field="members"]');
    const inputs = Array.from(document.querySelectorAll('.member-input'));
    data.members = inputs.map(i=>i.value.trim()).filter(v=>v.length>0);
    const ok = data.members.length>=act.teamMin;
    setFieldError(membersField, !ok); if(!ok) valid=false;
  }

  const phoneField = document.querySelector('[data-field="phone"]');
  data.phone = document.getElementById('f_phone').value.trim();
  { const ok = /^[0-9]{9,10}$/.test(data.phone); setFieldError(phoneField, !ok); if(!ok) valid=false; }

  for(const f of act.extraFields){
    const fEl = document.querySelector(`[data-field="${f.id}"]`);
    const val = document.getElementById('f_'+f.id).value.trim();
    data[f.id] = val;
    if(f.required){ const ok=!!val; setFieldError(fEl, !ok); if(!ok) valid=false; }
  }

  if(!valid) return;

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'กำลังบันทึก...';

  if(isPastDeadline()){
    msgEl.className='form-msg error show';
    msgEl.textContent='ขออภัย ขณะนี้ปิดรับสมัครแล้ว';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
    renderActivities();
    return;
  }

  const latestCount = activitiesState[act.id] || 0;
  if(latestCount >= act.maxSeats){
    msgEl.className='form-msg full show';
    msgEl.textContent='ขออภัย ที่นั่งกิจกรรมนี้เต็มแล้ว';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
    return;
  }

  // --- Check for duplicate registrations in the same period ---
  const periods = {};
  ACTIVITIES.forEach(a => {
    periods[a.id] = {
      isMorning: a.period.includes('เช้า') || a.period.includes('08.30'),
      isAfternoon: a.period.includes('บ่าย')
    };
  });
  periods.currentIsMorning = act.period.includes('เช้า') || act.period.includes('08.30');
  periods.currentIsAfternoon = act.period.includes('บ่าย');

  try {
    const dupRes = await fetch('/api/check-duplicate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        searchName: data.fullName || data.teamName,
        searchMembers: data.members || [],
        periods
      })
    });
    
    if (dupRes.ok) {
      const dupData = await dupRes.json();
      if (dupData.isDuplicate) {
        const dupActName = ACTIVITIES.find(a => a.id === dupData.dupActivityId)?.name || 'กิจกรรมอื่น';
        msgEl.className='form-msg error show';
        msgEl.textContent=`ขออภัย ชื่อ เบอร์โทร หรือสมาชิกบางคนได้ลงทะเบียนใน "${dupActName}" ไปแล้วในช่วงเวลาเดียวกัน`;
        submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
        return;
      }
    }
  } catch (e) {
    console.error(e);
  }

  // -------------------------------------------------------------

  try {
    const regRes = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activityId: act.id, data })
    });
    
    if (regRes.ok) {
      const result = await regRes.json();
      activitiesState[act.id] = (activitiesState[act.id] || 0) + 1;
      renderActivities();
      showSuccess(result.entry, act);
    } else {
      throw new Error("Failed to register");
    }
  } catch(e) {
    msgEl.className='form-msg error show';
    msgEl.textContent='บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
  }
}

function showSuccess(entry, act){
  const name = entry.teamName || entry.fullName;
  regBody.innerHTML = `
    <div class="success-view" style="text-align:center;">
      <div class="success-icon" style="margin: 0 auto 15px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg></div>
      <h3>ลงทะเบียนสำเร็จ</h3>
      <p style="margin-bottom:20px;">กรุณาบันทึกภาพด้านล่างไว้เป็นหลักฐาน</p>
      
      <div id="ticketContainer" style="display:inline-block; text-align:left; background:#fff; border:2px solid #0284c7; border-radius:12px; padding:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1); width:100%; max-width:320px; position:relative; overflow:hidden;">
         <div style="position:absolute; top:-20px; right:-20px; width:60px; height:60px; background:var(--teal); transform:rotate(45deg);"></div>
         <h4 style="color:#0f172a; font-size:16px; margin:0 0 5px 0;">Woraluck Science Fair</h4>
         <p style="color:#64748b; font-size:12px; margin:0 0 15px 0; border-bottom:1px dashed #cbd5e1; padding-bottom:10px;">บัตรยืนยันการสมัคร / Confirmation Slip</p>
         
         <div style="margin-bottom:10px;">
           <span style="display:block; font-size:11px; color:#64748b; text-transform:uppercase;">กิจกรรม (Activity)</span>
           <strong style="color:#0f172a; font-size:14px;">${act.name}</strong>
         </div>
         <div style="margin-bottom:10px;">
           <span style="display:block; font-size:11px; color:#64748b; text-transform:uppercase;">ผู้สมัคร (Participant)</span>
           <strong style="color:#0f172a; font-size:14px;">${name}</strong>
         </div>
         <div style="margin-bottom:10px;">
           <span style="display:block; font-size:11px; color:#64748b; text-transform:uppercase;">เวลา (Period)</span>
           <strong style="color:#0f172a; font-size:14px;">${act.period}</strong>
         </div>
         <div style="margin-bottom:15px; background:#f1f5f9; padding:8px; border-radius:6px; text-align:center;">
           <span style="display:block; font-size:11px; color:#64748b; text-transform:uppercase;">รหัสอ้างอิง (Ref No.)</span>
           <strong style="color:#0284c7; font-size:18px; letter-spacing:1px;">${entry.id}</strong>
         </div>
         <div style="text-align:center;">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${entry.id}" alt="QR" style="display:inline-block; width:120px; height:120px; border:1px solid #e2e8f0; border-radius:4px; padding:4px;">
         </div>
      </div>
      
      <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
        <button class="btn-submit" id="downloadTicketBtn" style="flex:1;">บันทึกรูปภาพตั๋ว</button>
        <button class="btn-secondary" id="successCloseBtn" style="flex:1;">เสร็จสิ้น</button>
      </div>
    </div>
  `;
  document.getElementById('successCloseBtn').addEventListener('click', closeRegModal);
  document.getElementById('downloadTicketBtn').addEventListener('click', () => {
    generateAndDownloadCanvas(entry.id, act.name, name, act.period);
  });
  showToast('ลงทะเบียน '+act.name+' สำเร็จ');
}

function generateAndDownloadCanvas(regId, actName, pName, period) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 750;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0,0,canvas.width,120);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Woraluck Science Fair 2026', canvas.width/2, 60);
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('บัตรยืนยันการสมัคร / Confirmation Slip', canvas.width/2, 95);
  
  ctx.textAlign = 'left';
  let y = 180;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('กิจกรรม (Activity)', 50, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(actName, 50, y);
  
  y += 70;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('ผู้สมัคร (Participant)', 50, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(pName, 50, y);
  
  y += 70;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('เวลา (Period)', 50, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(period, 50, y);
  
  y += 60;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(50, y, 500, 100);
  ctx.fillStyle = '#64748b';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('รหัสอ้างอิง (Ref No.)', canvas.width/2, y + 35);
  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(regId, canvas.width/2, y + 75);
  
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    ctx.drawImage(img, canvas.width/2 - 75, y + 130, 150, 150);
    triggerDownload();
  };
  img.onerror = () => {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(canvas.width/2 - 75, y + 130, 150, 150);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText('No QR preview', canvas.width/2, y + 205);
    triggerDownload();
  }
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${regId}`;
  
  function triggerDownload(){
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Ticket_${regId}.png`;
      a.click();
    } catch(e) {
      ctx.clearRect(canvas.width/2 - 75, y + 130, 150, 150);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(canvas.width/2 - 75, y + 130, 150, 150);
      ctx.fillStyle = '#64748b';
      ctx.font = '16px sans-serif';
      ctx.fillText('Save HTML Ticket', canvas.width/2, y + 205);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Ticket_${regId}.png`;
      a.click();
    }
  }
}

document.getElementById('regCloseBtn').addEventListener('click', closeRegModal);
regOverlay.addEventListener('click', (e)=>{ if(e.target===regOverlay) closeRegModal(); });

/* =========================================================
   TOAST
   ========================================================= */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 3200);
}

/* =========================================================
   ADMIN PANEL
   ========================================================= */
const adminOverlay = document.getElementById('adminOverlay');
const adminBody = document.getElementById('adminBody');
let adminActiveTab = 'dashboard';

document.getElementById('adminOpenBtn').addEventListener('click', ()=>{
  adminOverlay.classList.add('open');
  if(adminUnlocked) renderAdminPanel(); else renderAdminGate();
});
document.getElementById('adminCloseBtn').addEventListener('click', ()=>adminOverlay.classList.remove('open'));
adminOverlay.addEventListener('click', (e)=>{ if(e.target===adminOverlay) adminOverlay.classList.remove('open'); });

function renderAdminGate(){
  adminBody.innerHTML = `
    <div class="admin-pass">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
      <h3>สำหรับครู / เจ้าหน้าที่</h3>
      <p class="modal-sub">กรอกรหัสผ่านเพื่อดูรายชื่อผู้สมัครทั้งหมด</p>
      <div class="field" style="width:100%;max-width:260px;">
        <input type="password" id="adminPassInput" placeholder="รหัสผ่าน">
        <div class="error" id="adminPassErr" style="display:none;">รหัสผ่านไม่ถูกต้อง</div>
      </div>
      <button class="btn-submit" id="adminUnlockBtn" style="max-width:260px;">เข้าสู่ระบบ</button>
    </div>
  `;
  document.getElementById('adminUnlockBtn').addEventListener('click', async ()=>{
    const val = document.getElementById('adminPassInput').value;
    const btn = document.getElementById('adminUnlockBtn');
    const err = document.getElementById('adminPassErr');
    err.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'กำลังตรวจสอบ...';
    
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: val, activityId: 'all' })
      });
      
      if (res.ok) {
        const data = await res.json();
        adminLists = data.allData;
        adminUnlocked = true;
        adminPasscode = val;
        renderAdminPanel();
      } else {
        err.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'เข้าสู่ระบบ';
      }
    } catch(e) {
      err.textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
      err.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'เข้าสู่ระบบ';
    }
  });
  document.getElementById('adminPassInput').addEventListener('keydown', (e)=>{
    if(e.key==='Enter') document.getElementById('adminUnlockBtn').click();
  });
}

function csvEscape(v){ if(v==null) return ''; const s=String(v).replace(/"/g,'""'); return `"${s}"`; }

function exportCSV(actId){
  const act = ACTIVITIES.find(a=>a.id===actId);
  const rawList = adminLists[actId] || [];
  const list = typeof sortRegistrants === 'function' ? sortRegistrants(rawList, adminSortBy) : rawList;
  const isTeam = act.mode === 'team';
  const cols = isTeam
    ? ['id','teamName','grade','room','members','phone', ...act.extraFields.map(f=>f.id), 'timestamp']
    : ['id','fullName','grade','room','phone', ...act.extraFields.map(f=>f.id), 'timestamp'];

  const headerMap = {
    id: 'รหัส',
    teamName: 'ชื่อทีม',
    fullName: 'ชื่อ-นามสกุล',
    grade: 'ระดับชั้น',
    room: 'ห้อง',
    members: 'รายชื่อสมาชิก',
    phone: 'เบอร์โทรศัพท์',
    timestamp: 'เวลาสมัคร'
  };
  act.extraFields.forEach(f => {
    headerMap[f.id] = f.label;
  });

  const headers = cols.map(c => csvEscape(headerMap[c] || c));
  const rows = [headers.join(',')];

  list.forEach(r=>{
    rows.push(cols.map(c=>{
      let v = r[c];
      if(c==='members' && Array.isArray(v)) v = v.join(' / ');
      if(c==='timestamp' && v) {
        try { v = new Date(v).toLocaleString('th-TH'); } catch(e){}
      }
      return csvEscape(v);
    }).join(','));
  });
  const blob = new Blob(['\uFEFF'+rows.join('\n')], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = act.id+'-registrants.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showConfirmModal({ title, message, confirmText = 'ยืนยัน', onConfirm }) {
  let confirmOverlay = document.getElementById('confirmOverlay');
  if(!confirmOverlay) {
    confirmOverlay = document.createElement('div');
    confirmOverlay.id = 'confirmOverlay';
    confirmOverlay.className = 'overlay';
    confirmOverlay.style.zIndex = '1000';
    document.body.appendChild(confirmOverlay);
  }
  confirmOverlay.innerHTML = `
    <div class="modal" style="max-width:380px; text-align:center; padding:24px 20px;">
      <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,107,107,0.15); color:var(--danger); display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
      </div>
      <h3 style="font-size:17px; font-weight:600; margin-bottom:8px; color:var(--text);">${title}</h3>
      <p style="font-size:13.5px; color:var(--text-mute); margin-bottom:20px; line-height:1.5;">${message}</p>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button id="confirmCancelBtn" class="btn-tiny" style="padding:8px 18px; font-size:13px; cursor:pointer;">ยกเลิก</button>
        <button id="confirmOkBtn" class="btn-tiny danger" style="padding:8px 18px; font-size:13px; background:var(--danger); color:#fff; border:none; cursor:pointer;">${confirmText}</button>
      </div>
    </div>
  `;
  confirmOverlay.classList.add('open');

  const close = () => {
    confirmOverlay.classList.remove('open');
  };

  document.getElementById('confirmCancelBtn').onclick = close;
  document.getElementById('confirmOkBtn').onclick = async () => {
    close();
    await onConfirm();
  };
}

async function resetActivity(actId){
  const act = ACTIVITIES.find(a=>a.id===actId);
  showConfirmModal({
    title: 'ยืนยันล้างรายชื่อทั้งหมด',
    message: `คุณต้องการล้างรายชื่อผู้สมัครทั้งหมดของกิจกรรม "${act.name}" ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`,
    confirmText: 'ล้างทั้งหมด',
    onConfirm: async () => {
      try {
        await fetch('/api/admin/reset', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ activityId: actId, passcode: adminPasscode })
        });
        adminLists[actId] = [];
        renderAdminPanel();
        fetchCounts();
        showToast('ล้างรายชื่อทั้งหมดเรียบร้อยแล้ว');
      } catch(e) {
        showToast('เกิดข้อผิดพลาดในการล้างข้อมูล');
      }
    }
  });
}

function deleteSingleRegistrant(actId, regId){
  const act = ACTIVITIES.find(a=>a.id===actId);
  const list = adminLists[actId] || [];
  const target = list.find(r=>r.id===regId);
  if(!target) return;
  const targetName = target.teamName || target.fullName || regId;

  showConfirmModal({
    title: 'ยืนยันการลบผู้สมัคร',
    message: `คุณต้องการลบผู้สมัคร "${targetName}" (${regId}) ออกจากกิจกรรม ${act.name} ใช่หรือไม่?`,
    confirmText: 'ลบรายชื่อ',
    onConfirm: async () => {
      try {
        await fetch('/api/cancel', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ activityId: actId, regId: regId, passcode: adminPasscode })
        });
        adminLists[actId] = list.filter(r=>r.id !== regId);
        renderAdminPanel();
        fetchCounts();
        showToast('ลบ ' + targetName + ' เรียบร้อยแล้ว');
      } catch(e) {
        showToast('เกิดข้อผิดพลาดในการลบข้อมูล');
      }
    }
  });
}

let adminSearchQuery = '';
let adminSortBy = 'time-asc';

function sortRegistrants(list, sortBy) {
  return [...list].sort((a, b) => {
    if (sortBy === 'time-asc') {
      return (a.timestamp || 0) - (b.timestamp || 0);
    } else if (sortBy === 'time-desc') {
      return (b.timestamp || 0) - (a.timestamp || 0);
    } else if (sortBy === 'room-asc') {
      const roomA = (a.room || '').toString();
      const roomB = (b.room || '').toString();
      return roomA.localeCompare(roomB, 'th', { numeric: true });
    } else if (sortBy === 'room-desc') {
      const roomA = (a.room || '').toString();
      const roomB = (b.room || '').toString();
      return roomB.localeCompare(roomA, 'th', { numeric: true });
    } else if (sortBy === 'grade-asc') {
      const gradeA = (a.grade || '').toString();
      const gradeB = (b.grade || '').toString();
      return gradeA.localeCompare(gradeB, 'th', { numeric: true });
    } else if (sortBy === 'grade-desc') {
      const gradeA = (a.grade || '').toString();
      const gradeB = (b.grade || '').toString();
      return gradeB.localeCompare(gradeA, 'th', { numeric: true });
    } else if (sortBy === 'name-asc') {
      const nameA = (a.fullName || a.teamName || '').toString();
      const nameB = (b.fullName || b.teamName || '').toString();
      return nameA.localeCompare(nameB, 'th');
    } else if (sortBy === 'name-desc') {
      const nameA = (a.fullName || a.teamName || '').toString();
      const nameB = (b.fullName || b.teamName || '').toString();
      return nameB.localeCompare(nameA, 'th');
    } else if (sortBy === 'id-asc') {
      const idA = (a.id || '').toString();
      const idB = (b.id || '').toString();
      return idA.localeCompare(idB, 'th', { numeric: true });
    } else if (sortBy === 'id-desc') {
      const idA = (a.id || '').toString();
      const idB = (b.id || '').toString();
      return idB.localeCompare(idA, 'th', { numeric: true });
    }
    return 0;
  });
}

function getSortIndicator(col) {
  if (col === 'id') {
    if (adminSortBy === 'id-asc') return ' ▲';
    if (adminSortBy === 'id-desc') return ' ▼';
  } else if (col === 'name') {
    if (adminSortBy === 'name-asc') return ' ▲';
    if (adminSortBy === 'name-desc') return ' ▼';
  } else if (col === 'grade') {
    if (adminSortBy === 'grade-asc') return ' ▲';
    if (adminSortBy === 'grade-desc') return ' ▼';
  } else if (col === 'room') {
    if (adminSortBy === 'room-asc') return ' ▲';
    if (adminSortBy === 'room-desc') return ' ▼';
  } else if (col === 'time') {
    if (adminSortBy === 'time-asc') return ' ▲';
    if (adminSortBy === 'time-desc') return ' ▼';
  }
  return ' <span style="opacity:0.35; font-size:10px;">↕</span>';
}

function renderAdminPanel(){
  let tabsHTML = `<button class="admin-tab ${adminActiveTab==='dashboard'?'active':''}" data-tab="dashboard">ภาพรวม (Dashboard)</button>`;
  tabsHTML += ACTIVITIES.map(a=>`<button class="admin-tab ${a.id===adminActiveTab?'active':''}" data-tab="${a.id}">${a.name}</button>`).join('');

  if (adminActiveTab === 'dashboard') {
     let dashboardCards = ACTIVITIES.map(act => {
        const count = adminLists[act.id] ? adminLists[act.id].length : 0;
        const pct = Math.min(100, Math.round((count / act.maxSeats) * 100));
        let color = '#10b981'; // Green
        if (pct >= 100) color = '#ef4444'; // Red
        else if (pct >= 80) color = '#f59e0b'; // Orange
        
        return `
          <div style="background:var(--bg-2); border:1px solid var(--border-strong); border-radius:12px; padding:16px;">
            <h4 style="margin:0 0 10px 0; font-size:15px;">${act.name}</h4>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:var(--text-mute);">
              <span>รับ ${act.maxSeats} ${act.unit}</span>
              <span style="color:${color}; font-weight:600;">สมัครแล้ว ${count}</span>
            </div>
            <div style="width:100%; background:var(--bg); border-radius:4px; height:8px; overflow:hidden;">
              <div style="height:100%; width:${pct}%; background:${color};"></div>
            </div>
          </div>
        `;
     }).join('');

     // Find most popular
     let sortedActs = [...ACTIVITIES].map(act => ({...act, count: adminLists[act.id]?.length || 0}));
     sortedActs.sort((a,b) => b.count - a.count);
     let popularAct = sortedActs[0];

     adminBody.innerHTML = `
      <p class="modal-eyebrow">แผงควบคุมสำหรับเจ้าหน้าที่</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h3>ภาพรวมการสมัคร (Dashboard)</h3>
      </div>
      <div class="admin-tabs">
        ${tabsHTML}
      </div>
      
      <div style="margin-bottom:20px; padding:16px; background:var(--bg-2); border:1px solid var(--gold); border-radius:12px;">
        <h4 style="margin:0 0 5px 0; color:var(--gold);">🌟 กิจกรรมที่ได้รับความสนใจมากที่สุด</h4>
        <p style="margin:0; font-size:14px;"><strong>${popularAct.name}</strong> (สมัครแล้ว ${popularAct.count} ${popularAct.unit})</p>
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px;">
        ${dashboardCards}
      </div>
     `;
  } else {
    const act = ACTIVITIES.find(a=>a.id===adminActiveTab);
    const list = adminLists[act.id] || [];
    const isTeam = act.mode==='team';

    let filteredList = list;
    if(adminSearchQuery.trim()){
      const q = adminSearchQuery.trim().toLowerCase();
      filteredList = list.filter(r => {
        const idMatch = (r.id || '').toLowerCase().includes(q);
        const nameMatch = (r.fullName || r.teamName || '').toLowerCase().includes(q);
        const roomMatch = (r.room || '').toLowerCase().includes(q);
        const gradeMatch = (r.grade || '').toLowerCase().includes(q);
        const phoneMatch = (r.phone || '').toLowerCase().includes(q);
        const memberMatch = Array.isArray(r.members) && r.members.some(m => m.toLowerCase().includes(q));
        return idMatch || nameMatch || roomMatch || gradeMatch || phoneMatch || memberMatch;
      });
    }

    filteredList = sortRegistrants(filteredList, adminSortBy);

    adminBody.innerHTML = `
      <p class="modal-eyebrow">แผงควบคุมสำหรับเจ้าหน้าที่</p>
      <h3>รายชื่อผู้สมัคร</h3>
      <div class="admin-tabs">
        ${tabsHTML}
      </div>
      <div class="admin-toolbar">
        <span class="count">สมัครแล้ว <strong>${list.length}</strong> / ${act.maxSeats} ${act.unit}</span>
        <div class="admin-btns">
          <button class="btn-tiny" id="exportBtn">ส่งออก CSV</button>
          <button class="btn-tiny" id="printBtn">พิมพ์รายชื่อ</button>
          <button class="btn-tiny danger" id="resetBtn">ล้างรายชื่อทั้งหมด</button>
        </div>
      </div>
      <div style="display:flex; gap:10px; margin-bottom:12px; flex-wrap:wrap; align-items:center;">
        <div style="flex:1; min-width:180px;">
          <input type="text" id="adminSearchInput" placeholder="🔍 ค้นหาชื่อ, รหัส, ห้อง..." value="${adminSearchQuery}" style="width:100%; background:var(--bg); border:1px solid var(--border-strong); color:var(--text); border-radius:var(--radius-sm); padding:8px 12px; font-size:13px;">
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <label for="adminSortSelect" style="font-size:12.5px; color:var(--text-mute); white-space:nowrap;">เรียงตาม:</label>
        <select id="adminSortSelect" style="background:var(--bg); border:1px solid var(--border-strong); color:var(--text); border-radius:var(--radius-sm); padding:8px 10px; font-size:12.5px; cursor:pointer;">
          <option value="time-asc" ${adminSortBy==='time-asc'?'selected':''}>⏰ เวลาสมัคร (เก่า → ใหม่)</option>
          <option value="time-desc" ${adminSortBy==='time-desc'?'selected':''}>⏰ เวลาสมัคร (ใหม่ → เก่า)</option>
          <option value="room-asc" ${adminSortBy==='room-asc'?'selected':''}>🏫 ห้องเรียน (น้อย → มาก)</option>
          <option value="room-desc" ${adminSortBy==='room-desc'?'selected':''}>🏫 ห้องเรียน (มาก → น้อย)</option>
          <option value="grade-asc" ${adminSortBy==='grade-asc'?'selected':''}>🎓 ระดับชั้น</option>
          <option value="name-asc" ${adminSortBy==='name-asc'?'selected':''}>👤 ชื่อ-นามสกุล / ทีม (ก-ฮ)</option>
          <option value="id-asc" ${adminSortBy==='id-asc'?'selected':''}>🆔 รหัสผู้สมัคร</option>
        </select>
      </div>
    </div>
    <div class="admin-table-wrap">
      ${filteredList.length===0 ? '<div class="admin-empty">' + (list.length === 0 ? 'ยังไม่มีผู้สมัครในกิจกรรมนี้' : 'ไม่พบรายชื่อที่ค้นหา') + '</div>' : `
      <table>
        <thead><tr>
          <th data-sort-col="id" style="cursor:pointer; user-select:none;" title="คลิกเพื่อเรียง">รหัส${getSortIndicator('id')}</th>
          <th data-sort-col="name" style="cursor:pointer; user-select:none;" title="คลิกเพื่อเรียง">${isTeam?'ชื่อทีม':'ชื่อ-นามสกุล'}${getSortIndicator('name')}</th>
          <th data-sort-col="grade" style="cursor:pointer; user-select:none;" title="คลิกเพื่อเรียง">ระดับชั้น${getSortIndicator('grade')}</th>
          <th data-sort-col="room" style="cursor:pointer; user-select:none;" title="คลิกเพื่อเรียง">ห้อง${getSortIndicator('room')}</th>
          ${isTeam?'<th>สมาชิก</th>':''}
          <th>โทรศัพท์</th>
          ${act.extraFields.map(f=>`<th>${f.label}</th>`).join('')}
          <th data-sort-col="time" style="cursor:pointer; user-select:none;" title="คลิกเพื่อเรียง">เวลาสมัคร${getSortIndicator('time')}</th>
          <th style="text-align:center;">จัดการ</th>
        </tr></thead>
        <tbody>
          ${filteredList.map(r=>`<tr>
            <td>${r.id}</td>
            <td><strong>${isTeam? r.teamName : r.fullName}</strong></td>
            <td>${r.grade||''}</td>
            <td>${r.room||''}</td>
            ${isTeam?`<td>${(r.members||[]).join(', ')}</td>`:''}
            <td>${r.phone||''}</td>
            ${act.extraFields.map(f=>`<td>${r[f.id]||''}</td>`).join('')}
            <td>${new Date(r.timestamp).toLocaleString('th-TH')}</td>
            <td style="text-align:center;">
              <button class="btn-del-item" data-del-id="${r.id}">ลบ</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>`}
    </div>
  `;
  } // END OF ELSE BLOCK

  adminBody.querySelectorAll('[data-tab]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ adminActiveTab = btn.getAttribute('data-tab'); renderAdminPanel(); });
  });
  
  if (adminActiveTab !== 'dashboard') {
    const act = ACTIVITIES.find(a=>a.id===adminActiveTab);
    const searchInput = document.getElementById('adminSearchInput');
    if(searchInput){
      searchInput.addEventListener('input', (e)=>{
        adminSearchQuery = e.target.value;
        renderAdminPanel();
        const newSearchInput = document.getElementById('adminSearchInput');
        if(newSearchInput){
          newSearchInput.focus();
          newSearchInput.setSelectionRange(adminSearchQuery.length, adminSearchQuery.length);
        }
      });
    }
    const sortSelect = document.getElementById('adminSortSelect');
    if(sortSelect){
      sortSelect.addEventListener('change', (e)=>{
        adminSortBy = e.target.value;
        renderAdminPanel();
      });
    }
    adminBody.querySelectorAll('[data-sort-col]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort-col');
        if (col === 'id') {
          adminSortBy = adminSortBy === 'id-asc' ? 'id-desc' : 'id-asc';
        } else if (col === 'name') {
          adminSortBy = adminSortBy === 'name-asc' ? 'name-desc' : 'name-asc';
        } else if (col === 'grade') {
          adminSortBy = adminSortBy === 'grade-asc' ? 'grade-desc' : 'grade-asc';
        } else if (col === 'room') {
          adminSortBy = adminSortBy === 'room-asc' ? 'room-desc' : 'room-asc';
        } else if (col === 'time') {
          adminSortBy = adminSortBy === 'time-asc' ? 'time-desc' : 'time-asc';
        }
        renderAdminPanel();
      });
    });
    
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.addEventListener('click', ()=>exportCSV(act.id));
    
    const printBtn = document.getElementById('printBtn');
    if (printBtn) printBtn.addEventListener('click', ()=>window.print());
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', ()=>resetActivity(act.id));

    adminBody.querySelectorAll('[data-del-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.getAttribute('data-del-id');
        deleteSingleRegistrant(act.id, regId);
      });
    });
  }
}

/* =========================================================
   STATUS / CANCEL
   ========================================================= */
const statusOverlay = document.getElementById('statusOverlay');
const statusResult = document.getElementById('statusResult');

document.getElementById('openStatusBtn').addEventListener('click', ()=>{
  statusOverlay.classList.add('open');
  document.getElementById('statusRegId').value = '';
  statusResult.style.display = 'none';
});

document.getElementById('statusCloseBtn').addEventListener('click', ()=>{
  statusOverlay.classList.remove('open');
});

statusOverlay.addEventListener('click', (e)=>{
  if(e.target===statusOverlay) statusOverlay.classList.remove('open');
});

document.getElementById('statusSearchBtn').addEventListener('click', async () => {
  const regId = document.getElementById('statusRegId').value.trim().toUpperCase();
  if(!regId) return;
  
  const searchBtn = document.getElementById('statusSearchBtn');
  searchBtn.disabled = true;
  searchBtn.textContent = 'กำลังค้นหา...';
  
  statusResult.style.display = 'block';
  statusResult.innerHTML = '<p style="text-align:center; color:var(--text-dim);">กำลังตรวจสอบ...</p>';
  
  try {
    const res = await fetch(`/api/status/${regId}`);
    if (!res.ok) {
       statusResult.innerHTML = '<div class="form-msg error show" style="margin:0;">ไม่พบข้อมูลการสมัครสำหรับรหัสอ้างอิงนี้</div>';
       searchBtn.disabled = false;
       searchBtn.textContent = 'ค้นหาข้อมูล';
       return;
    }
    
    const data = await res.json();
    const found = data.found;
    const foundAct = ACTIVITIES.find(a => a.id === data.foundActId);
    
    if(!found){
      statusResult.innerHTML = '<div class="form-msg error show" style="margin:0;">ไม่พบข้อมูลการสมัครสำหรับรหัสอ้างอิงนี้</div>';
      searchBtn.disabled = false;
      searchBtn.textContent = 'ค้นหาข้อมูล';
      return;
    }
    
    statusResult.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:15px; margin-bottom:15px;">
        <h4 style="margin:0 0 10px 0; color:#0f172a;">สถานะ: <span style="color:var(--teal);">ลงทะเบียนเรียบร้อย</span></h4>
        <p style="margin:0 0 6px 0; color:#475569; font-size:14px;"><strong>กิจกรรม:</strong> ${foundAct.name}</p>
        <p style="margin:0 0 6px 0; color:#475569; font-size:14px;"><strong>ผู้สมัคร:</strong> ${found.teamName || found.fullName}</p>
        <p style="margin:0; color:#475569; font-size:14px;"><strong>เวลาสมัคร:</strong> ${new Date(found.timestamp).toLocaleString('th-TH')}</p>
      </div>
      <button class="btn-submit danger" id="statusCancelBtn" style="background:var(--danger);">ยกเลิกการสมัคร (สละสิทธิ์)</button>
    `;
    
    document.getElementById('statusCancelBtn').addEventListener('click', () => {
      showConfirmModal({
        title: 'ยืนยันการสละสิทธิ์',
        message: 'คุณต้องการสละสิทธิ์กิจกรรม '+foundAct.name+' ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้ และที่นั่งจะถูกปล่อยให้เพื่อนคนอื่นทันที',
        confirmText: 'ยืนยันสละสิทธิ์',
        onConfirm: async () => {
           const cancelBtn = document.getElementById('statusCancelBtn');
           cancelBtn.disabled = true;
           cancelBtn.textContent = 'กำลังยกเลิก...';
           
           try {
             const cancelRes = await fetch('/api/cancel', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ activityId: foundAct.id, regId })
             });
             if (cancelRes.ok) {
                fetchCounts();
                statusResult.innerHTML = `
                  <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:20px; text-align:center;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" width="40" height="40" style="margin-bottom:10px;"><path d="M20 6L9 17l-5-5"/></svg>
                    <h4 style="color:#065f46; margin:0 0 5px 0;">ยกเลิกการสมัครเรียบร้อยแล้ว</h4>
                    <p style="color:#047857; margin:0; font-size:14px;">ขอบคุณที่แจ้งสละสิทธิ์เพื่อคืนที่นั่งให้เพื่อนๆ</p>
                  </div>
                `;
             } else {
                throw new Error("Failed");
             }
           } catch(e) {
              statusResult.innerHTML = '<div class="form-msg error show" style="margin:0;">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</div>';
              cancelBtn.disabled = false;
              cancelBtn.textContent = 'ยกเลิกการสมัคร (สละสิทธิ์)';
           }
        }
      });
    });
    
  } catch(e) {
    statusResult.innerHTML = '<div class="form-msg error show" style="margin:0;">เกิดข้อผิดพลาดในการเชื่อมต่อ</div>';
  }
  
  searchBtn.disabled = false;
  searchBtn.textContent = 'ค้นหาข้อมูล';
});

/* =========================================================
   INIT
   ========================================================= */
loadAll().then(() => {
  initRealtimeListener();
});
tickCountdown();
setInterval(tickCountdown, 1000);
