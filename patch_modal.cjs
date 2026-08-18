const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const target = `<div class="overlay" id="regOverlay">`;
const adminModal = `
<!-- Admin Edit Modal -->
<div class="overlay" id="adminEditOverlay">
  <div class="modal" id="adminEditModal" role="dialog" aria-modal="true" style="max-width:560px; padding:0;">
    <button class="modal-close" id="adminEditCloseBtn" aria-label="ปิด">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <div id="adminEditBody"></div>
  </div>
</div>
`;

if (html.includes(target) && !html.includes('adminEditOverlay')) {
    html = html.replace(target, adminModal + '\n' + target);
    fs.writeFileSync('index.html', html);
    console.log('patched modal in index.html');
} else {
    console.log('modal target not found or already patched');
}
