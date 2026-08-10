const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const lines = html.split('\n');

const startIndex = lines.findIndex(l => l.includes('// Preserve focus for search input'));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('newSearchInput.setSelectionRange'));

if (startIndex !== -1 && endIndex !== -1) {
  // It spans from startIndex to endIndex + 3
  const replacement = `           // Preserve focus for search input and scroll
           const activeEl = document.activeElement;
           const isSearchFocused = activeEl && activeEl.id === 'adminSearchInput';
           const searchInput = document.getElementById('adminSearchInput');
           const selectionStart = searchInput ? searchInput.selectionStart : null;
           
           const tableWrap = document.querySelector('.admin-table-wrap');
           const scrollTop = tableWrap ? tableWrap.scrollTop : 0;
           const scrollLeft = tableWrap ? tableWrap.scrollLeft : 0;
              
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
           
           const newTableWrap = document.querySelector('.admin-table-wrap');
           if (newTableWrap) {
             newTableWrap.scrollTop = scrollTop;
             newTableWrap.scrollLeft = scrollLeft;
           }`;
           
  lines.splice(startIndex, (endIndex + 3) - startIndex, replacement);
  fs.writeFileSync('index.html', lines.join('\n'));
  console.log('patched successfully');
} else {
  console.log('lines not found');
}
