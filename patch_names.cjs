const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Initial Member Rows
const memberRowsTarget = `        <input type="text" class="member-input" placeholder="ชื่อ-นามสกุล สมาชิกคนที่ \${i+1}" style="flex:1; margin:0;" required>`;
const memberRowsReplacement = `        <input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${i+1})" style="flex:1; margin:0;" required>
        <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; margin:0;" required>`;
html = html.replace(memberRowsTarget, memberRowsReplacement);

// 2. Individual Name Fields
const indivNameTarget = `          <input type="text" id="f_fullName" placeholder="ชื่อ-นามสกุล" style="flex:1; margin:0;" required>
        </div>
        <div class="error">กรุณาเลือกคำนำหน้า และกรอกชื่อ-นามสกุล</div>`;
const indivNameReplacement = `          <input type="text" id="f_firstName" placeholder="ชื่อ" style="flex:1; margin:0;" required>
          <input type="text" id="f_lastName" placeholder="นามสกุล" style="flex:1; margin:0;" required>
        </div>
        <div class="error">กรุณาเลือกคำนำหน้า กรอกชื่อ และนามสกุลให้ครบถ้วน</div>`;
html = html.replace(indivNameTarget, indivNameReplacement);

// 3. Added Member Rows
const addMemberTarget = `      <input type="text" class="member-input" placeholder="ชื่อ-นามสกุล สมาชิกคนที่ \${current+1}" style="flex:1; margin:0;" required>
      <button type="button" class="rm" style="margin:0;">✕</button>\`;`;
const addMemberReplacement = `      <input type="text" class="member-firstname" placeholder="ชื่อ (คนที่ \${current+1})" style="flex:1; margin:0;" required>
      <input type="text" class="member-lastname" placeholder="นามสกุล" style="flex:1; margin:0;" required>
      <button type="button" class="rm" style="margin:0;">✕</button>\`;`;
html = html.replace(addMemberTarget, addMemberReplacement);

// 4. Handle Submit for Individual
const indivSubmitTarget = `    const nameVal = document.getElementById('f_fullName').value.trim();
    data.fullName = titleVal ? \`\${titleVal}\${nameVal}\` : nameVal;
    const ok = !!titleVal && !!nameVal;
    setFieldError(nameField, !ok); if(!ok) valid=false;`;
const indivSubmitReplacement = `    const fnameVal = document.getElementById('f_firstName').value.trim();
    const lnameVal = document.getElementById('f_lastName').value.trim();
    data.fullName = titleVal ? \`\${titleVal}\${fnameVal} \${lnameVal}\` : \`\${fnameVal} \${lnameVal}\`;
    const ok = !!titleVal && !!fnameVal && !!lnameVal;
    setFieldError(nameField, !ok); if(!ok) valid=false;`;
html = html.replace(indivSubmitTarget, indivSubmitReplacement);

// 5. Handle Submit for Team Members
const teamSubmitTarget = `      const n = r.querySelector('.member-input').value.trim();
      if(t && n) {
        data.members.push(\`\${t}\${n}\`);
      } else if (t || n) {
        allMembersOk = false; // missing one part
      }`;
const teamSubmitReplacement = `      const fn = r.querySelector('.member-firstname').value.trim();
      const ln = r.querySelector('.member-lastname').value.trim();
      if(t && fn && ln) {
        data.members.push(\`\${t}\${fn} \${ln}\`);
      } else if (t || fn || ln) {
        allMembersOk = false; // missing one part
      }`;
html = html.replace(teamSubmitTarget, teamSubmitReplacement);

fs.writeFileSync('index.html', html);
console.log('patched successfully');
