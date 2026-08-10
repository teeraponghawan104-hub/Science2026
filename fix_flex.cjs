const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Initial Member Rows
const memberRowsTarget = `<div class="member-row" style="display:flex; gap:10px; margin-bottom:10px;">
        <select class="member-title" style="flex:0 0 100px; margin:0;" required>`;
const memberRowsReplacement = `<div class="member-row" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
        <select class="member-title" style="flex:1 1 100px; margin:0; min-width:100px; max-width: 140px;" required>`;
html = html.replace(memberRowsTarget, memberRowsReplacement);

const memberInputsTarget = `<input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${i+1})" style="flex:1; margin:0;" required>
        <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; margin:0;" required>
        \${i>=act.teamMin?'<button type="button" class="rm" style="margin:0;">✕</button>':''}`;
const memberInputsReplacement = `<div style="display:flex; flex:1 1 200px; gap:10px; margin:0;">
          <input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${i+1})" style="flex:1; min-width:0; margin:0;" required>
          <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; min-width:0; margin:0;" required>
          \${i>=act.teamMin?'<button type="button" class="rm" style="margin:0; padding:0 12px;">✕</button>':''}
        </div>`;
html = html.replace(memberInputsTarget, memberInputsReplacement);

// 2. Individual Name Fields
const indivNameTarget = `<div style="display:flex; gap:10px;">
          <select id="f_title" style="flex:0 0 110px; margin:0;" required>`;
const indivNameReplacement = `<div style="display:flex; flex-wrap:wrap; gap:10px;">
          <select id="f_title" style="flex:1 1 110px; margin:0; min-width: 110px; max-width: 150px;" required>`;
html = html.replace(indivNameTarget, indivNameReplacement);

const indivInputsTarget = `<input type="text" id="f_firstName" placeholder="ชื่อ" style="flex:1; margin:0;" required>
          <input type="text" id="f_lastName" placeholder="นามสกุล" style="flex:1; margin:0;" required>`;
const indivInputsReplacement = `<div style="display:flex; flex:1 1 200px; gap:10px; margin:0;">
            <input type="text" id="f_firstName" placeholder="ชื่อ" style="flex:1; min-width:0; margin:0;" required>
            <input type="text" id="f_lastName" placeholder="นามสกุล" style="flex:1; min-width:0; margin:0;" required>
          </div>`;
html = html.replace(indivInputsTarget, indivInputsReplacement);

// 3. Added Member Rows
const addMemberTarget = `row.style.display = 'flex';
      row.style.gap = '10px';
      row.style.marginBottom = '10px';
      row.innerHTML = \`<select class="member-title" style="flex:0 0 100px; margin:0;" required>`;
const addMemberReplacement = `row.style.display = 'flex';
      row.style.flexWrap = 'wrap';
      row.style.gap = '10px';
      row.style.marginBottom = '10px';
      row.innerHTML = \`<select class="member-title" style="flex:1 1 100px; margin:0; min-width:100px; max-width: 140px;" required>`;
html = html.replace(addMemberTarget, addMemberReplacement);

const addMemberInputsTarget = `<input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${current+1})" style="flex:1; margin:0;" required>
      <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; margin:0;" required>
      <button type="button" class="rm" style="margin:0;">✕</button>\`;`;
const addMemberInputsReplacement = `<div style="display:flex; flex:1 1 200px; gap:10px; margin:0;">
        <input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${current+1})" style="flex:1; min-width:0; margin:0;" required>
        <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; min-width:0; margin:0;" required>
        <button type="button" class="rm" style="margin:0; padding:0 12px;">✕</button>
      </div>\`;`;
html = html.replace(addMemberInputsTarget, addMemberInputsReplacement);

fs.writeFileSync('index.html', html);
console.log('patched flex responsive successfully');
