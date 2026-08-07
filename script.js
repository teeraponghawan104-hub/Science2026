/* =========================================================
   Fallback for window.storage if not provided by environment
   ========================================================= */
if (!window.storage) {
  window.storage = {
    get: async (key, local) => {
      const val = localStorage.getItem(key);
      return val ? { value: val } : null;
    },
    set: async (key, value, local) => {
      localStorage.setItem(key, value);
      return true;
    }
  };
}

/* =========================================================
   CONFIG — edit these to adjust the event
   ========================================================= */
const DEADLINE = new Date('2026-08-13T23:59:59+07:00');
const EVENT_DATE_LABEL = '20 สิงหาคม 2569';
const ADMIN_CODE = 'SCI2569'; // change this passcode as needed

// Seat limits are not specified in the source meeting notes,
// so reasonable defaults are set below — adjust maxSeats freely.
const ACTIVITIES = [
  {
    id:'rocket', name:'จรวดขวดน้ำ', mode:'team', unit:'ทีม', maxSeats:20,
    teamMin:2, teamMax:3,
    period:'ช่วงเช้า (10.30–12.00 น.)',
    icon:'rocket',
    details:['ใช้เวลาแข่งขันประมาณ 3 ชั่วโมง','โรงเรียนจัดเตรียมเครื่องยิงจรวดให้ จำนวน 2 เครื่อง'],
    extraFields:[]
  },
  {
    id:'painting', name:'วาดภาพระบายสี', mode:'individual', unit:'คน', maxSeats:60,
    period:'ช่วงเช้า (ใช้เวลา 3 ชั่วโมง)',
    icon:'palette',
    details:['หัวข้อ: "จุดประกายความคิด พัฒนาชีวิตด้วยวิทยาศาสตร์ เสริมสร้างชาติด้วยเทคโนโลยี สู่วิถีแห่งนวัตกรรม"','ใช้กระดาษ 100 ปอนด์ ขนาด F4 (โรงเรียนจัดเตรียมให้)','ห้ามนำโทรศัพท์มือถือเข้าห้องสอบ และห้ามดูภาพต้นแบบทุกชนิด'],
    extraFields:[]
  },
  {
    id:'essay', name:'เขียนเรียงความ', mode:'individual', unit:'คน', maxSeats:60,
    period:'ช่วงเช้า (ใช้เวลา 1 ชั่วโมง)',
    icon:'pencil',
    details:['ใช้หัวข้อเดียวกันกับการแข่งขันวาดภาพระบายสี','โรงเรียนจัดเตรียมกระดาษมีเส้นให้สำหรับผู้เข้าสอบ'],
    extraFields:[]
  },
  {
    id:'quiz', name:'ตอบปัญหาทางวิทยาศาสตร์', mode:'team', unit:'ทีม', maxSeats:20,
    teamMin:3, teamMax:3,
    period:'จัดล่วงหน้าก่อนวันงาน หรือช่วงเช้า',
    icon:'quiz',
    details:['รูปแบบข้อสอบปรนัย ระบบกระดาษ','แข่งขันประเภททีม ทีมละ 3 คน'],
    extraFields:[]
  },
  {
    id:'recycle', name:'ประกวดชุดรีไซเคิล (Recycle)', mode:'individual', unit:'คน', maxSeats:15,
    period:'ช่วงบ่าย (เดินแบบบนเวที)',
    icon:'recycle',
    details:['ธีม: นวัตกรรมแห่งโลกอนาคต พร้อมนวัตกรรม 1 อย่าง เช่น หน้ากากไซเบอร์กรองอากาศ, แว่นตาโฮโลแกรม, กล่องควบคุมสภาพอากาศ','ผู้เข้าแข่งขันต้องนำเสนอและอธิบายแนวคิดของชุดที่ประดิษฐ์ได้'],
    extraFields:[{id:'innovation', label:'นวัตกรรมที่นำเสนอในชุด', placeholder:'เช่น หน้ากากกรองอากาศ, แว่นตาโฮโลแกรม', required:true}]
  },
  {
    id:'show', name:'Science Show', mode:'team', unit:'ทีม', maxSeats:10,
    teamMin:2, teamMax:4,
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
let activitiesState = {}; // id -> array of registrants
let currentActivity = null;

function isPastDeadline(){ return Date.now() > DEADLINE.getTime(); }

async function getRegistrants(id){
  try{
    const res = await window.storage.get('reg:'+id, true);
    return res ? JSON.parse(res.value) : [];
  }catch(e){ return []; }
}
async function saveRegistrants(id, list){
  try{
    const res = await window.storage.set('reg:'+id, JSON.stringify(list), true);
    return !!res;
  }catch(e){ return false; }
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
    const list = activitiesState[act.id] || [];
    const count = list.length;
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
  for(const act of ACTIVITIES){
    activitiesState[act.id] = await getRegistrants(act.id);
  }
  renderActivities();
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

      ${!isTeam ? `
      <div class="field" data-field="room">
        <label for="f_room">ห้อง <span class="req">*</span></label>
        <input type="text" id="f_room" placeholder="เช่น 4/2">
        <div class="error">กรุณากรอกห้อง</div>
      </div>` : `
      <div class="field" data-field="members">
        <label>รายชื่อสมาชิกในทีม <span class="req">*</span></label>
        <div class="member-rows" id="memberRows">${memberRowsHTML}</div>
        <button type="button" class="add-member" id="addMemberBtn" ${act.teamMin>=act.teamMax?'style="display:none"':''}>+ เพิ่มสมาชิก (สูงสุด ${act.teamMax} คน)</button>
        <div class="error">กรุณากรอกชื่อสมาชิกให้ครบ</div>
      </div>`}

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

  if(!isTeam){
    const roomField = document.querySelector('[data-field="room"]');
    data.room = document.getElementById('f_room').value.trim();
    const ok = !!data.room;
    setFieldError(roomField, !ok); if(!ok) valid=false;
  } else {
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

  const latest = await getRegistrants(act.id);
  if(latest.length >= act.maxSeats){
    msgEl.className='form-msg full show';
    msgEl.textContent='ขออภัย ที่นั่งกิจกรรมนี้เต็มแล้ว';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
    activitiesState[act.id] = latest;
    renderActivities();
    return;
  }

  const entry = {
    id: act.id.slice(0,3).toUpperCase()+'-'+Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    ...data
  };
  latest.push(entry);
  const saved = await saveRegistrants(act.id, latest);

  if(!saved){
    msgEl.className='form-msg error show';
    msgEl.textContent='บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
    submitBtn.disabled=false; submitBtn.textContent='ยืนยันการลงทะเบียน';
    return;
  }

  activitiesState[act.id] = latest;
  renderActivities();
  showSuccess(entry, act);
}

function showSuccess(entry, act){
  regBody.innerHTML = `
    <div class="success-view">
      <div class="success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg></div>
      <h3>ลงทะเบียนสำเร็จ</h3>
      <p>${act.name} · ${entry.teamName || entry.fullName}</p>
      <p>กรุณาจดรหัสการสมัครไว้เป็นหลักฐาน</p>
      <div class="success-code">${entry.id}</div>
      <br>
      <button class="btn-secondary" id="successCloseBtn">เสร็จสิ้น</button>
    </div>
  `;
  document.getElementById('successCloseBtn').addEventListener('click', closeRegModal);
  showToast('ลงทะเบียน '+act.name+' สำเร็จ');
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
let adminUnlocked = false;
let adminActiveTab = ACTIVITIES[0].id;

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
  document.getElementById('adminUnlockBtn').addEventListener('click', ()=>{
    const val = document.getElementById('adminPassInput').value;
    if(val===ADMIN_CODE){ adminUnlocked=true; renderAdminPanel(); }
    else{ document.getElementById('adminPassErr').style.display='block'; }
  });
  document.getElementById('adminPassInput').addEventListener('keydown', (e)=>{
    if(e.key==='Enter') document.getElementById('adminUnlockBtn').click();
  });
}

function csvEscape(v){ if(v==null) return ''; const s=String(v).replace(/"/g,'""'); return `"${s}"`; }

function exportCSV(actId){
  const act = ACTIVITIES.find(a=>a.id===actId);
  const list = activitiesState[actId] || [];
  const cols = act.mode==='team'
    ? ['id','teamName','grade','members','phone', ...act.extraFields.map(f=>f.id), 'timestamp']
    : ['id','fullName','grade','room','phone', ...act.extraFields.map(f=>f.id), 'timestamp'];
  const rows = [cols.join(',')];
  list.forEach(r=>{
    rows.push(cols.map(c=>{
      let v = r[c];
      if(c==='members' && Array.isArray(v)) v = v.join(' / ');
      return csvEscape(v);
    }).join(','));
  });
  const blob = new Blob(['\\uFEFF'+rows.join('\\n')], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = act.id+'-registrants.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function resetActivity(actId){
  if(!confirm('ยืนยันการล้างรายชื่อผู้สมัครทั้งหมดของกิจกรรมนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) return;
  await saveRegistrants(actId, []);
  activitiesState[actId] = [];
  renderActivities();
  renderAdminPanel();
}

function renderAdminPanel(){
  const act = ACTIVITIES.find(a=>a.id===adminActiveTab);
  const list = activitiesState[act.id] || [];
  const isTeam = act.mode==='team';

  adminBody.innerHTML = `
    <p class="modal-eyebrow">แผงควบคุมสำหรับเจ้าหน้าที่</p>
    <h3>รายชื่อผู้สมัคร</h3>
    <div class="admin-tabs">
      ${ACTIVITIES.map(a=>`<button class="admin-tab ${a.id===adminActiveTab?'active':''}" data-tab="${a.id}">${a.name}</button>`).join('')}
    </div>
    <div class="admin-toolbar">
      <span class="count">สมัครแล้ว <strong>${list.length}</strong> / ${act.maxSeats} ${act.unit}</span>
      <div class="admin-btns">
        <button class="btn-tiny" id="exportBtn">ส่งออก CSV</button>
        <button class="btn-tiny danger" id="resetBtn">ล้างรายชื่อ</button>
      </div>
    </div>
    <div class="admin-table-wrap">
      ${list.length===0 ? '<div class="admin-empty">ยังไม่มีผู้สมัครในกิจกรรมนี้</div>' : `
      <table>
        <thead><tr>
          <th>รหัส</th>
          <th>${isTeam?'ชื่อทีม':'ชื่อ-นามสกุล'}</th>
          <th>ระดับชั้น</th>
          <th>${isTeam?'สมาชิก':'ห้อง'}</th>
          <th>โทรศัพท์</th>
          ${act.extraFields.map(f=>`<th>${f.label}</th>`).join('')}
          <th>เวลาสมัคร</th>
        </tr></thead>
        <tbody>
          ${list.map(r=>`<tr>
            <td>${r.id}</td>
            <td>${isTeam? r.teamName : r.fullName}</td>
            <td>${r.grade||''}</td>
            <td>${isTeam? (r.members||[]).join(', ') : (r.room||'')}</td>
            <td>${r.phone||''}</td>
            ${act.extraFields.map(f=>`<td>${r[f.id]||''}</td>`).join('')}
            <td>${new Date(r.timestamp).toLocaleString('th-TH')}</td>
          </tr>`).join('')}
        </tbody>
      </table>`}
    </div>
  `;

  adminBody.querySelectorAll('[data-tab]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ adminActiveTab = btn.getAttribute('data-tab'); renderAdminPanel(); });
  });
  document.getElementById('exportBtn').addEventListener('click', ()=>exportCSV(act.id));
  document.getElementById('resetBtn').addEventListener('click', ()=>resetActivity(act.id));
}

/* =========================================================
   INIT
   ========================================================= */
loadAll();
tickCountdown();
setInterval(tickCountdown, 1000);
