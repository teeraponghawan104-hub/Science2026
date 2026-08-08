/* =========================================================
   CONFIG NOTE (for teachers editing this file):
   - Deadline / event date: see DEADLINE / EVENT_DATE constants
   - Admin passcode: see ADMIN_CODE constant
   ========================================================= */

:root{
  --bg: #0a0e26;
  --bg-2: #0d123099;
  --surface: #141a3f;
  --surface-2: #1b2350;
  --surface-3: #232c63;
  --border: rgba(232,236,245,0.09);
  --border-strong: rgba(232,236,245,0.18);
  --gold: #f2b705;
  --gold-dim: #c99a1f;
  --gold-soft: rgba(242,183,5,0.14);
  --teal: #33c9b0;
  --teal-soft: rgba(51,201,176,0.14);
  --text: #edeff7;
  --text-dim: #a9b0ce;
  --text-mute: #6e76a0;
  --danger: #ff6b6b;
  --danger-soft: rgba(255,107,107,0.14);
  --radius-lg: 22px;
  --radius: 16px;
  --radius-sm: 10px;
  --font-display: 'Chakra Petch', system-ui, -apple-system, sans-serif;
  --font-body: 'IBM Plex Sans Thai', system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  --shadow-lift: 0 20px 60px -20px rgba(0,0,0,0.6);
}

*{box-sizing:border-box; margin:0; padding:0;}
html{scroll-behavior:smooth;}
body{
  background:
    radial-gradient(ellipse 1200px 600px at 50% -10%, #182154 0%, transparent 60%),
    var(--bg);
  color:var(--text);
  font-family:var(--font-body);
  font-weight:400;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
img,svg{display:block;}
button{font-family:inherit; cursor:pointer;}
a{color:inherit;}
h1,h2,h3{font-family:var(--font-display); font-weight:600; letter-spacing:0.01em;}

.container{max-width:1120px; margin:0 auto; padding:0 24px;}

:focus-visible{outline:2px solid var(--teal); outline-offset:3px; border-radius:4px;}

/* ---------- NAV ---------- */
.nav{
  position:-webkit-sticky; position:sticky; top:0; z-index:40;
  background:rgba(10,14,38,0.95);
  border-bottom:1px solid var(--border);
}
@supports (backdrop-filter: blur(14px)) {
  .nav { background:rgba(10,14,38,0.72); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
}
.nav-inner{
  max-width:1120px; margin:0 auto; padding:14px 24px;
  display:flex; align-items:center; justify-content:space-between; gap:16px;
}
.nav-brand{display:flex; align-items:center; gap:10px;}
.nav-brand .mark{width:30px; height:30px; flex:none; object-fit:contain;}
.nav-brand .label{font-family:var(--font-display); font-size:14px; letter-spacing:0.04em; color:var(--text-dim);}
.nav-brand .label strong{color:var(--text); font-weight:600;}
.nav-cta{
  font-family:var(--font-display); font-size:13.5px; font-weight:600; letter-spacing:0.03em;
  color:var(--bg); background:var(--gold); padding:10px 20px; min-height:44px; border-radius:100px; border:none;
  text-decoration:none; white-space:nowrap; display:inline-flex; align-items:center; justify-content:center;
}
.nav-cta:hover{background:#ffce2e;}

/* ---------- HERO ---------- */
.hero{
  position:relative; overflow:hidden;
  padding:88px 24px 64px;
  display:flex; flex-direction:column; align-items:center; text-align:center;
}
.hero-logo-wrap{
  width: 220px;
  height: 220px;
  margin-bottom: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-logo-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(51, 201, 176, 0.25));
}

.eyebrow{
  font-family:var(--font-display); font-size:13px; letter-spacing:0.14em; text-transform:uppercase;
  color:var(--teal); margin-bottom:14px;
}
.hero h1{
  font-size:32px; font-size:clamp(32px, 5.4vw, 56px); line-height:1.12; color:var(--text); max-width:760px;
}
.hero h1 .accent{color:var(--gold);}
.hero .quote{
  margin-top:22px; max-width:600px; color:var(--text-dim); font-size:15.5px; line-height:1.75; font-style:normal;
}
.hero-meta{
  margin-top:30px; display:flex; flex-wrap:wrap; gap:14px; justify-content:center;
}
.meta-pill{
  display:flex; align-items:center; gap:8px;
  background:var(--surface); border:1px solid var(--border); border-radius:100px;
  padding:9px 16px 9px 12px; font-size:13.5px; color:var(--text-dim);
}
.meta-pill strong{color:var(--text); font-weight:600;}
.meta-pill svg{width:16px; height:16px; color:var(--gold); flex:none;}

.countdown{
  margin-top:34px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center;
}
.countdown .unit{
  background:var(--surface); border:1px solid var(--border-strong); border-radius:var(--radius-sm);
  padding:12px 16px; min-width:74px; text-align:center;
}
.countdown .unit .num{font-family:var(--font-mono); font-size:24px; font-weight:600; color:var(--gold);}
.countdown .unit .lbl{font-size:11px; color:var(--text-mute); margin-top:2px; letter-spacing:0.04em;}
.countdown-label{width:100%; font-size:12.5px; color:var(--text-mute); margin-bottom:2px; letter-spacing:0.03em;}

.hero-actions{margin-top:36px;}
.btn-primary{
  font-family:var(--font-display); font-weight:600; font-size:15px; letter-spacing:0.02em;
  background:var(--gold); color:var(--bg); border:none; padding:15px 32px; border-radius:100px;
  text-decoration:none; display:inline-flex; align-items:center; gap:8px;
  transition:transform .15s ease, background .15s ease;
}
.btn-primary:hover{background:#ffce2e; transform:translateY(-1px);}

.closed-banner{
  display:none; margin-top:26px; padding:12px 20px; border-radius:100px;
  background:var(--danger-soft); border:1px solid rgba(255,107,107,0.35); color:#ffb3b3;
  font-size:13.5px; font-weight:500;
}
body.past-deadline .closed-banner{display:inline-flex; align-items:center; gap:8px;}

/* ---------- SECTION HEADERS ---------- */
.section{padding:70px 0;}
.section-head{max-width:640px; margin:0 auto 44px; text-align:center;}
.section-head .eyebrow{margin-bottom:12px;}
.section-head h2{font-size:24px; font-size:clamp(24px,3.4vw,32px); color:var(--text);}
.section-head p{color:var(--text-dim); font-size:14.5px; margin-top:12px; line-height:1.7;}

/* ---------- ACTIVITY GRID ---------- */
.grid{
  display:grid; grid-template-columns:repeat(auto-fit, minmax(310px,1fr)); gap:20px;
}
.card{
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:26px; display:flex; flex-direction:column; gap:16px;
  transition:border-color .15s ease, transform .15s ease;
}
.card:hover{border-color:var(--border-strong); transform:translateY(-2px);}
.card-top{display:flex; align-items:flex-start; justify-content:space-between; gap:12px;}
.card-icon{
  width:46px; height:46px; border-radius:13px; flex:none;
  background:var(--gold-soft); display:flex; align-items:center; justify-content:center;
}
.card-icon svg{width:24px; height:24px; color:var(--gold);}
.card[data-mode="team"] .card-icon{background:var(--teal-soft);}
.card[data-mode="team"] .card-icon svg{color:var(--teal);}

.gauge-wrap{position:relative; width:58px; height:58px; flex:none;}
.gauge-ring{width:100%; height:100%; border-radius:50%;
  background:var(--ring-color,var(--gold));
  background:conic-gradient(var(--ring-color,var(--gold)) calc(var(--pct,0)*1%), rgba(255,255,255,0.07) 0);
}
.gauge-hole{
  position:absolute; inset:7px; border-radius:50%; background:var(--surface);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
}
.gauge-hole .n{font-family:var(--font-mono); font-size:12px; font-weight:600; color:var(--text);}
.gauge-hole .d{font-family:var(--font-mono); font-size:8px; color:var(--text-mute); margin-top:-1px;}

.card h3{font-size:19px; color:var(--text); line-height:1.3;}
.card-tags{display:flex; flex-wrap:wrap; gap:8px;}
.tag{
  font-size:11.5px; padding:5px 11px; border-radius:100px; border:1px solid var(--border-strong);
  color:var(--text-dim); font-weight:500; letter-spacing:0.02em;
}
.tag.status-open{color:var(--teal); border-color:rgba(51,201,176,0.35); background:var(--teal-soft);}
.tag.status-low{color:var(--gold); border-color:rgba(242,183,5,0.35); background:var(--gold-soft);}
.tag.status-full{color:var(--danger); border-color:rgba(255,107,107,0.35); background:var(--danger-soft);}

.card-details{list-style:none; display:flex; flex-direction:column; gap:7px;}
.card-details li{font-size:13.2px; color:var(--text-dim); padding-left:16px; position:relative; line-height:1.6;}
.card-details li::before{content:"·"; position:absolute; left:2px; color:var(--gold); font-weight:700;}

.card-footer{margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:10px; padding-top:6px;}
.seats-left{font-size:12.5px; color:var(--text-mute);}
.seats-left strong{color:var(--text); font-family:var(--font-mono);}

.btn-card{
  font-family:var(--font-display); font-weight:600; font-size:13.5px; letter-spacing:0.02em;
  background:var(--gold); color:var(--bg); border:none; padding:12px 20px; min-height:44px; border-radius:100px;
  transition:background .15s ease; display:inline-flex; align-items:center; justify-content:center;
}
.btn-card:hover:not(:disabled){background:#ffce2e;}
.btn-card:disabled{background:var(--surface-3); color:var(--text-mute); cursor:not-allowed;}

/* ---------- NOTES SECTION ---------- */
.notes{
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:32px; display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:26px;
}
.note-item{display:flex; gap:14px;}
.note-item svg{width:20px; height:20px; color:var(--teal); flex:none; margin-top:2px;}
.note-item h4{font-family:var(--font-body); font-weight:600; font-size:14.5px; color:var(--text); margin-bottom:5px;}
.note-item p{font-size:13px; color:var(--text-dim); line-height:1.65;}

/* ---------- FOOTER ---------- */
.footer{border-top:1px solid var(--border); padding:36px 0; margin-top:20px;}
.footer-inner{display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:14px;}
.footer p{font-size:12.5px; color:var(--text-mute);}
.admin-link{
  font-size:13px; color:var(--text-mute); background:none; border:1px solid var(--border-strong);
  padding:12px 20px; min-height:44px; border-radius:100px; display:inline-flex; align-items:center; justify-content:center;
}
.admin-link:hover{color:var(--text-dim); border-color:var(--border);}

/* ---------- MODAL ---------- */
.overlay{
  position:fixed; inset:0; background:rgba(6,8,22,0.9);
  display:none; align-items:flex-start; justify-content:center; z-index:100; padding:24px 16px;
  overflow-y:auto; -webkit-overflow-scrolling:touch;
}
@supports (backdrop-filter: blur(4px)) {
  .overlay { background:rgba(6,8,22,0.72); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); }
}
.overlay.open{display:flex;}
.modal{
  background:var(--surface); border:1px solid var(--border-strong); border-radius:var(--radius-lg);
  width:100%; max-width:520px; padding:30px; box-shadow:var(--shadow-lift); position:relative;
  animation:modalIn .22s ease; margin:0 auto;
}
@keyframes modalIn{ from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }
.modal-close{
  position:absolute; top:14px; right:14px; background:none; border:none; color:var(--text-mute);
  width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center;
}
.modal-close:hover{background:var(--surface-2); color:var(--text);}
.modal-eyebrow{font-family:var(--font-display); font-size:12px; letter-spacing:0.1em; color:var(--teal); text-transform:uppercase; margin-bottom:8px;}
.modal h3{font-size:21px; margin-bottom:6px; padding-right:30px;}
.modal-sub{font-size:13px; color:var(--text-dim); margin-bottom:22px;}

.field{margin-bottom:16px;}
.field label{display:block; font-size:13px; font-weight:500; color:var(--text-dim); margin-bottom:7px;}
.field .req{color:var(--danger);}
.field input, .field select{
  width:100%; background:var(--bg); border:1px solid var(--border-strong); color:var(--text);
  border-radius:var(--radius-sm); padding:13px 14px; font-family:var(--font-body); font-size:16px;
  min-height:44px; appearance:none; -webkit-appearance:none;
}
.field select {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23a9b0ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 40px;
}
.field input:focus, .field select:focus{border-color:var(--teal); outline:none;}
.field .hint{font-size:11.5px; color:var(--text-mute); margin-top:6px;}
.field .error{font-size:12px; color:var(--danger); margin-top:6px; display:none;}
.field.has-error input, .field.has-error select{border-color:var(--danger);}
.field.has-error .error{display:block;}

.member-rows{display:flex; flex-direction:column; gap:9px;}
.member-row{display:flex; gap:8px; align-items:center;}
.member-row input{flex:1;}
.member-row .rm{
  flex:none; width:44px; height:44px; border-radius:8px; border:1px solid var(--border-strong);
  background:none; color:var(--text-mute); display:flex; align-items:center; justify-content:center;
}
.add-member{
  margin-top:10px; font-size:13px; color:var(--teal); background:none; border:1px dashed rgba(51,201,176,0.4);
  border-radius:var(--radius-sm); padding:12px 14px; min-height:44px; width:100%; text-align:center;
  display:flex; align-items:center; justify-content:center;
}
.add-member:disabled{opacity:0.4; cursor:not-allowed;}

.form-msg{font-size:13px; padding:11px 14px; border-radius:var(--radius-sm); margin-bottom:16px; display:none;}
.form-msg.show{display:block;}
.form-msg.error{background:var(--danger-soft); color:#ffb3b3;}
.form-msg.full{background:var(--danger-soft); color:#ffb3b3;}

.btn-submit{
  width:100%; font-family:var(--font-display); font-weight:600; font-size:14.5px;
  background:var(--gold); color:var(--bg); border:none; padding:14px; border-radius:100px; margin-top:6px;
}
.btn-submit:hover:not(:disabled){background:#ffce2e;}
.btn-submit:disabled{background:var(--surface-3); color:var(--text-mute);}

.success-view{text-align:center; padding:10px 0 4px;}
.success-icon{width:60px; height:60px; border-radius:50%; background:var(--teal-soft); margin:0 auto 18px; display:flex; align-items:center; justify-content:center;}
.success-icon svg{width:28px; height:28px; color:var(--teal);}
.success-view h3{margin-bottom:8px;}
.success-view p{font-size:13.5px; color:var(--text-dim); margin-bottom:4px;}
.success-code{font-family:var(--font-mono); font-size:13px; color:var(--gold); background:var(--gold-soft); padding:8px 14px; border-radius:var(--radius-sm); display:inline-block; margin-top:12px;}
.btn-secondary{
  margin-top:22px; font-family:var(--font-display); font-weight:600; font-size:13.5px;
  background:none; border:1px solid var(--border-strong); color:var(--text-dim); padding:11px 22px; border-radius:100px;
}

/* ---------- ADMIN ---------- */
.admin-modal{max-width:760px;}
.admin-pass{display:flex; flex-direction:column; align-items:center; text-align:center; padding:12px 0;}
.admin-pass svg{width:34px; height:34px; color:var(--gold); margin-bottom:14px;}
.admin-tabs{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px;}
.admin-tab{
  font-size:13px; padding:10px 16px; min-height:44px; border-radius:100px; border:1px solid var(--border-strong);
  background:none; color:var(--text-dim); display:inline-flex; align-items:center; justify-content:center;
}
.admin-tab.active{background:var(--gold); color:var(--bg); border-color:var(--gold); font-weight:600;}
.admin-toolbar{display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; gap:10px; flex-wrap:wrap;}
.admin-toolbar .count{font-size:12.5px; color:var(--text-dim);}
.admin-toolbar .count strong{color:var(--text); font-family:var(--font-mono);}
.admin-btns{display:flex; gap:8px;}
.btn-tiny{font-size:12px; padding:10px 14px; min-height:44px; border-radius:100px; border:1px solid var(--border-strong); background:none; color:var(--text-dim); display:inline-flex; align-items:center; justify-content:center;}
.btn-tiny:hover{color:var(--text);}
.btn-tiny.danger{color:var(--danger); border-color:rgba(255,107,107,0.35);}
.btn-del-item{
  font-size:11.5px; padding:4px 10px; border-radius:100px;
  border:1px solid rgba(255,107,107,0.4); background:rgba(255,107,107,0.12);
  color:var(--danger); cursor:pointer; font-family:var(--font-body);
  display:inline-flex; align-items:center; justify-content:center;
  transition:all 0.15s ease; white-space:nowrap;
}
.btn-del-item:hover{
  background:var(--danger); color:#fff; border-color:var(--danger);
}
.admin-table-wrap{max-height:340px; overflow-y:auto; overflow-x:auto; -webkit-overflow-scrolling:touch; border:1px solid var(--border); border-radius:var(--radius-sm); max-width:100%;}
table{width:100%; border-collapse:collapse; font-size:12.5px;}
th{text-align:left; padding:10px 12px; color:var(--text-mute); font-weight:500; background:var(--surface-2); position:-webkit-sticky; position:sticky; top:0; white-space:nowrap; z-index:1;}
td{padding:10px 12px; border-top:1px solid var(--border); color:var(--text-dim); white-space:nowrap;}
.admin-empty{padding:30px; text-align:center; color:var(--text-mute); font-size:13px;}

/* ---------- TOAST ---------- */
.toast{
  position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
  background:var(--surface-2); border:1px solid var(--border-strong); color:var(--text);
  padding:14px 22px; border-radius:100px; font-size:13.5px; display:flex; align-items:center; gap:10px;
  box-shadow:var(--shadow-lift); z-index:200; opacity:0; pointer-events:none; transition:all .25s ease;
}
.toast.show{opacity:1; transform:translateX(-50%) translateY(0);}
.toast svg{width:17px; height:17px; color:var(--teal); flex:none;}

/* ---------- RESPONSIVE ---------- */
/* Minimum touch targets */
button, a.nav-cta, input, select {
  min-height: 44px;
}
.btn-del-item {
  min-height: 44px;
  padding: 8px 12px;
}

/* Background image scaling */
body {
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
}

/* 1. Mobile (320px - 480px) */
@media (max-width: 480px) {
  html { font-size: 14px; }
  .container { padding: 0 1.2rem; }
  .nav-inner { 
    flex-direction: column; 
    padding: 0.8rem 1.2rem; 
    gap: 0.8rem; 
    text-align: center; 
  }
  .nav-brand { flex-direction: column; gap: 0.4rem; }
  .nav-brand .label { font-size: 0.9rem; line-height: 1.4; white-space: normal; }
  
  .hero { padding: 4rem 1.2rem 3rem; }
  .hero-logo-wrap { width: 140px; height: 140px; margin-bottom: 2rem; }
  .hero h1 { font-size: 2.2rem; line-height: 1.2; }
  .hero .quote { font-size: 1rem; }
  
  .countdown { gap: 0.5rem; }
  .countdown .unit { min-width: 60px; padding: 0.6rem; }
  .countdown .unit .num { font-size: 1.6rem; }
  
  .section { padding: 3rem 0; }
  .section-head h2 { font-size: 1.8rem; }
  .section-head p { font-size: 1rem; }
  
  .grid { grid-template-columns: 1fr; gap: 1rem; }
  .card { padding: 1.5rem; }
  
  .notes { padding: 1.5rem; grid-template-columns: 1fr; gap: 1.5rem; }
  
  .modal { padding: 1.5rem; border-radius: var(--radius); }
  .modal h3 { font-size: 1.5rem; }
  .modal-sub { font-size: 0.95rem; }
  
  .admin-toolbar { flex-direction: column; align-items: stretch; gap: 0.8rem; }
  .admin-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .btn-tiny { width: 100%; }
}

/* 2. Tablet (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  html { font-size: 15px; }
  .container { padding: 0 1.5rem; }
  .nav-inner { padding: 1rem 1.5rem; flex-wrap: wrap; justify-content: center; gap: 1rem; }
  .hero { padding: 5rem 1.5rem 4rem; }
  .hero-logo-wrap { width: 180px; height: 180px; }
  
  .grid { grid-template-columns: repeat(2, 1fr); }
  .notes { grid-template-columns: repeat(2, 1fr); }
}

/* 3. Small Laptop (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  html { font-size: 16px; }
  .container { padding: 0 2rem; }
  .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
}

/* 4. Desktop (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
  html { font-size: 16px; }
}

/* 5. Large Screen (1441px+) */
@media (min-width: 1441px) {
  html { font-size: 18px; }
  .container { max-width: 1400px; }
  .hero { padding: 7rem 2rem 5rem; }
  .hero h1 { font-size: 4rem; }
  .grid { grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; }
}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto;}
}





      ดูรายการแข่งขันทั้งหมด
    ขณะนี้ปิดรับสมัครแล้ว








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
    extraFields:[{id:'costumeName', label:'ชื่อชุด', placeholder:'ระบุชื่อชุด', required:true}, {id:'innovation', label:'นวัตกรรมที่นำเสนอในชุด', placeholder:'เช่น หน้ากากกรองอากาศ, แว่นตาโฮโลแกรม', required:true}]
  },
  {
    id:'show', name:'Science Show', mode:'team', unit:'ทีม', maxSeats:12,
    teamMin:3, teamMax:5,
    period:'ช่วงบ่าย',
    icon:'flask',
    details:['นำเสนอได้ 1 การทดลองต่อทีม','จำกัดเวลาการแสดงไม่เกิน 10 นาทีต่อทีม'],
    extraFields:[{id:'showName', label:'ชื่อชุดการแสดง', placeholder:'ระบุชื่อชุดการแสดง', required:true}, {id:'experiment', label:'ชื่อการทดลองที่นำเสนอ', placeholder:'เช่น ภูเขาไฟจำลอง', required:true}]
  }
];

const ICONS = {
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
    }
  } catch(e) {
    console.error(e);
  } finally {
    renderActivities();
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

  // Admin polling every 3 seconds
  setInterval(async () => {
    const adminOverlay = document.getElementById('adminOverlay');
    if (adminUnlocked && adminOverlay && adminOverlay.classList.contains('open')) {
      try {
        const res = await fetch('/api/admin/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: adminPasscode, activityId: 'all' })
        });
        if (res.ok) {
           const data = await res.json();
           adminLists = data.allData;
           
           // Preserve focus for search input
           const activeEl = document.activeElement;
           const isSearchFocused = activeEl && activeEl.id === 'adminSearchInput';
           const searchInput = document.getElementById('adminSearchInput');
           const selectionStart = searchInput ? searchInput.selectionStart : null;
           
           renderAdminPanel();
           
           if (isSearchFocused) {
             const newSearchInput = document.getElementById('adminSearchInput');
             if (newSearchInput) {
               newSearchInput.focus();
               if (selectionStart !== null) {
                 newSearchInput.setSelectionRange(selectionStart, selectionStart);
               }
             }
           }
        }
      } catch (e) {
        console.error('Admin auto-refresh error', e);
      }
    }
  }, 3000);
}

/* =========================================================
   COUNTDOWN
   ========================================================= */
function tickCountdown(){
  const diff = DEADLINE.getTime() - Date.now();
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
    }
  }
  regBody.innerHTML = `
      ${isTeam ? `



      ${isTeam ? `


      ${act.extraFields.map(fieldHTML).join('')}

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
  canvas.height = 920;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Ticket shadow
  ctx.shadowColor = 'rgba(0,0,0,0.1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  
  // Ticket shape
  ctx.fillStyle = '#ffffff';
  if(ctx.roundRect) {
    ctx.roundRect(30, 30, 540, 850, 20);
  } else {
    ctx.fillRect(30, 30, 540, 850);
  }
  ctx.fill();

  ctx.shadowColor = 'transparent';
  
  // Header
  ctx.fillStyle = '#0a0e26';
  ctx.beginPath();
  if(ctx.roundRect) {
    ctx.roundRect(30, 30, 540, 140, [20, 20, 0, 0]);
  } else {
    ctx.fillRect(30, 30, 540, 140);
  }
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(30, 170, 540, 5);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Woraluck Science Fair 2026', canvas.width/2, 90);
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('บัตรยืนยันการสมัคร / Confirmation Slip', canvas.width/2, 130);
  
  ctx.textAlign = 'left';
  let y = 230;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('กิจกรรม (Activity)', 70, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(actName, 70, y);
  
  y += 60;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('ผู้สมัคร (Participant)', 70, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(pName, 70, y);
  
  y += 60;
  ctx.fillStyle = '#64748b';
  ctx.font = '18px sans-serif';
  ctx.fillText('เวลา (Period)', 70, y);
  y += 35;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(period, 70, y);
  
  y += 60;
  
  // Dash line
  ctx.beginPath();
  ctx.setLineDash([8, 8]);
  ctx.moveTo(45, y);
  ctx.lineTo(555, y);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
  
  // semi-circles for the ticket cut
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(30, y, 15, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(570, y, 15, 0, Math.PI*2);
  ctx.fill();
  
  y += 50;
  // Ref No
  ctx.fillStyle = '#f1f5f9';
  if(ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(70, y, 460, 100, 12);
    ctx.fill();
  } else {
    ctx.fillRect(70, y, 460, 100);
  }
  
  ctx.fillStyle = '#64748b';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('รหัสอ้างอิง (Ref No.)', canvas.width/2, y + 40);
  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(regId, canvas.width/2, y + 80);
  
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    ctx.drawImage(img, canvas.width/2 - 80, y + 130, 160, 160);
    triggerDownload();
  };
  img.onerror = () => {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(canvas.width/2 - 80, y + 130, 160, 160);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText('No QR preview', canvas.width/2, y + 205);
    triggerDownload();
  }
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${regId}&margin=1`;
  
  function triggerDownload(){
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Ticket_${regId}.png`;
      a.click();
    } catch(e) {
      ctx.clearRect(canvas.width/2 - 80, y + 130, 160, 160);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(canvas.width/2 - 80, y + 130, 160, 160);
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



function printRegistrants(actId) {
  try {
    const act = ACTIVITIES.find(a=>a.id===actId);
    if (!act) return;
    const rawList = adminLists[actId] || [];
    const list = typeof sortRegistrants === 'function' ? sortRegistrants(rawList, adminSortBy) : rawList;
    const isTeam = act.mode === 'team';
    
    
    if (list.length === 0) {
    } else {
      list.forEach(r => {
        let timeStr = '';
        try { timeStr = new Date(r.timestamp).toLocaleString('th-TH'); } catch(e){}
        let membersStr = '';
        if (isTeam && Array.isArray(r.members)) membersStr = r.members.join(', ');
        
      });
    }
    
    const printSection = document.getElementById('printSection');
    if (printSection) {
      printSection.innerHTML = html;
      // Use setTimeout to allow DOM to update before printing, essential for iOS Safari
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
    console.error("Error generating print view:", e);
    alert("เกิดข้อผิดพลาดในการสร้างหน้าพิมพ์");
  }
}
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

function showConfirmModal({ title, message, confirmText = 'ยืนยัน', requirePin = false, onConfirm }) {
  let confirmOverlay = document.getElementById('confirmOverlay');
  if(!confirmOverlay) {
    confirmOverlay = document.createElement('div');
    confirmOverlay.id = 'confirmOverlay';
    confirmOverlay.className = 'overlay';
    confirmOverlay.style.zIndex = '1000';
    document.body.appendChild(confirmOverlay);
  }
  
  let pinHtml = '';
  if (requirePin) {
    pinHtml = `
    `;
  }
  
  confirmOverlay.innerHTML = `
      ${pinHtml}
  `;
  confirmOverlay.classList.add('open');

  const close = () => {
    confirmOverlay.classList.remove('open');
  };

  document.getElementById('confirmCancelBtn').onclick = close;
  document.getElementById('confirmOkBtn').onclick = async () => {
    if (requirePin) {
      const pinVal = document.getElementById('confirmPinInput').value;
      if (pinVal !== requirePin) {
        document.getElementById('confirmPinError').style.display = 'block';
        return;
      }
    }
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
    requirePin: '112003',
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
    requirePin: '112003',
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
}

function renderAdminPanel(){

  if (adminActiveTab === 'dashboard') {
     let dashboardCards = ACTIVITIES.map(act => {
        const count = adminLists[act.id] ? adminLists[act.id].length : 0;
        const pct = Math.min(100, Math.round((count / act.maxSeats) * 100));
        let color = '#10b981'; // Green
        if (pct >= 100) color = '#ef4444'; // Red
        else if (pct >= 80) color = '#f59e0b'; // Orange
        
        return `
        `;
     }).join('');

     // Find most popular
     let sortedActs = [...ACTIVITIES].map(act => ({...act, count: adminLists[act.id]?.length || 0}));
     sortedActs.sort((a,b) => b.count - a.count);
     let popularAct = sortedActs[0];

     // Calculate room statistics
     let roomStats = {};
     Object.entries(adminLists).forEach(([actId, list]) => {
       list.forEach(r => {
         const grade = (r.grade || 'ไม่ระบุ').trim();
         const roomNum = (r.room || '-').trim();
         let fullRoom = 'ไม่ระบุ';
         if (grade !== 'ไม่ระบุ') {
           const gNum = grade.replace('ม.', '');
           if (roomNum.includes('/')) {
             fullRoom = roomNum.startsWith('ม.') ? roomNum : 'ม.' + roomNum;
           } else {
             fullRoom = 'ม.' + gNum + '/' + roomNum;
           }
         }
         const isTeamAct = ACTIVITIES.find(a => a.id === actId)?.mode === 'team';
         const increment = (isTeamAct && Array.isArray(r.members)) ? Math.max(1, r.members.length) : 1;
         
         if (!roomStats[fullRoom]) roomStats[fullRoom] = { total: 0, activities: {} };
         roomStats[fullRoom].total += increment;
         
         if (!roomStats[fullRoom].activities[actId]) {
           roomStats[fullRoom].activities[actId] = { count: 0, items: [] };
         }
         roomStats[fullRoom].activities[actId].count += increment;
         
         if (isTeamAct) {
           const teamMembers = Array.isArray(r.members) && r.members.length > 0 ? r.members.join(', ') : 'ไม่มีข้อมูลสมาชิก';
           roomStats[fullRoom].activities[actId].items.push(`ทีม: ${r.teamName || '-'} (${teamMembers})`);
         } else {
           roomStats[fullRoom].activities[actId].items.push(r.fullName || '-');
         }
       });
     });
     let roomStatsArr = Object.keys(roomStats).map(room => ({ room, total: roomStats[room].total, activities: roomStats[room].activities }));
     roomStatsArr.sort((a,b) => b.total - a.total);
     let roomCardsHTML = roomStatsArr.length > 0 
       ? roomStatsArr.map(r => `
              ${Object.entries(r.activities).map(([actId, data]) => {
                 const actName = ACTIVITIES.find(a => a.id === actId)?.name || actId;
              }).join('')}
         `).join('')

     adminBody.innerHTML = `
        ${tabsHTML}
      

        ${roomCardsHTML}
      
        ${dashboardCards}
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
        ${tabsHTML}
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
    if (printBtn) printBtn.addEventListener('click', ()=>printRegistrants(act.id));
    
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
  
  try {
    const res = await fetch(`/api/status/${regId}`);
    if (!res.ok) {
       searchBtn.disabled = false;
       searchBtn.textContent = 'ค้นหาข้อมูล';
       return;
    }
    
    const data = await res.json();
    const found = data.found;
    const foundAct = ACTIVITIES.find(a => a.id === data.foundActId);
    
    if(!found){
      searchBtn.disabled = false;
      searchBtn.textContent = 'ค้นหาข้อมูล';
      return;
    }
    
    statusResult.innerHTML = `
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
                `;
             } else {
                throw new Error("Failed");
             }
           } catch(e) {
              cancelBtn.disabled = false;
              cancelBtn.textContent = 'ยกเลิกการสมัคร (สละสิทธิ์)';
           }
        }
      });
    });
    
  } catch(e) {
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
