const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');
const target = '<button class="btn-tiny" id="exportBtn">ส่งออก CSV</button>';
const replacement = '<button class="btn-tiny" style="color:var(--primary); border-color:var(--primary);" id="addBtn" onclick="openAdminEditModal(\\'${act.id}\\', null)">+ เพิ่มผู้สมัคร</button>\n          ' + target;

if (html.includes(target) && !html.includes('id="addBtn"')) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html);
    console.log('patched addBtn in index.html');
} else {
    console.log('addBtn target not found or already patched');
}
