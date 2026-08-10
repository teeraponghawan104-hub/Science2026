const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const target = `           // Preserve focus for search input
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
           }`;

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

if (html.includes(target)) {
   html = html.replace(target, replacement);
   fs.writeFileSync('index.html', html);
   console.log('patched');
} else {
   console.log('target not found');
}
